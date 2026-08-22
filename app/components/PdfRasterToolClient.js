"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

let pdfJsPromise = null;

async function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise =
      import(
        "pdfjs-dist/legacy/build/pdf.mjs"
      ).then((module) => {
        module.GlobalWorkerOptions.workerSrc =
          "/pdf.worker.min.mjs";

        return module;
      });
  }

  return pdfJsPromise;
}

function prettySize(bytes) {
  if (!bytes) return "0 KB";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value =
    bytes / Math.pow(1024, exponent);

  return `${value.toFixed(exponent ? 2 : 0)} ${units[exponent]}`;
}

function canvasBlob(
  canvas,
  type,
  quality
) {
  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(
              new Error(
                "Could not create image output."
              )
            );
          }
        },
        type,
        quality
      );
    }
  );
}

function downloadBlob(
  blob,
  filename
) {
  const url =
    URL.createObjectURL(blob);

  const anchor =
    document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(
    () => URL.revokeObjectURL(url),
    1000
  );
}

export default function PdfRasterToolClient({
  mode,
}) {
  const [file, setFile] =
    useState(null);

  const [quality, setQuality] =
    useState("0.72");

  const [scale, setScale] =
    useState("1.5");

  const [message, setMessage] =
    useState("");

  const [progress, setProgress] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const [result, setResult] =
    useState(null);

  function chooseFile(selected) {
    setResult(null);
    setMessage("");
    setProgress("");

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

    setFile(selected);
  }

  async function loadRenderer() {
    const pdfjs =
      await loadPdfJs();

    const data =
      new Uint8Array(
        await file.arrayBuffer()
      );

    return pdfjs
      .getDocument({ data })
      .promise;
  }

  async function convertPages(
    format
  ) {
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
      const pdf =
        await loadRenderer();

      if (pdf.numPages > 100) {
        throw new Error(
          "For browser performance, this converter supports up to 100 pages at a time."
        );
      }

      const zipModule =
        await import("jszip");

      const JSZip =
        zipModule.default;

      const zip =
        new JSZip();

      const extension =
        format === "jpeg"
          ? "jpg"
          : "png";

      const mime =
        format === "jpeg"
          ? "image/jpeg"
          : "image/png";

      const total =
        pdf.numPages;

      for (
        let pageNumber = 1;
        pageNumber <= total;
        pageNumber++
      ) {
        setProgress(
          `Rendering page ${pageNumber} of ${total}...`
        );

        const page =
          await pdf.getPage(
            pageNumber
          );

        const viewport =
          page.getViewport({
            scale: Number(scale),
          });

        const canvas =
          document.createElement(
            "canvas"
          );

        canvas.width =
          Math.ceil(
            viewport.width
          );

        canvas.height =
          Math.ceil(
            viewport.height
          );

        const context =
          canvas.getContext(
            "2d",
            {
              alpha:
                format === "png",
            }
          );

        if (
          format === "jpeg"
        ) {
          context.fillStyle =
            "#ffffff";

          context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
          );
        }

        await page.render({
          canvasContext:
            context,
          viewport,
        }).promise;

        const blob =
          await canvasBlob(
            canvas,
            mime,
            Number(quality)
          );

        const padded =
          String(
            pageNumber
          ).padStart(
            String(total).length,
            "0"
          );

        zip.file(
          `page-${padded}.${extension}`,
          blob
        );
      }

      setProgress(
        "Creating ZIP file..."
      );

      const zipBlob =
        await zip.generateAsync({
          type: "blob",
          compression:
            "DEFLATE",
          compressionOptions: {
            level: 6,
          },
        });

      setResult({
        blob: zipBlob,
        filename:
          `pdf-pages-${extension}.zip`,
        size:
          zipBlob.size,
      });

      setMessage(
        `${total} page${
          total === 1 ? "" : "s"
        } converted successfully.`
      );

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "PDF conversion failed."
      );
    } finally {
      setWorking(false);
      setProgress("");
    }
  }

  async function compressPdf() {
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
      const renderPdf =
        await loadRenderer();

      if (
        renderPdf.numPages >
        100
      ) {
        throw new Error(
          "For browser performance, compression supports up to 100 pages at a time."
        );
      }

      const source =
        await PDFDocument.load(
          await file.arrayBuffer()
        );

      const output =
        await PDFDocument.create();

      const sourcePages =
        source.getPages();

      for (
        let pageNumber = 1;
        pageNumber <=
        renderPdf.numPages;
        pageNumber++
      ) {
        setProgress(
          `Compressing page ${pageNumber} of ${renderPdf.numPages}...`
        );

        const renderPage =
          await renderPdf.getPage(
            pageNumber
          );

        const viewport =
          renderPage.getViewport({
            scale:
              Number(scale),
          });

        const canvas =
          document.createElement(
            "canvas"
          );

        canvas.width =
          Math.ceil(
            viewport.width
          );

        canvas.height =
          Math.ceil(
            viewport.height
          );

        const context =
          canvas.getContext(
            "2d"
          );

        context.fillStyle =
          "#ffffff";

        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        await renderPage.render({
          canvasContext:
            context,
          viewport,
        }).promise;

        const imageBlob =
          await canvasBlob(
            canvas,
            "image/jpeg",
            Number(quality)
          );

        const imageBytes =
          await imageBlob.arrayBuffer();

        const image =
          await output.embedJpg(
            imageBytes
          );

        const originalPage =
          sourcePages[
            pageNumber - 1
          ];

        const size =
          originalPage.getSize();

        const newPage =
          output.addPage([
            size.width,
            size.height,
          ]);

        newPage.drawImage(
          image,
          {
            x: 0,
            y: 0,
            width:
              size.width,
            height:
              size.height,
          }
        );
      }

      setProgress(
        "Saving compressed PDF..."
      );

      const bytes =
        await output.save({
          useObjectStreams:
            true,
        });

      const blob =
        new Blob(
          [bytes],
          {
            type:
              "application/pdf",
          }
        );

      setResult({
        blob,
        filename:
          "compressed.pdf",
        size:
          blob.size,
      });

      const difference =
        file.size -
        blob.size;

      const percent =
        file.size > 0
          ? Math.abs(
              difference /
                file.size *
                100
            ).toFixed(1)
          : "0";

      setMessage(
        difference >= 0
          ? `${percent}% smaller than the original.`
          : `${percent}% larger than the original. Try a lower quality or resolution.`
      );

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "PDF compression failed."
      );
    } finally {
      setWorking(false);
      setProgress("");
    }
  }

  const isCompress =
    mode === "compress";

  const isJpg =
    mode === "jpg";

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

      {file && (
        <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-600">
          <strong>
            {file.name}
          </strong>
          <span className="ml-2">
            {prettySize(
              file.size
            )}
          </span>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-semibold">
            Resolution
          </span>

          <select
            value={scale}
            onChange={(event) =>
              setScale(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="1">
              Smaller / faster
            </option>

            <option value="1.5">
              Balanced
            </option>

            <option value="2">
              Higher quality
            </option>
          </select>
        </label>

        {(isCompress ||
          isJpg) && (
          <label>
            <span className="mb-2 block text-sm font-semibold">
              JPEG quality:{" "}
              {Math.round(
                Number(
                  quality
                ) * 100
              )}
              %
            </span>

            <input
              type="range"
              min="0.35"
              max="0.95"
              step="0.05"
              value={quality}
              onChange={(event) =>
                setQuality(
                  event.target.value
                )
              }
              className="w-full"
            />
          </label>
        )}
      </div>

      <button
        type="button"
        disabled={
          working ||
          !file
        }
        onClick={() => {
          if (mode === "compress") {
            compressPdf();
          } else if (
            mode === "jpg"
          ) {
            convertPages(
              "jpeg"
            );
          } else {
            convertPages(
              "png"
            );
          }
        }}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-60"
      >
        {working
          ? "Processing..."
          : mode === "compress"
            ? "Compress PDF"
            : mode === "jpg"
              ? "Convert PDF to JPG"
              : "Convert PDF to PNG"}
      </button>

      {progress && (
        <p className="mt-4 text-center text-sm font-medium text-blue-700">
          {progress}
        </p>
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
            Output size:{" "}
            {prettySize(
              result.size
            )}
          </p>

          <button
            type="button"
            onClick={() =>
              downloadBlob(
                result.blob,
                result.filename
              )
            }
            className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
          >
            Download Result
          </button>
        </div>
      )}
    </div>
  );
}