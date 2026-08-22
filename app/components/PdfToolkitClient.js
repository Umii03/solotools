"use client";

import { useState } from "react";
import {
  degrees,
  PDFDocument,
} from "pdf-lib";

import {
  downloadPdf,
  parsePages,
  safeFileBase,
} from "./pdfUtils";

function prettySize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  const units = ["B", "KB", "MB", "GB"];

  const exponent = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    ),
    units.length - 1
  );

  const value =
    bytes / Math.pow(1024, exponent);

  return `${value.toFixed(
    exponent === 0 ? 0 : 2
  )} ${units[exponent]}`;
}

function valueOrDash(callback) {
  try {
    const value = callback();

    if (!value) {
      return "-";
    }

    if (value instanceof Date) {
      return value.toLocaleString();
    }

    return String(value);

  } catch {
    return "-";
  }
}

export default function PdfToolkitClient({
  mode,
  imageType = "all",
}) {
  const [files, setFiles] = useState([]);
  const [pageCount, setPageCount] =
    useState(0);

  const [selection, setSelection] =
    useState("");

  const [splitAfter, setSplitAfter] =
    useState("1");

  const [angle, setAngle] =
    useState("90");

  const [order, setOrder] =
    useState("");

  const [partOne, setPartOne] =
    useState(null);

  const [partTwo, setPartTwo] =
    useState(null);

  const [info, setInfo] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const isImageMode =
    mode === "images";

  const multiple =
    mode === "merge" ||
    isImageMode;

  const accept = isImageMode
    ? imageType === "jpg"
      ? "image/jpeg"
      : imageType === "png"
        ? "image/png"
        : "image/jpeg,image/png"
    : "application/pdf";

  async function readPdfInfo(file) {
    const pdf = await PDFDocument.load(
      await file.arrayBuffer()
    );

    const count =
      pdf.getPageCount();

    setPageCount(count);

    if (mode === "split") {
      setSplitAfter(
        String(
          Math.max(
            1,
            Math.floor(count / 2)
          )
        )
      );
    }

    if (mode === "extract") {
      setSelection("1");
    }

    if (mode === "reorder") {
      setOrder(
        Array.from(
          { length: count },
          (_, index) => index + 1
        ).join(",")
      );
    }

    if (mode === "info") {
      setInfo({
        name: file.name,
        size: prettySize(file.size),
        pages: count,

        title:
          valueOrDash(
            () => pdf.getTitle()
          ),

        author:
          valueOrDash(
            () => pdf.getAuthor()
          ),

        subject:
          valueOrDash(
            () => pdf.getSubject()
          ),

        creator:
          valueOrDash(
            () => pdf.getCreator()
          ),

        producer:
          valueOrDash(
            () => pdf.getProducer()
          ),

        created:
          valueOrDash(
            () => pdf.getCreationDate()
          ),

        modified:
          valueOrDash(
            () => pdf.getModificationDate()
          ),
      });
    }
  }

  async function chooseFiles(fileList) {
    const selected =
      Array.from(fileList || []);

    setFiles([]);
    setPageCount(0);
    setPartOne(null);
    setPartTwo(null);
    setInfo(null);
    setMessage("");

    if (selected.length < 1) {
      return;
    }

    if (
      selected.some(
        (file) =>
          file.size >
          25 * 1024 * 1024
      )
    ) {
      setMessage(
        "Please keep each file under 25 MB."
      );

      return;
    }

    if (isImageMode) {
      const allowed =
        imageType === "jpg"
          ? ["image/jpeg"]
          : imageType === "png"
            ? ["image/png"]
            : [
                "image/jpeg",
                "image/png",
              ];

      if (
        selected.some(
          (file) =>
            !allowed.includes(
              file.type
            )
        )
      ) {
        setMessage(
          "Please choose only the supported image type."
        );

        return;
      }

      setFiles(selected);
      return;
    }

    if (
      selected.some(
        (file) =>
          file.type !==
            "application/pdf" &&
          !file.name
            .toLowerCase()
            .endsWith(".pdf")
      )
    ) {
      setMessage(
        "Please select PDF files only."
      );

      return;
    }

    setFiles(selected);

    if (mode !== "merge") {
      try {
        await readPdfInfo(
          selected[0]
        );
      } catch {
        setFiles([]);

        setMessage(
          "This PDF could not be read. Password-protected or damaged PDFs may not be supported."
        );
      }
    }
  }

  async function runTool() {
    if (files.length < 1) {
      setMessage(
        isImageMode
          ? "Choose at least one image."
          : "Choose a PDF first."
      );

      return;
    }

    setWorking(true);
    setMessage("");
    setPartOne(null);
    setPartTwo(null);

    try {

      if (mode === "merge") {
        if (files.length < 2) {
          throw new Error(
            "Select at least two PDF files."
          );
        }

        const output =
          await PDFDocument.create();

        for (const file of files) {
          const source =
            await PDFDocument.load(
              await file.arrayBuffer()
            );

          const copied =
            await output.copyPages(
              source,
              source.getPageIndices()
            );

          copied.forEach(
            (page) =>
              output.addPage(page)
          );
        }

        downloadPdf(
          await output.save(),
          "merged.pdf"
        );

        setMessage(
          "Merged PDF downloaded."
        );
      }

      if (mode === "split") {
        if (pageCount < 2) {
          throw new Error(
            "Choose a PDF with at least two pages."
          );
        }

        const splitPage =
          Number(splitAfter);

        if (
          !Number.isInteger(
            splitPage
          ) ||
          splitPage < 1 ||
          splitPage >= pageCount
        ) {
          throw new Error(
            `Choose a split point between 1 and ${
              pageCount - 1
            }.`
          );
        }

        const source =
          await PDFDocument.load(
            await files[0].arrayBuffer()
          );

        const first =
          await PDFDocument.create();

        const second =
          await PDFDocument.create();

        const firstIndexes =
          Array.from(
            { length: splitPage },
            (_, index) => index
          );

        const secondIndexes =
          Array.from(
            {
              length:
                pageCount -
                splitPage,
            },
            (_, index) =>
              index + splitPage
          );

        const firstPages =
          await first.copyPages(
            source,
            firstIndexes
          );

        const secondPages =
          await second.copyPages(
            source,
            secondIndexes
          );

        firstPages.forEach(
          (page) =>
            first.addPage(page)
        );

        secondPages.forEach(
          (page) =>
            second.addPage(page)
        );

        setPartOne(
          await first.save()
        );

        setPartTwo(
          await second.save()
        );

        setMessage(
          "PDF split successfully."
        );
      }

      if (mode === "extract") {
        const indexes =
          parsePages(
            selection,
            pageCount,
            false
          );

        const source =
          await PDFDocument.load(
            await files[0].arrayBuffer()
          );

        const output =
          await PDFDocument.create();

        const copied =
          await output.copyPages(
            source,
            indexes
          );

        copied.forEach(
          (page) =>
            output.addPage(page)
        );

        downloadPdf(
          await output.save(),
          `${safeFileBase(
            files[0].name
          )}-extracted.pdf`
        );

        setMessage(
          "Selected pages downloaded."
        );
      }

      if (mode === "rotate") {
        const indexes =
          parsePages(
            selection,
            pageCount,
            true
          );

        const source =
          await PDFDocument.load(
            await files[0].arrayBuffer()
          );

        const turn =
          Number(angle);

        indexes.forEach(
          (index) => {
            const page =
              source.getPage(index);

            const current =
              page
                .getRotation()
                .angle || 0;

            page.setRotation(
              degrees(
                (current + turn) %
                  360
              )
            );
          }
        );

        downloadPdf(
          await source.save(),
          `${safeFileBase(
            files[0].name
          )}-rotated.pdf`
        );

        setMessage(
          "Rotated PDF downloaded."
        );
      }

      if (mode === "reorder") {
        const values =
          order
            .split(",")
            .map(
              (item) =>
                Number(
                  item.trim()
                )
            );

        if (
          values.length !==
            pageCount ||
          values.some(
            (page) =>
              !Number.isInteger(
                page
              ) ||
              page < 1 ||
              page > pageCount
          ) ||
          new Set(values).size !==
            pageCount
        ) {
          throw new Error(
            "Enter every page exactly once in the new order."
          );
        }

        const source =
          await PDFDocument.load(
            await files[0].arrayBuffer()
          );

        const output =
          await PDFDocument.create();

        const copied =
          await output.copyPages(
            source,
            values.map(
              (page) =>
                page - 1
            )
          );

        copied.forEach(
          (page) =>
            output.addPage(page)
        );

        downloadPdf(
          await output.save(),
          `${safeFileBase(
            files[0].name
          )}-reordered.pdf`
        );

        setMessage(
          "Reordered PDF downloaded."
        );
      }

      if (mode === "images") {
        const output =
          await PDFDocument.create();

        for (const file of files) {
          const bytes =
            await file.arrayBuffer();

          const image =
            file.type ===
            "image/png"
              ? await output.embedPng(
                  bytes
                )
              : await output.embedJpg(
                  bytes
                );

          const maxPage = 1800;

          const scale =
            Math.min(
              1,
              maxPage /
                Math.max(
                  image.width,
                  image.height
                )
            );

          const width =
            image.width * scale;

          const height =
            image.height * scale;

          const page =
            output.addPage([
              width,
              height,
            ]);

          page.drawImage(
            image,
            {
              x: 0,
              y: 0,
              width,
              height,
            }
          );
        }

        const filename =
          imageType === "jpg"
            ? "jpg-images.pdf"
            : imageType === "png"
              ? "png-images.pdf"
              : "images.pdf";

        downloadPdf(
          await output.save(),
          filename
        );

        setMessage(
          "PDF created and downloaded."
        );
      }

    } catch (error) {

      setMessage(
        error instanceof Error
          ? error.message
          : "The requested PDF operation failed."
      );

    } finally {
      setWorking(false);
    }
  }

  const actionLabel = {
    merge: "Merge PDFs",
    split: "Split PDF",
    extract: "Extract Pages",
    rotate: "Rotate PDF",
    reorder: "Reorder PDF",
    images: "Create PDF",
  }[mode];

  const baseName =
    files.length > 0
      ? safeFileBase(
          files[0].name
        )
      : "document";

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <label className="block rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
        <span className="text-lg font-bold">
          {isImageMode
            ? "Choose image files"
            : multiple
              ? "Choose PDF files"
              : "Choose a PDF"}
        </span>

        <span className="mt-2 block text-sm text-slate-500">
          Processed locally in your browser.
          Maximum 25 MB per file.
        </span>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="mt-5 block w-full text-sm"
          onChange={(event) =>
            chooseFiles(
              event.target.files
            )
          }
        />
      </label>

      {files.length > 0 && (
        <div className="mt-5 rounded-2xl bg-white p-5">
          <p className="font-bold">
            {files.length} file
            {files.length === 1
              ? ""
              : "s"}{" "}
            selected
          </p>

          <ol className="mt-3 space-y-1 text-sm text-slate-600">
            {files.map(
              (file, index) => (
                <li
                  key={`${file.name}-${index}`}
                >
                  {index + 1}.{" "}
                  {file.name}
                </li>
              )
            )}
          </ol>
        </div>
      )}

      {pageCount > 0 &&
        mode !== "info" && (
          <p className="mt-4 text-sm text-slate-600">
            Pages detected:{" "}
            <strong>
              {pageCount}
            </strong>
          </p>
        )}

      {mode === "split" &&
        pageCount > 1 && (
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold">
              Split after page
            </span>

            <input
              type="number"
              min="1"
              max={pageCount - 1}
              value={splitAfter}
              onChange={(event) =>
                setSplitAfter(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>
        )}

      {mode === "extract" &&
        pageCount > 0 && (
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold">
              Pages to extract
            </span>

            <input
              type="text"
              value={selection}
              onChange={(event) =>
                setSelection(
                  event.target.value
                )
              }
              placeholder="Example: 1,3-5,8"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

            <span className="mt-2 block text-xs text-slate-500">
              Use commas and ranges.
            </span>
          </label>
        )}

      {mode === "rotate" &&
        pageCount > 0 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Rotation
              </span>

              <select
                value={angle}
                onChange={(event) =>
                  setAngle(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="90">
                  90 degrees clockwise
                </option>

                <option value="180">
                  180 degrees
                </option>

                <option value="270">
                  270 degrees clockwise
                </option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Pages
              </span>

              <input
                type="text"
                value={selection}
                onChange={(event) =>
                  setSelection(
                    event.target.value
                  )
                }
                placeholder="Blank = all pages"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>
          </div>
        )}

      {mode === "reorder" &&
        pageCount > 0 && (
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold">
              New page order
            </span>

            <input
              type="text"
              value={order}
              onChange={(event) =>
                setOrder(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

            <span className="mt-2 block text-xs text-slate-500">
              Example: 3,1,2,4
            </span>
          </label>
        )}

      {mode === "info" &&
        info && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            {[
              ["File", info.name],
              ["File size", info.size],
              ["Page count", info.pages],
              ["Title", info.title],
              ["Author", info.author],
              ["Subject", info.subject],
              ["Creator", info.creator],
              ["Producer", info.producer],
              ["Created", info.created],
              ["Modified", info.modified],
            ].map(
              ([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-white p-4"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {label}
                  </p>

                  <p className="mt-1 break-words font-semibold">
                    {value}
                  </p>
                </div>
              )
            )}
          </div>
        )}

      {actionLabel &&
        files.length > 0 && (
          <button
            type="button"
            onClick={runTool}
            disabled={working}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {working
              ? "Processing..."
              : actionLabel}
          </button>
        )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {mode === "split" &&
        partOne &&
        partTwo && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() =>
                downloadPdf(
                  partOne,
                  `${baseName}-part-1.pdf`
                )
              }
              className="rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
            >
              Download Part 1
            </button>

            <button
              type="button"
              onClick={() =>
                downloadPdf(
                  partTwo,
                  `${baseName}-part-2.pdf`
                )
              }
              className="rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
            >
              Download Part 2
            </button>
          </div>
        )}
    </div>
  );
}
