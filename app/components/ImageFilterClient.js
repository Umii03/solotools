"use client";

import {
  useEffect,
  useState,
} from "react";

function loadImage(
  url
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const image =
        new Image();

      image.onload =
        () =>
          resolve(image);

      image.onerror =
        reject;

      image.src = url;
    }
  );
}

function canvasBlob(
  canvas,
  mime,
  quality
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
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
        mime,
        quality
      );
    }
  );
}

function extension(
  mime
) {
  if (
    mime === "image/jpeg"
  ) {
    return "jpg";
  }

  if (
    mime === "image/webp"
  ) {
    return "webp";
  }

  return "png";
}

export default function ImageFilterClient({
  mode,
}) {
  const [file, setFile] =
    useState(null);

  const [sourceUrl, setSourceUrl] =
    useState("");

  const [resultUrl, setResultUrl] =
    useState("");

  const [resultBlob, setResultBlob] =
    useState(null);

  const [blur, setBlur] =
    useState("6");

  const [outputType, setOutputType] =
    useState("same");

  const [quality, setQuality] =
    useState("0.9");

  const [message, setMessage] =
    useState("");

  const [working, setWorking] =
    useState(false);

  useEffect(
    () => {
      return () => {
        if (sourceUrl) {
          URL.revokeObjectURL(
            sourceUrl
          );
        }

        if (resultUrl) {
          URL.revokeObjectURL(
            resultUrl
          );
        }
      };
    },
    [
      sourceUrl,
      resultUrl,
    ]
  );

  async function chooseFile(
    selected
  ) {
    setMessage("");
    setResultBlob(null);

    if (resultUrl) {
      URL.revokeObjectURL(
        resultUrl
      );

      setResultUrl("");
    }

    if (!selected) {
      return;
    }

    if (
      selected.size >
      25 * 1024 * 1024
    ) {
      setMessage(
        "Choose an image under 25 MB."
      );

      return;
    }

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(
        selected.type
      )
    ) {
      setMessage(
        "Choose a JPG, PNG, or WebP image."
      );

      return;
    }

    if (sourceUrl) {
      URL.revokeObjectURL(
        sourceUrl
      );
    }

    const url =
      URL.createObjectURL(
        selected
      );

    try {
      await loadImage(url);

      setFile(selected);
      setSourceUrl(url);
    } catch {
      URL.revokeObjectURL(
        url
      );

      setMessage(
        "Could not read this image."
      );
    }
  }

  async function processImage() {
    if (
      !file ||
      !sourceUrl
    ) {
      return;
    }

    setWorking(true);
    setMessage("");

    try {
      const image =
        await loadImage(
          sourceUrl
        );

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width =
        image.naturalWidth;

      canvas.height =
        image.naturalHeight;

      const context =
        canvas.getContext(
          "2d"
        );

      let mime =
        outputType ===
        "same"
          ? file.type
          : outputType;

      if (
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
        ].includes(mime)
      ) {
        mime =
          "image/png";
      }

      if (
        mime ===
        "image/jpeg"
      ) {
        context.filter =
          "none";

        context.fillStyle =
          "#ffffff";

        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      if (
        mode ===
        "sepia"
      ) {
        context.filter =
          "sepia(1)";
      }

      if (
        mode ===
        "invert"
      ) {
        context.filter =
          "invert(1)";
      }

      if (
        mode ===
        "blur"
      ) {
        context.filter =
          `blur(${Math.max(
            0,
            Number(blur) || 0
          )}px)`;
      }

      context.drawImage(
        image,
        0,
        0
      );

      const blob =
        await canvasBlob(
          canvas,
          mime,
          Number(
            quality
          )
        );

      if (resultUrl) {
        URL.revokeObjectURL(
          resultUrl
        );
      }

      const url =
        URL.createObjectURL(
          blob
        );

      setResultBlob(blob);
      setResultUrl(url);
      setMessage(
        `Output ready: ${canvas.width} x ${canvas.height}`
      );

    } catch {
      setMessage(
        "Image processing failed."
      );
    } finally {
      setWorking(false);
    }
  }

  function download() {
    if (
      !resultBlob ||
      !resultUrl ||
      !file
    ) {
      return;
    }

    const base =
      file.name
        .replace(
          /\.[^/.]+$/,
          ""
        )
        .replace(
          /[^a-zA-Z0-9-_]+/g,
          "-"
        ) ||
      "image";

    const anchor =
      document.createElement(
        "a"
      );

    anchor.href =
      resultUrl;

    anchor.download =
      `${base}-${
        mode
      }.${extension(
        resultBlob.type
      )}`;

    document.body.appendChild(
      anchor
    );

    anchor.click();
    anchor.remove();
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="w-full rounded-xl border border-slate-300 bg-white p-4"
        onChange={(event) =>
          chooseFile(
            event.target.files?.[0]
          )
        }
      />

      {sourceUrl && (
        <>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4">
              <p className="mb-3 text-sm font-semibold">
                Original
              </p>

              <img
                src={sourceUrl}
                alt="Original image"
                className="max-h-80 w-full object-contain"
              />
            </div>

            {resultUrl && (
              <div className="rounded-2xl bg-white p-4">
                <p className="mb-3 text-sm font-semibold">
                  Result
                </p>

                <img
                  src={resultUrl}
                  alt="Filtered result"
                  className="max-h-80 w-full object-contain"
                />
              </div>
            )}
          </div>

          {mode === "blur" && (
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-semibold">
                Blur radius: {blur}px
              </span>

              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={blur}
                onChange={(event) =>
                  setBlur(
                    event.target.value
                  )
                }
                className="w-full"
              />
            </label>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Output format
              </span>

              <select
                value={outputType}
                onChange={(event) =>
                  setOutputType(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="same">
                  Same as original
                </option>

                <option value="image/jpeg">
                  JPG
                </option>

                <option value="image/png">
                  PNG
                </option>

                <option value="image/webp">
                  WebP
                </option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Quality:{" "}
                {Math.round(
                  Number(
                    quality
                  ) *
                  100
                )}
                %
              </span>

              <input
                type="range"
                min="0.4"
                max="1"
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
          </div>

          <button
            type="button"
            disabled={working}
            onClick={processImage}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-60"
          >
            {working
              ? "Processing..."
              : "Create Result"}
          </button>
        </>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {resultUrl && (
        <button
          type="button"
          onClick={download}
          className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
        >
          Download Image
        </button>
      )}
    </div>
  );
}