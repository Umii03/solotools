"use client";

import { useState } from "react";

const outputFormats = [
  {
    value: "same",
    label: "Keep original format",
  },
  {
    value: "image/webp",
    label: "WebP",
  },
  {
    value: "image/jpeg",
    label: "JPG",
  },
  {
    value: "image/png",
    label: "PNG",
  },
];

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / Math.pow(1024, exponent);

  return `${value.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
}

function getExtension(mime) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  return "png";
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("The selected image could not be loaded."));

    image.src = src;
  });
}

export default function ImageCompressorTool() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [outputBlob, setOutputBlob] = useState(null);
  const [outputFormat, setOutputFormat] = useState("same");
  const [quality, setQuality] = useState("75");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  const effectiveMime =
    outputFormat === "same"
      ? file?.type || "image/webp"
      : outputFormat;

  const qualityDisabled =
    effectiveMime === "image/png";

  function clearOutput() {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setOutputUrl("");
    setOutputBlob(null);
  }

  function chooseFile(selectedFile) {
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
  }

  async function compressImage() {
    if (!file || !previewUrl) {
      setMessage("Choose an image first.");
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

      if (effectiveMime === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

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
        throw new Error("The compressed image could not be created.");
      }

      clearOutput();

      const nextOutputUrl = URL.createObjectURL(blob);

      setOutputBlob(blob);
      setOutputUrl(nextOutputUrl);
      setMessage("Compression complete.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image compression failed."
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
      `${baseName}-compressed.${getExtension(effectiveMime)}`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  const saving =
    file && outputBlob
      ? ((file.size - outputBlob.size) / file.size) * 100
      : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-xl font-bold">
          Choose an image to compress
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          JPG, PNG, or WebP - up to 25 MB
        </p>

        <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">
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
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
                {outputFormats.map((format) => (
                  <option
                    key={format.value}
                    value={format.value}
                  >
                    {format.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 flex justify-between text-sm font-semibold">
                <span>Quality</span>

                <span className="text-slate-500">
                  {qualityDisabled
                    ? "Lossless PNG"
                    : `${quality}%`}
                </span>
              </span>

              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                disabled={qualityDisabled}
                onChange={(event) => {
                  setQuality(event.target.value);
                  clearOutput();
                }}
                className="w-full disabled:opacity-40"
              />
            </label>
          </div>

          <div className="mt-5 rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">
              Original size
            </p>

            <p className="mt-1 text-xl font-bold">
              {formatBytes(file.size)}
            </p>
          </div>

          <button
            type="button"
            onClick={compressImage}
            disabled={working}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {working
              ? "Compressing..."
              : "Compress Image"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-slate-600">
              {message}
            </p>
          )}

          {outputUrl && outputBlob && (
            <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-bold text-green-900">
                Compressed image ready
              </p>

              <p className="mt-2 text-sm text-green-800">
                New size: {formatBytes(outputBlob.size)}
              </p>

              <p className="mt-1 text-sm text-green-800">
                {saving >= 0
                  ? `${saving.toFixed(1)}% smaller`
                  : `${Math.abs(saving).toFixed(1)}% larger`}
              </p>

              <img
                src={outputUrl}
                alt="Compressed image preview"
                className="mx-auto mt-5 max-h-80 max-w-full rounded-xl border border-green-200 bg-white object-contain"
              />

              <button
                type="button"
                onClick={downloadImage}
                className="mt-5 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
              >
                Download Compressed Image
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
