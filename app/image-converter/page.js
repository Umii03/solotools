"use client";

import { useState } from "react";

const formats = [
  {
    value: "image/png",
    label: "PNG",
    extension: "png",
  },
  {
    value: "image/jpeg",
    label: "JPG",
    extension: "jpg",
  },
  {
    value: "image/webp",
    label: "WebP",
    extension: "webp",
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

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not be loaded."));
    image.src = src;
  });
}

export default function ImageConverterPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [outputBlob, setOutputBlob] = useState(null);
  const [outputType, setOutputType] = useState("image/webp");
  const [quality, setQuality] = useState("85");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  function clearOutput() {
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }

    setOutputUrl("");
    setOutputBlob(null);
  }

  async function handleFile(selectedFile) {
    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    clearOutput();

    const nextPreviewUrl = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreviewUrl(nextPreviewUrl);
    setMessage("");

    try {
      const image = await loadImage(nextPreviewUrl);
      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
    } catch {
      setWidth(0);
      setHeight(0);
      setMessage("The selected image could not be read.");
    }
  }

  function handleInputChange(event) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  }

  function handleDrop(event) {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  }

  async function convertImage() {
    if (!file || !previewUrl) {
      setMessage("Choose an image first.");
      return;
    }

    setIsConverting(true);
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

      if (outputType === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      const qualityValue =
        outputType === "image/png"
          ? undefined
          : Math.min(1, Math.max(0.1, Number(quality) / 100));

      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          resolve,
          outputType,
          qualityValue
        );
      });

      if (!blob) {
        throw new Error(
          "This browser could not create the selected output format."
        );
      }

      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }

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
      setIsConverting(false);
    }
  }

  function downloadImage() {
    if (!file || !outputUrl || !outputBlob) return;

    const format = formats.find(
      (item) => item.value === outputType
    );

    const extension = format?.extension || "png";

    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "converted-image";

    const anchor = document.createElement("a");
    anchor.href = outputUrl;
    anchor.download = `${baseName}.${extension}`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a
            href="/"
            aria-label="SoloTools home"
            className="inline-flex items-center"
          >
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <a
              href="/image-tools/"
              className="text-slate-950"
            >
              Image Tools
            </a>
            <a
              href="/calculators/"
              className="hover:text-slate-950"
            >
              Calculators
            </a>
            <a
              href="/guides/"
              className="hover:text-slate-950"
            >
              Guides
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free browser image converter
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            JPG, PNG & WebP Image Converter
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Convert JPG, PNG, and WebP images directly in your browser.
            Your image stays on your device and is not uploaded to our server.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center"
          >
            <p className="text-lg font-bold">
              Choose an image
            </p>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG, or WebP
            </p>

            <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">
              Select image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>

            <p className="mt-4 text-xs text-slate-500">
              You can also drag and drop an image here.
            </p>
          </div>

          {file && previewUrl && (
            <div className="mt-7">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4">
                <img
                  src={previewUrl}
                  alt="Selected image preview"
                  className="mx-auto max-h-80 max-w-full rounded-xl object-contain"
                />
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    File size
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {formatBytes(file.size)}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Dimensions
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {width && height
                      ? `${width} x ${height}`
                      : "-"}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Current type
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {file.type === "image/jpeg"
                      ? "JPG"
                      : file.type === "image/png"
                        ? "PNG"
                        : "WebP"}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="mb-2 block text-sm font-semibold">
                    Convert to
                  </span>

                  <select
                    value={outputType}
                    onChange={(event) => {
                      setOutputType(event.target.value);
                      clearOutput();
                      setMessage("");
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  >
                    {formats.map((format) => (
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
                  <span className="mb-2 flex items-center justify-between text-sm font-semibold">
                    <span>Quality</span>
                    <span className="text-slate-500">
                      {outputType === "image/png"
                        ? "Lossless"
                        : `${quality}%`}
                    </span>
                  </span>

                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={quality}
                    disabled={outputType === "image/png"}
                    onChange={(event) => {
                      setQuality(event.target.value);
                      clearOutput();
                    }}
                    className="w-full disabled:opacity-40"
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Quality control applies to JPG and WebP output.
                  </p>
                </label>
              </div>

              <button
                type="button"
                onClick={convertImage}
                disabled={isConverting}
                className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isConverting
                  ? "Converting..."
                  : "Convert Image"}
              </button>

              {message && (
                <p className="mt-4 text-center text-sm font-medium text-slate-600">
                  {message}
                </p>
              )}

              {outputUrl && outputBlob && (
                <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
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
                    Download Converted Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            Convert images without uploading them
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            SoloTools processes supported images inside your web browser using
            your device. The selected image does not need to be sent to a
            SoloTools server for conversion.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            This makes the converter useful for quick JPG to PNG, PNG to JPG,
            JPG to WebP, PNG to WebP, WebP to JPG, and WebP to PNG conversions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold">
          How to convert an image
        </h2>

        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-blue-600">
              Step 1
            </p>
            <h3 className="mt-2 font-bold">
              Select your image
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Choose a JPG, PNG, or WebP file from your device.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-blue-600">
              Step 2
            </p>
            <h3 className="mt-2 font-bold">
              Choose output format
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Select JPG, PNG, or WebP and adjust quality when available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-blue-600">
              Step 3
            </p>
            <h3 className="mt-2 font-bold">
              Download the result
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Convert the image and download the new file immediately.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            JPG vs PNG vs WebP
          </h2>

          <div className="mt-7 space-y-6">
            <div>
              <h3 className="text-lg font-bold">
                JPG
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                JPG is widely supported and works well for photographs. It uses
                lossy compression and does not support transparent backgrounds.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                PNG
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                PNG supports transparency and lossless image data, making it
                useful for graphics, screenshots, and logos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                WebP
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                WebP is designed for the web and can often provide smaller file
                sizes while maintaining useful image quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold">
          Frequently asked questions
        </h2>

        <div className="mt-7 space-y-6">
          <div>
            <h3 className="text-lg font-bold">
              Are my images uploaded?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              The converter is designed to process supported images locally in
              your browser rather than uploading them to SoloTools for
              conversion.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Can I convert PNG to JPG?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              Yes. Transparent areas are placed on a white background because
              JPG files do not support transparency.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Can I convert JPG or PNG to WebP?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              Yes. Select WebP as the output format and choose the quality
              level you want.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Does converting change image dimensions?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              No. This converter keeps the original pixel dimensions while
              changing the file format.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-2xl font-bold">
            More SoloTools
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="/image-tools/"
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-400"
            >
              <h3 className="font-bold">
                Image Tools
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Browse free browser-based image utilities.
              </p>
            </a>

            <a
              href="/calculators/"
              className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-400"
            >
              <h3 className="font-bold">
                Calculators
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore salary, freelance, project, and income calculators.
              </p>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            SoloTools - free practical online tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/" className="hover:text-slate-900">
              About
            </a>
            <a href="/contact/" className="hover:text-slate-900">
              Contact
            </a>
            <a href="/privacy-policy/" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms/" className="hover:text-slate-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
