"use client";

import {
  useState,
} from "react";

import {
  degrees,
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

import {
  downloadPdf,
  parsePages,
  safeFileBase,
} from "./pdfUtils";

function prettySize(bytes) {
  if (!bytes) return "0 KB";

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    1024 /
    1024
  ).toFixed(2)} MB`;
}

export default function PdfEditToolClient({
  mode,
}) {
  const [file, setFile] =
    useState(null);

  const [pageCount, setPageCount] =
    useState(0);

  const [selection, setSelection] =
    useState("1");

  const [message, setMessage] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [position, setPosition] =
    useState("bottom-center");

  const [startNumber, setStartNumber] =
    useState("1");

  const [fontSize, setFontSize] =
    useState("12");

  const [prefix, setPrefix] =
    useState("");

  const [suffix, setSuffix] =
    useState("");

  const [watermark, setWatermark] =
    useState("CONFIDENTIAL");

  const [watermarkSize, setWatermarkSize] =
    useState("48");

  const [opacity, setOpacity] =
    useState("0.25");

  const [rotation, setRotation] =
    useState("-45");

  const [topCrop, setTopCrop] =
    useState("0");

  const [rightCrop, setRightCrop] =
    useState("0");

  const [bottomCrop, setBottomCrop] =
    useState("0");

  const [leftCrop, setLeftCrop] =
    useState("0");

  const [signature, setSignature] =
    useState(null);

  const [signaturePage, setSignaturePage] =
    useState("1");

  const [signaturePosition, setSignaturePosition] =
    useState("bottom-right");

  const [signatureWidth, setSignatureWidth] =
    useState("25");

  const [title, setTitle] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [keywords, setKeywords] =
    useState("");

  const [creator, setCreator] =
    useState("");

  async function chooseFile(selected) {
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
      setFile(null);
      setMessage(
        "Please choose a PDF under 30 MB."
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
      setSelection("1");
      setSignaturePage("1");

      if (
        mode === "metadata"
      ) {
        setTitle(
          pdf.getTitle() || ""
        );

        setAuthor(
          pdf.getAuthor() || ""
        );

        setSubject(
          pdf.getSubject() || ""
        );

        const currentKeywords =
          pdf.getKeywords();

        setKeywords(
          currentKeywords || ""
        );

        setCreator(
          pdf.getCreator() || ""
        );
      }

    } catch {
      setFile(null);

      setMessage(
        "This PDF could not be read."
      );
    }
  }

  function setOutput(
    bytes,
    filename
  ) {
    const blob =
      new Blob(
        [bytes],
        {
          type:
            "application/pdf",
        }
      );

    setResult({
      bytes,
      blob,
      filename,
      size:
        blob.size,
    });
  }

  async function removePages() {
    const indexes =
      parsePages(
        selection,
        pageCount,
        false
      );

    if (
      indexes.length >=
      pageCount
    ) {
      throw new Error(
        "At least one page must remain in the PDF."
      );
    }

    const removeSet =
      new Set(indexes);

    const source =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const output =
      await PDFDocument.create();

    const keep =
      source
        .getPageIndices()
        .filter(
          (index) =>
            !removeSet.has(
              index
            )
        );

    const copied =
      await output.copyPages(
        source,
        keep
      );

    copied.forEach(
      (page) =>
        output.addPage(page)
    );

    setOutput(
      await output.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-pages-removed.pdf`
    );
  }

  function numberPosition(
    page,
    textWidth,
    size
  ) {
    const {
      width,
      height,
    } = page.getSize();

    const margin = 24;

    if (
      position ===
      "top-left"
    ) {
      return {
        x: margin,
        y:
          height -
          margin -
          size,
      };
    }

    if (
      position ===
      "top-right"
    ) {
      return {
        x:
          width -
          margin -
          textWidth,
        y:
          height -
          margin -
          size,
      };
    }

    if (
      position ===
      "top-center"
    ) {
      return {
        x:
          (width -
            textWidth) /
          2,
        y:
          height -
          margin -
          size,
      };
    }

    if (
      position ===
      "bottom-left"
    ) {
      return {
        x: margin,
        y: margin,
      };
    }

    if (
      position ===
      "bottom-right"
    ) {
      return {
        x:
          width -
          margin -
          textWidth,
        y: margin,
      };
    }

    return {
      x:
        (width -
          textWidth) /
        2,
      y: margin,
    };
  }

  async function addPageNumbers() {
    const pdf =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const font =
      await pdf.embedFont(
        StandardFonts.Helvetica
      );

    const size =
      Math.max(
        6,
        Number(fontSize) ||
          12
      );

    const start =
      Number(startNumber) ||
      1;

    pdf.getPages().forEach(
      (page, index) => {
        const text =
          `${prefix}${
            start + index
          }${suffix}`;

        const textWidth =
          font.widthOfTextAtSize(
            text,
            size
          );

        const point =
          numberPosition(
            page,
            textWidth,
            size
          );

        page.drawText(
          text,
          {
            x: point.x,
            y: point.y,
            size,
            font,
            color:
              rgb(
                0.12,
                0.12,
                0.12
              ),
          }
        );
      }
    );

    setOutput(
      await pdf.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-numbered.pdf`
    );
  }

  async function addWatermark() {
    if (
      !watermark.trim()
    ) {
      throw new Error(
        "Enter watermark text."
      );
    }

    const pdf =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const font =
      await pdf.embedFont(
        StandardFonts.HelveticaBold
      );

    const size =
      Math.max(
        10,
        Number(
          watermarkSize
        ) || 48
      );

    const alpha =
      Math.min(
        1,
        Math.max(
          0.05,
          Number(opacity) ||
            0.25
        )
      );

    const turn =
      Number(rotation) ||
      0;

    pdf.getPages().forEach(
      (page) => {
        const {
          width,
          height,
        } =
          page.getSize();

        const textWidth =
          font.widthOfTextAtSize(
            watermark,
            size
          );

        page.drawText(
          watermark,
          {
            x:
              Math.max(
                24,
                (
                  width -
                  textWidth
                ) / 2
              ),
            y:
              height / 2,
            size,
            font,
            color:
              rgb(
                0.45,
                0.45,
                0.45
              ),
            opacity:
              alpha,
            rotate:
              degrees(turn),
          }
        );
      }
    );

    setOutput(
      await pdf.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-watermarked.pdf`
    );
  }

  async function cropPdf() {
    const top =
      Math.max(
        0,
        Number(topCrop) ||
          0
      );

    const right =
      Math.max(
        0,
        Number(rightCrop) ||
          0
      );

    const bottom =
      Math.max(
        0,
        Number(bottomCrop) ||
          0
      );

    const left =
      Math.max(
        0,
        Number(leftCrop) ||
          0
      );

    const pdf =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    for (
      const page of
      pdf.getPages()
    ) {
      const box =
        page.getMediaBox();

      const width =
        box.width -
        left -
        right;

      const height =
        box.height -
        top -
        bottom;

      if (
        width <= 10 ||
        height <= 10
      ) {
        throw new Error(
          "Crop margins are too large for at least one page."
        );
      }

      page.setCropBox(
        box.x + left,
        box.y + bottom,
        width,
        height
      );
    }

    setOutput(
      await pdf.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-cropped.pdf`
    );
  }

  async function signPdf() {
    if (!signature) {
      throw new Error(
        "Choose a PNG or JPG signature image."
      );
    }

    const pageNumber =
      Number(
        signaturePage
      );

    if (
      !Number.isInteger(
        pageNumber
      ) ||
      pageNumber < 1 ||
      pageNumber >
        pageCount
    ) {
      throw new Error(
        `Choose a page between 1 and ${pageCount}.`
      );
    }

    const pdf =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    const bytes =
      await signature.arrayBuffer();

    const image =
      signature.type ===
      "image/png"
        ? await pdf.embedPng(
            bytes
          )
        : await pdf.embedJpg(
            bytes
          );

    const page =
      pdf.getPage(
        pageNumber - 1
      );

    const {
      width,
      height,
    } =
      page.getSize();

    const targetWidth =
      width *
      Math.min(
        0.6,
        Math.max(
          0.08,
          Number(
            signatureWidth
          ) / 100
        )
      );

    const targetHeight =
      image.height *
      (
        targetWidth /
        image.width
      );

    const margin = 24;

    let x =
      width -
      targetWidth -
      margin;

    let y =
      margin;

    if (
      signaturePosition ===
      "bottom-left"
    ) {
      x = margin;
      y = margin;
    }

    if (
      signaturePosition ===
      "top-left"
    ) {
      x = margin;
      y =
        height -
        targetHeight -
        margin;
    }

    if (
      signaturePosition ===
      "top-right"
    ) {
      x =
        width -
        targetWidth -
        margin;

      y =
        height -
        targetHeight -
        margin;
    }

    if (
      signaturePosition ===
      "center"
    ) {
      x =
        (
          width -
          targetWidth
        ) / 2;

      y =
        (
          height -
          targetHeight
        ) / 2;
    }

    page.drawImage(
      image,
      {
        x,
        y,
        width:
          targetWidth,
        height:
          targetHeight,
      }
    );

    setOutput(
      await pdf.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-signed.pdf`
    );
  }

  async function editMetadata() {
    const pdf =
      await PDFDocument.load(
        await file.arrayBuffer()
      );

    pdf.setTitle(
      title.trim()
    );

    pdf.setAuthor(
      author.trim()
    );

    pdf.setSubject(
      subject.trim()
    );

    pdf.setCreator(
      creator.trim()
    );

    pdf.setKeywords(
      keywords
        .split(",")
        .map(
          (item) =>
            item.trim()
        )
        .filter(Boolean)
    );

    pdf.setModificationDate(
      new Date()
    );

    setOutput(
      await pdf.save({
        useObjectStreams:
          true,
      }),
      `${safeFileBase(
        file.name
      )}-metadata.pdf`
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
    setMessage("");
    setResult(null);

    try {
      if (
        mode === "remove"
      ) {
        await removePages();
      }

      if (
        mode === "numbers"
      ) {
        await addPageNumbers();
      }

      if (
        mode === "watermark"
      ) {
        await addWatermark();
      }

      if (
        mode === "crop"
      ) {
        await cropPdf();
      }

      if (
        mode === "sign"
      ) {
        await signPdf();
      }

      if (
        mode === "metadata"
      ) {
        await editMetadata();
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

      {mode === "remove" && pageCount > 0 && (
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-semibold">
            Pages to remove
          </span>

          <input
            type="text"
            value={selection}
            onChange={(event) =>
              setSelection(
                event.target.value
              )
            }
            placeholder="Example: 2,4-6"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </label>
      )}

      {mode === "numbers" && pageCount > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Position
            </span>

            <select
              value={position}
              onChange={(event) =>
                setPosition(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="bottom-center">
                Bottom center
              </option>

              <option value="bottom-left">
                Bottom left
              </option>

              <option value="bottom-right">
                Bottom right
              </option>

              <option value="top-center">
                Top center
              </option>

              <option value="top-left">
                Top left
              </option>

              <option value="top-right">
                Top right
              </option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Starting number
            </span>

            <input
              type="number"
              value={startNumber}
              onChange={(event) =>
                setStartNumber(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Font size
            </span>

            <input
              type="number"
              min="6"
              max="72"
              value={fontSize}
              onChange={(event) =>
                setFontSize(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Prefix
              </span>

              <input
                type="text"
                value={prefix}
                onChange={(event) =>
                  setPrefix(
                    event.target.value
                  )
                }
                placeholder="Page "
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Suffix
              </span>

              <input
                type="text"
                value={suffix}
                onChange={(event) =>
                  setSuffix(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>
          </div>
        </div>
      )}

      {mode === "watermark" && pageCount > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Watermark text
            </span>

            <input
              type="text"
              value={watermark}
              onChange={(event) =>
                setWatermark(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Font size
            </span>

            <input
              type="number"
              min="10"
              max="200"
              value={watermarkSize}
              onChange={(event) =>
                setWatermarkSize(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Rotation
            </span>

            <select
              value={rotation}
              onChange={(event) =>
                setRotation(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="-45">
                -45 degrees
              </option>

              <option value="0">
                0 degrees
              </option>

              <option value="45">
                45 degrees
              </option>
            </select>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Opacity:{" "}
              {Math.round(
                Number(opacity) *
                100
              )}
              %
            </span>

            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={opacity}
              onChange={(event) =>
                setOpacity(
                  event.target.value
                )
              }
              className="w-full"
            />
          </label>
        </div>
      )}

      {mode === "crop" && pageCount > 0 && (
        <>
          <p className="mt-5 text-sm text-slate-600">
            Crop margins use PDF points. 72 points is approximately one inch.
          </p>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {[
              ["Top", topCrop, setTopCrop],
              ["Right", rightCrop, setRightCrop],
              ["Bottom", bottomCrop, setBottomCrop],
              ["Left", leftCrop, setLeftCrop],
            ].map(
              ([label, value, setter]) => (
                <label key={label}>
                  <span className="mb-2 block text-sm font-semibold">
                    {label} crop
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(event) =>
                      setter(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                  />
                </label>
              )
            )}
          </div>
        </>
      )}

      {mode === "sign" && pageCount > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Signature image
            </span>

            <input
              type="file"
              accept="image/png,image/jpeg"
              className="w-full rounded-xl border border-slate-300 bg-white p-4"
              onChange={(event) =>
                setSignature(
                  event.target.files?.[0] ||
                  null
                )
              }
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Page number
            </span>

            <input
              type="number"
              min="1"
              max={pageCount}
              value={signaturePage}
              onChange={(event) =>
                setSignaturePage(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Position
            </span>

            <select
              value={signaturePosition}
              onChange={(event) =>
                setSignaturePosition(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="bottom-right">
                Bottom right
              </option>

              <option value="bottom-left">
                Bottom left
              </option>

              <option value="top-right">
                Top right
              </option>

              <option value="top-left">
                Top left
              </option>

              <option value="center">
                Center
              </option>
            </select>
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Signature width:{" "}
              {signatureWidth}% of page
            </span>

            <input
              type="range"
              min="8"
              max="60"
              step="1"
              value={signatureWidth}
              onChange={(event) =>
                setSignatureWidth(
                  event.target.value
                )
              }
              className="w-full"
            />
          </label>
        </div>
      )}

      {mode === "metadata" && pageCount > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {[
            ["Title", title, setTitle],
            ["Author", author, setAuthor],
            ["Subject", subject, setSubject],
            ["Creator", creator, setCreator],
          ].map(
            ([label, value, setter]) => (
              <label key={label}>
                <span className="mb-2 block text-sm font-semibold">
                  {label}
                </span>

                <input
                  type="text"
                  value={value}
                  onChange={(event) =>
                    setter(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                />
              </label>
            )
          )}

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Keywords
            </span>

            <input
              type="text"
              value={keywords}
              onChange={(event) =>
                setKeywords(
                  event.target.value
                )
              }
              placeholder="invoice, client, project"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>
        </div>
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
            : mode === "remove"
              ? "Remove Pages"
              : mode === "numbers"
                ? "Add Page Numbers"
                : mode === "watermark"
                  ? "Add Watermark"
                  : mode === "crop"
                    ? "Crop PDF"
                    : mode === "sign"
                      ? "Add Signature"
                      : "Save Metadata"}
        </button>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {result && (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="font-bold text-green-900">
            Output ready
          </p>

          <p className="mt-1 text-sm text-green-800">
            Size:{" "}
            {prettySize(
              result.size
            )}
          </p>

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
        </div>
      )}
    </div>
  );
}