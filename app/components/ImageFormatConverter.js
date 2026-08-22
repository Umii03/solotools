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

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, exponent);

  return `${value.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
}

export default function ImageFormatConverter({
  sourceLabel,
  sourceMime,
  outputLabel,
  outputMime,
  outputExtension,
  qualityEnabled,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [outputBlob, setOutputBlob] = useState(null);
  const [quality, setQuality] = useState("85");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  function clearOutput() {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setOutputUrl("");
    setOutputBlob(null);
  }

  async function selectFile(selectedFile) {
    if (!selectedFile) return;

    if (selectedFile.type !== sourceMime) {
      setMessage(`Please choose a ${sourceLabel} image.`);
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

      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
    } catch {
      setMessage("The selected image could not be read.");
    }
  }

  async function convertImage() {
    if (!file || !previewUrl) {
      setMessage(`Choose a ${sourceLabel} image first.`);
      return;
    }

    setWorking(true);
    setMessage("");

    try {
      const image = await loadImage(previewUrl);

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser could not create the image canvas.");
      }

      if (outputMime === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      const qualityValue = qualityEnabled
        ? Math.min(1, Math.max(0.1, Number(quality) / 100))
        : undefined;

      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          resolve,
          outputMime,
          qualityValue
        );
      });

      if (!blob) {
        throw new Error(
          "Your browser could not create the converted image."
        );
      }

      clearOutput();

      const nextOutputUrl = URL.createObjectURL(blob);

      setOutputBlob(blob);
      setOutputUrl(nextOutputUrl);
      setMessage("Conversion complete.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image conversion failed."
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
        .replace(/^-+|-+$/g, "") || "converted-image";

    const anchor = document.createElement("a");

    anchor.href = outputUrl;
    anchor.download = `${baseName}.${outputExtension}`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="text-lg font-bold">
          Select a {sourceLabel} image
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Maximum file size: 25 MB
        </p>

        <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">
          Choose {sourceLabel}
          <input
            type="file"
            accept={sourceMime}
            className="hidden"
            onChange={(event) =>
              selectFile(event.target.files?.[0])
            }
          />
        </label>
      </div>

      {file && previewUrl && (
        <>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
            <img
              src={previewUrl}
              alt="Selected image preview"
              className="mx-auto max-h-80 max-w-full rounded-xl object-contain"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Original size
              </p>
              <p className="mt-1 font-semibold">
                {formatBytes(file.size)}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Dimensions
              </p>
              <p className="mt-1 font-semibold">
                {width && height
                  ? `${width} x ${height}`
                  : "-"}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Output
              </p>
              <p className="mt-1 font-semibold">
                {outputLabel}
              </p>
            </div>
          </div>

          {qualityEnabled && (
            <label className="mt-6 block">
              <span className="mb-2 flex justify-between text-sm font-semibold">
                <span>Output quality</span>
                <span className="text-slate-500">
                  {quality}%
                </span>
              </span>

              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(event) => {
                  setQuality(event.target.value);
                  clearOutput();
                }}
                className="w-full"
              />
            </label>
          )}

          <button
            type="button"
            onClick={convertImage}
            disabled={working}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {working
              ? "Converting..."
              : `Convert ${sourceLabel} to ${outputLabel}`}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-slate-600">
              {message}
            </p>
          )}

          {outputUrl && outputBlob && (
            <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-bold text-green-900">
                Converted image ready
              </p>

              <p className="mt-1 text-sm text-green-800">
                Output size: {formatBytes(outputBlob.size)}
              </p>

              <img
                src={outputUrl}
                alt="Converted image preview"
                className="mx-auto mt-5 max-h-80 max-w-full rounded-xl border border-green-200 bg-white object-contain"
              />

              <button
                type="button"
                onClick={downloadImage}
                className="mt-5 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white hover:bg-slate-800"
              >
                Download {outputLabel}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
