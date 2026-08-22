"use client";

import {
  useState,
} from "react";

import {
  degrees,
  PDFDocument,
} from "pdf-lib";

import {
  downloadPdf,
  safeFileBase,
} from "./pdfUtils";

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

export default function OrganizePdfClient() {
  const [file, setFile] =
    useState(null);

  const [pages, setPages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const [dragIndex, setDragIndex] =
    useState(null);

  const [result, setResult] =
    useState(null);

  async function chooseFile(selected) {
    setPages([]);
    setResult(null);
    setMessage("");

    if (!selected) {
      setFile(null);
      return;
    }

    if (
      selected.size >
      30 * 1024 * 1024
    ) {
      setMessage(
        "Please choose a PDF under 30 MB."
      );
      return;
    }

    setWorking(true);

    try {
      const pdfjs =
        await loadPdfJs();

      const data =
        new Uint8Array(
          await selected.arrayBuffer()
        );

      const pdf =
        await pdfjs
          .getDocument({
            data,
          })
          .promise;

      if (
        pdf.numPages > 80
      ) {
        throw new Error(
          "For browser performance, visual organization supports up to 80 pages at a time."
        );
      }

      const nextPages = [];

      for (
        let pageNumber = 1;
        pageNumber <=
        pdf.numPages;
        pageNumber++
      ) {
        setMessage(
          `Creating thumbnail ${pageNumber} of ${pdf.numPages}...`
        );

        const page =
          await pdf.getPage(
            pageNumber
          );

        const viewport =
          page.getViewport({
            scale: 0.28,
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

        await page.render({
          canvasContext:
            context,
          viewport,
        }).promise;

        nextPages.push({
          id:
            `${pageNumber}-${Date.now()}`,
          sourceIndex:
            pageNumber - 1,
          originalNumber:
            pageNumber,
          rotation: 0,
          thumbnail:
            canvas.toDataURL(
              "image/jpeg",
              0.7
            ),
        });
      }

      setFile(selected);
      setPages(nextPages);
      setMessage(
        "Drag pages or use the arrow buttons to change order."
      );

    } catch (error) {
      setFile(null);

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not load this PDF."
      );

    } finally {
      setWorking(false);
    }
  }

  function movePage(
    from,
    to
  ) {
    if (
      from === to ||
      to < 0 ||
      to >= pages.length
    ) {
      return;
    }

    setPages(
      (current) => {
        const next =
          [...current];

        const [item] =
          next.splice(
            from,
            1
          );

        next.splice(
          to,
          0,
          item
        );

        return next;
      }
    );
  }

  function removePage(index) {
    if (
      pages.length <= 1
    ) {
      setMessage(
        "At least one page must remain."
      );
      return;
    }

    setPages(
      (current) =>
        current.filter(
          (_, itemIndex) =>
            itemIndex !==
            index
        )
    );
  }

  function rotatePage(index) {
    setPages(
      (current) =>
        current.map(
          (page, itemIndex) =>
            itemIndex === index
              ? {
                  ...page,
                  rotation:
                    (
                      page.rotation +
                      90
                    ) %
                    360,
                }
              : page
        )
    );
  }

  async function savePdf() {
    if (
      !file ||
      pages.length < 1
    ) {
      return;
    }

    setWorking(true);
    setResult(null);
    setMessage(
      "Creating organized PDF..."
    );

    try {
      const source =
        await PDFDocument.load(
          await file.arrayBuffer()
        );

      const output =
        await PDFDocument.create();

      const copied =
        await output.copyPages(
          source,
          pages.map(
            (page) =>
              page.sourceIndex
          )
        );

      copied.forEach(
        (page, index) => {
          const current =
            page
              .getRotation()
              .angle || 0;

          page.setRotation(
            degrees(
              (
                current +
                pages[index]
                  .rotation
              ) %
              360
            )
          );

          output.addPage(
            page
          );
        }
      );

      const bytes =
        await output.save({
          useObjectStreams:
            true,
        });

      setResult({
        bytes,
        filename:
          `${safeFileBase(
            file.name
          )}-organized.pdf`,
      });

      setMessage(
        "Organized PDF is ready."
      );

    } catch {
      setMessage(
        "Could not create the organized PDF."
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

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {pages.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pages.map(
            (page, index) => (
              <div
                key={page.id}
                draggable
                onDragStart={() =>
                  setDragIndex(
                    index
                  )
                }
                onDragOver={(event) =>
                  event.preventDefault()
                }
                onDrop={() => {
                  if (
                    dragIndex !==
                    null
                  ) {
                    movePage(
                      dragIndex,
                      index
                    );

                    setDragIndex(
                      null
                    );
                  }
                }}
                className="rounded-2xl border border-slate-200 bg-white p-3"
              >
                <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={
                      page.thumbnail
                    }
                    alt={`PDF page ${page.originalNumber}`}
                    className="max-h-52 w-auto"
                    style={{
                      transform:
                        `rotate(${page.rotation}deg)`,
                    }}
                  />
                </div>

                <p className="mt-3 text-center text-sm font-bold">
                  Page{" "}
                  {page.originalNumber}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      movePage(
                        index,
                        index - 1
                      )
                    }
                    className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
                  >
                    &lt; Left
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      movePage(
                        index,
                        index + 1
                      )
                    }
                    className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
                  >
                    Right &gt;
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      rotatePage(
                        index
                      )
                    }
                    className="rounded-lg bg-blue-50 px-2 py-2 text-sm font-semibold text-blue-700"
                  >
                    Rotate
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removePage(
                        index
                      )
                    }
                    className="rounded-lg bg-red-50 px-2 py-2 text-sm font-semibold text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {pages.length > 0 && (
        <button
          type="button"
          disabled={working}
          onClick={savePdf}
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-60"
        >
          {working
            ? "Processing..."
            : "Create Organized PDF"}
        </button>
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
          Download Organized PDF
        </button>
      )}
    </div>
  );
}