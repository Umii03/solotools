"use client";

import {
  useState,
} from "react";

import {
  PDFDocument,
} from "pdf-lib";

import {
  downloadPdf,
  safeFileBase,
} from "./pdfUtils";

export default function PdfPageUtilityClient({
  mode,
}) {
  const [file, setFile] =
    useState(null);

  const [pageCount, setPageCount] =
    useState(0);

  const [pageNumber, setPageNumber] =
    useState("1");

  const [copies, setCopies] =
    useState("1");

  const [position, setPosition] =
    useState("1");

  const [message, setMessage] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const [result, setResult] =
    useState(null);

  async function chooseFile(
    selected
  ) {
    setResult(null);
    setMessage("");
    setPageCount(0);

    if (!selected) {
      setFile(null);
      return;
    }

    if (
      selected.size >
      30 * 1024 * 1024
    ) {
      setMessage(
        "Choose a PDF under 30 MB."
      );

      return;
    }

    try {
      const pdf =
        await PDFDocument.load(
          await selected.arrayBuffer()
        );

      const count =
        pdf.getPageCount();

      setFile(selected);
      setPageCount(count);
      setPageNumber("1");
      setPosition(
        String(
          count + 1
        )
      );
    } catch {
      setMessage(
        "Could not read this PDF."
      );
    }
  }

  function saveResult(
    bytes,
    filename
  ) {
    setResult({
      bytes,
      filename,
    });
  }

  async function reversePages() {
    const source =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const output =
      await PDFDocument.create();

    const indexes =
      source
        .getPageIndices()
        .reverse();

    const pages =
      await output.copyPages(
        source,
        indexes
      );

    pages.forEach(
      (page) =>
        output.addPage(page)
    );

    saveResult(
      await output.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-reversed.pdf`
    );
  }

  async function duplicatePage() {
    const selected =
      Number(pageNumber);

    const extraCopies =
      Math.min(
        10,
        Math.max(
          1,
          Math.round(
            Number(copies) ||
            1
          )
        )
      );

    if (
      !Number.isInteger(
        selected
      ) ||
      selected < 1 ||
      selected >
        pageCount
    ) {
      throw new Error(
        `Choose a page between 1 and ${pageCount}.`
      );
    }

    const source =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const indexes = [];

    for (
      let index = 0;
      index < pageCount;
      index++
    ) {
      indexes.push(index);

      if (
        index ===
        selected - 1
      ) {
        for (
          let copy = 0;
          copy < extraCopies;
          copy++
        ) {
          indexes.push(index);
        }
      }
    }

    const output =
      await PDFDocument.create();

    const pages =
      await output.copyPages(
        source,
        indexes
      );

    pages.forEach(
      (page) =>
        output.addPage(page)
    );

    saveResult(
      await output.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-duplicated.pdf`
    );
  }

  async function insertBlank() {
    const selectedPosition =
      Number(position);

    if (
      !Number.isInteger(
        selectedPosition
      ) ||
      selectedPosition < 1 ||
      selectedPosition >
        pageCount + 1
    ) {
      throw new Error(
        `Choose a position between 1 and ${
          pageCount + 1
        }.`
      );
    }

    const source =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const sourcePages =
      source.getPages();

    const reference =
      sourcePages[
        Math.min(
          sourcePages.length -
            1,
          Math.max(
            0,
            selectedPosition -
              1
          )
        )
      ];

    const size =
      reference.getSize();

    const output =
      await PDFDocument.create();

    const copied =
      await output.copyPages(
        source,
        source.getPageIndices()
      );

    for (
      let index = 0;
      index <= pageCount;
      index++
    ) {
      if (
        index ===
        selectedPosition -
          1
      ) {
        output.addPage([
          size.width,
          size.height,
        ]);
      }

      if (
        index <
        pageCount
      ) {
        output.addPage(
          copied[index]
        );
      }
    }

    saveResult(
      await output.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-blank-page.pdf`
    );
  }

  async function run() {
    if (!file) {
      setMessage(
        "Choose a PDF first."
      );

      return;
    }

    setWorking(true);
    setResult(null);
    setMessage("");

    try {
      if (
        mode === "reverse"
      ) {
        await reversePages();
      }

      if (
        mode === "duplicate"
      ) {
        await duplicatePage();
      }

      if (
        mode === "blank"
      ) {
        await insertBlank();
      }

      setMessage(
        "PDF is ready."
      );

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "PDF processing failed."
      );
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

      <input
        type="file"
        accept="application/pdf"
        className="w-full rounded-xl border border-slate-300 bg-white p-4"
        onChange={(event) =>
          chooseFile(
            event.target.files?.[0]
          )
        }
      />

      {pageCount > 0 && (
        <p className="mt-4 text-sm text-slate-600">
          Pages detected:{" "}
          <strong>
            {pageCount}
          </strong>
        </p>
      )}

      {mode === "duplicate" &&
        pageCount > 0 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Page to duplicate
              </span>

              <input
                type="number"
                min="1"
                max={pageCount}
                value={pageNumber}
                onChange={(event) =>
                  setPageNumber(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Extra copies
              </span>

              <input
                type="number"
                min="1"
                max="10"
                value={copies}
                onChange={(event) =>
                  setCopies(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>
          </div>
        )}

      {mode === "blank" &&
        pageCount > 0 && (
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold">
              Insert blank page at position
            </span>

            <input
              type="number"
              min="1"
              max={
                pageCount + 1
              }
              value={position}
              onChange={(event) =>
                setPosition(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

            <span className="mt-2 block text-xs text-slate-500">
              Position 1 inserts before the first page. Position {pageCount + 1} inserts after the final page.
            </span>
          </label>
        )}

      {pageCount > 0 && (
        <button
          type="button"
          disabled={working}
          onClick={run}
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-60"
        >
          {working
            ? "Processing..."
            : mode ===
                "reverse"
              ? "Reverse PDF Pages"
              : mode ===
                  "duplicate"
                ? "Duplicate Page"
                : "Insert Blank Page"}
        </button>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {result && (
        <button
          type="button"
          onClick={() =>
            downloadPdf(
              result.bytes,
              result.filename
            )
          }
          className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
        >
          Download PDF
        </button>
      )}
    </div>
  );
}