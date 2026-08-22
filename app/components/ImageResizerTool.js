"use client";

import { useState } from "react";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("The selected image could not be loaded."));

    image.src = src;
  });
}

function getExtension(mime) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  return "png";
}

export default function ImageResizerTool() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [ratio, setRatio] = useState(1);
  const [lockRatio, setLockRatio] = useState(true);
  const [outputFormat, setOutputFormat] = useState("same");
  const [quality, setQuality] = useState("85");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  const effectiveMime =
    outputFormat === "same"
      ? file?.type || "image/png"
      : outputFormat;

  function clearOutput() {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setOutputUrl("");
  }

  async function chooseFile(selectedFile) {
    if (!selectedFile) return;

    const supported = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!supported.includes(selectedFile.type)) {
      setMessage("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setMessage("Please choose an image smaller than 25 MB.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    clearOutput();

    const nextPreview = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreviewUrl(nextPreview);
    setMessage("");

    try {
      const image = await loadImage(nextPreview);

      setWidth(String(image.naturalWidth));
      setHeight(String(image.naturalHeight));

      setRatio(
        image.naturalHeight > 0
          ? image.naturalWidth / image.naturalHeight
          : 1
      );
    } catch {
      setMessage("The selected image could not be read.");
    }
  }

  function changeWidth(value) {
    setWidth(value);
    clearOutput();

    const numericWidth = Number(value);

    if (
      lockRatio &&
      numericWidth > 0 &&
      ratio > 0
    ) {
      setHeight(
        String(Math.max(1, Math.round(numericWidth / ratio)))
      );
    }
  }

  function changeHeight(value) {
    setHeight(value);
    clearOutput();

    const numericHeight = Number(value);

    if (
      lockRatio &&
      numericHeight > 0 &&
      ratio > 0
    ) {
      setWidth(
        String(Math.max(1, Math.round(numericHeight * ratio)))
      );
    }
  }

  async function resizeImage() {
    if (!file || !previewUrl) {
      setMessage("Choose an image first.");
      return;
    }

    const targetWidth = Math.round(Number(width));
    const targetHeight = Math.round(Number(height));

    if (
      !Number.isFinite(targetWidth) ||
      !Number.isFinite(targetHeight) ||
      targetWidth < 1 ||
      targetHeight < 1 ||
      targetWidth > 12000 ||
      targetHeight > 12000
    ) {
      setMessage(
        "Width and height must be between 1 and 12000 pixels."
      );
      return;
    }

    setWorking(true);
    setMessage("");

    try {
      const image = await loadImage(previewUrl);

      const canvas = document.createElement("canvas");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser could not create the image canvas.");
      }

      if (effectiveMime === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, targetWidth, targetHeight);
      }

      context.drawImage(
        image,
        0,
        0,
        targetWidth,
        targetHeight
      );

      const qualityValue =
        effectiveMime === "image/png"
          ? undefined
          : Math.min(
              1,
              Math.max(0.1, Number(quality) / 100)
            );

      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          resolve,
          effectiveMime,
          qualityValue
        );
      });

      if (!blob) {
        throw new Error("The resized image could not be created.");
      }

      clearOutput();

      setOutputUrl(URL.createObjectURL(blob));
      setMessage("Resize complete.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image resize failed."
      );
    } finally {
      setWorking(false);
    }
  }

  function downloadImage() {
    if (!file || !outputUrl) return;

    const baseName =
      file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "") || "image";

    const anchor = document.createElement("a");

    anchor.href = outputUrl;
    anchor.download =
      `${baseName}-${width}x${height}.${getExtension(effectiveMime)}`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-xl font-bold">
          Choose an image to resize
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          JPG, PNG, or WebP - up to 25 MB
        </p>

        <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">
          Select Image
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(event) =>
              chooseFile(event.target.files?.[0])
            }
          />
        </label>
      </div>

      {file && (
        <>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Width (px)
              </span>

              <input
                type="number"
                min="1"
                max="12000"
                value={width}
                onChange={(event) =>
                  changeWidth(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Height (px)
              </span>

              <input
                type="number"
                min="1"
                max="12000"
                value={height}
                onChange={(event) =>
                  changeHeight(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={lockRatio}
              onChange={(event) =>
                setLockRatio(event.target.checked)
              }
            />
            Keep original aspect ratio
          </label>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Output format
              </span>

              <select
                value={outputFormat}
                onChange={(event) => {
                  setOutputFormat(event.target.value);
                  clearOutput();
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="same">
                  Keep original format
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
              <span className="mb-2 flex justify-between text-sm font-semibold">
                <span>Quality</span>
                <span className="text-slate-500">
                  {effectiveMime === "image/png"
                    ? "Lossless PNG"
                    : `${quality}%`}
                </span>
              </span>

              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                disabled={effectiveMime === "image/png"}
                onChange={(event) => {
                  setQuality(event.target.value);
                  clearOutput();
                }}
                className="w-full disabled:opacity-40"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={resizeImage}
            disabled={working}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-60"
          >
            {working
              ? "Resizing..."
              : "Resize Image"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-slate-600">
              {message}
            </p>
          )}

          {outputUrl && (
            <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-bold text-green-900">
                Resized image ready
              </p>

              <p className="mt-1 text-sm text-green-800">
                New dimensions: {width} x {height}
              </p>

              <img
                src={outputUrl}
                alt="Resized image preview"
                className="mx-auto mt-5 max-h-80 max-w-full rounded-xl border border-green-200 bg-white object-contain"
              />

              <button
                type="button"
                onClick={downloadImage}
                className="mt-5 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
              >
                Download Resized Image
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
