"use client";

import JSZip from "jszip";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const SUPPORTED_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILES = 30;
const MAX_FILE_SIZE =
  25 * 1024 * 1024;

const OUTPUT_OPTIONS = [
  {
    value: "same",
    label: "Same as original",
  },
  {
    value: "image/jpeg",
    label: "JPG",
  },
  {
    value: "image/png",
    label: "PNG",
  },
  {
    value: "image/webp",
    label: "WebP",
  },
];

const MODE_LABELS = {
  convert: "Convert All Images",
  compress: "Compress All Images",
  resize: "Resize All Images",
  crop: "Crop All Images",
  rotate: "Rotate All Images",
  flip: "Flip All Images",
  grayscale: "Convert All to Grayscale",
  adjust: "Apply to All Images",
  sepia: "Apply Sepia to All",
  invert: "Invert All Images",
  blur: "Blur All Images",
};

function createId() {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function formatBytes(bytes) {
  if (
    !Number.isFinite(bytes) ||
    bytes <= 0
  ) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  const exponent =
    Math.min(
      Math.floor(
        Math.log(bytes) /
          Math.log(1024)
      ),
      units.length - 1
    );

  const value =
    bytes /
    Math.pow(
      1024,
      exponent
    );

  return `${value.toFixed(
    exponent === 0 ? 0 : 2
  )} ${units[exponent]}`;
}

function extensionForMime(
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

function safeBaseName(name) {
  return (
    name
      .replace(
        /\.[^/.]+$/,
        ""
      )
      .replace(
        /[^a-zA-Z0-9-_]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      ) || "image"
  );
}

function loadImage(url) {
  return new Promise(
    (resolve, reject) => {
      const image =
        new Image();

      image.onload =
        () => resolve(image);

      image.onerror =
        () =>
          reject(
            new Error(
              "Image could not be loaded."
            )
          );

      image.src = url;
    }
  );
}

function canvasToBlob(
  canvas,
  mime,
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
        mime,
        quality
      );
    }
  );
}

function clamp(
  value,
  minimum,
  maximum
) {
  return Math.min(
    maximum,
    Math.max(
      minimum,
      value
    )
  );
}

function suffixForMode(mode) {
  const suffixes = {
    convert: "converted",
    compress: "compressed",
    resize: "resized",
    crop: "cropped",
    rotate: "rotated",
    flip: "flipped",
    grayscale: "grayscale",
    adjust: "adjusted",
    sepia: "sepia",
    invert: "inverted",
    blur: "blurred",
  };

  return (
    suffixes[mode] ||
    "processed"
  );
}

export default function ImageBatchWorkbench({
  mode,
  sourceMimes = SUPPORTED_MIMES,
  sourceLabel = "JPG, PNG or WebP",
  fixedOutputMime = "",
  fixedOutputExtension = "",
  fixedOutputLabel = "",
  qualityEnabled = true,
  selectableOutput = true,
  allowSameOutput = true,
  defaultOutput = "same",
}) {
  const [items, setItems] =
    useState([]);

  const itemsRef =
    useRef([]);

  const [message, setMessage] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const [zipWorking, setZipWorking] =
    useState(false);

  const [progress, setProgress] =
    useState({
      done: 0,
      total: 0,
    });

  const [outputFormat, setOutputFormat] =
    useState(
      fixedOutputMime ||
        defaultOutput
    );

  const [quality, setQuality] =
    useState("85");

  const [resizeWidth, setResizeWidth] =
    useState("1200");

  const [resizeHeight, setResizeHeight] =
    useState("");

  const [
    preserveAspect,
    setPreserveAspect,
  ] = useState(true);

  const [cropLeft, setCropLeft] =
    useState("0");

  const [cropTop, setCropTop] =
    useState("0");

  const [cropWidth, setCropWidth] =
    useState("100");

  const [cropHeight, setCropHeight] =
    useState("100");

  const [angle, setAngle] =
    useState("90");

  const [
    flipDirection,
    setFlipDirection,
  ] = useState("horizontal");

  const [
    brightness,
    setBrightness,
  ] = useState("0");

  const [
    contrast,
    setContrast,
  ] = useState("0");

  const [blur, setBlur] =
    useState("6");

  const allowedMimes =
    Array.isArray(
      sourceMimes
    )
      ? sourceMimes
      : [sourceMimes];

  function commitItems(
    updater
  ) {
    setItems(
      (previous) => {
        const next =
          typeof updater ===
          "function"
            ? updater(
                previous
              )
            : updater;

        itemsRef.current =
          next;

        return next;
      }
    );
  }

  function patchItem(
    id,
    patch
  ) {
    commitItems(
      (previous) =>
        previous.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  ...patch,
                }
              : item
        )
    );
  }

  useEffect(() => {
    return () => {
      for (
        const item of
        itemsRef.current
      ) {
        if (
          item.previewUrl
        ) {
          URL.revokeObjectURL(
            item.previewUrl
          );
        }

        if (
          item.resultUrl
        ) {
          URL.revokeObjectURL(
            item.resultUrl
          );
        }
      }
    };
  }, []);

  async function addFiles(
    fileList
  ) {
    const incoming =
      Array.from(
        fileList || []
      );

    if (
      incoming.length === 0
    ) {
      return;
    }

    const room =
      MAX_FILES -
      itemsRef.current
        .length;

    if (room <= 0) {
      setMessage(
        `Maximum ${MAX_FILES} images per batch.`
      );

      return;
    }

    let rejected = 0;

    const accepted = [];

    for (
      const file of
      incoming
    ) {
      if (
        accepted.length >=
        room
      ) {
        rejected += 1;
        continue;
      }

      if (
        !allowedMimes.includes(
          file.type
        )
      ) {
        rejected += 1;
        continue;
      }

      if (
        file.size >
        MAX_FILE_SIZE
      ) {
        rejected += 1;
        continue;
      }

      const previewUrl =
        URL.createObjectURL(
          file
        );

      accepted.push({
        id: createId(),
        file,
        previewUrl,
        width: 0,
        height: 0,
        status: "ready",
        resultBlob: null,
        resultUrl: "",
        resultName: "",
        resultWidth: 0,
        resultHeight: 0,
        error: "",
      });
    }

    if (
      accepted.length >
      0
    ) {
      commitItems(
        (previous) => [
          ...previous,
          ...accepted,
        ]
      );
    }

    setMessage(
      rejected > 0
        ? `${accepted.length} image(s) added. ${rejected} skipped because of format, size, or the ${MAX_FILES}-image limit.`
        : `${accepted.length} image(s) added to the batch.`
    );

    for (
      const item of
      accepted
    ) {
      try {
        const image =
          await loadImage(
            item.previewUrl
          );

        patchItem(
          item.id,
          {
            width:
              image.naturalWidth,
            height:
              image.naturalHeight,
          }
        );
      } catch {
        patchItem(
          item.id,
          {
            status:
              "error",
            error:
              "Could not read this image.",
          }
        );
      }
    }
  }

  function removeItem(id) {
    if (working) {
      return;
    }

    const item =
      itemsRef.current.find(
        (entry) =>
          entry.id === id
      );

    if (!item) {
      return;
    }

    if (
      item.previewUrl
    ) {
      URL.revokeObjectURL(
        item.previewUrl
      );
    }

    if (
      item.resultUrl
    ) {
      URL.revokeObjectURL(
        item.resultUrl
      );
    }

    commitItems(
      (previous) =>
        previous.filter(
          (entry) =>
            entry.id !== id
        )
    );
  }

  function clearQueue() {
    if (working) {
      return;
    }

    for (
      const item of
      itemsRef.current
    ) {
      if (
        item.previewUrl
      ) {
        URL.revokeObjectURL(
          item.previewUrl
        );
      }

      if (
        item.resultUrl
      ) {
        URL.revokeObjectURL(
          item.resultUrl
        );
      }
    }

    commitItems([]);
    setProgress({
      done: 0,
      total: 0,
    });

    setMessage("");
  }

  function resolveOutputMime(
    sourceMime
  ) {
    if (
      fixedOutputMime
    ) {
      return fixedOutputMime;
    }

    if (
      outputFormat ===
      "same"
    ) {
      return sourceMime;
    }

    return outputFormat;
  }

  async function processItem(
    item
  ) {
    const image =
      await loadImage(
        item.previewUrl
      );

    const outputMime =
      resolveOutputMime(
        item.file.type
      );

    let canvas =
      document.createElement(
        "canvas"
      );

    let context;

    function setupCanvas(
      width,
      height
    ) {
      canvas.width =
        Math.max(
          1,
          Math.round(width)
        );

      canvas.height =
        Math.max(
          1,
          Math.round(height)
        );

      context =
        canvas.getContext(
          "2d"
        );

      if (!context) {
        throw new Error(
          "Your browser could not create an image canvas."
        );
      }

      if (
        outputMime ===
        "image/jpeg"
      ) {
        context.save();
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

        context.restore();
      }
    }

    if (
      mode === "convert" ||
      mode === "compress"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "resize"
    ) {
      let targetWidth =
        Number(
          resizeWidth
        );

      let targetHeight =
        Number(
          resizeHeight
        );

      if (
        preserveAspect
      ) {
        if (
          Number.isFinite(
            targetWidth
          ) &&
          targetWidth > 0
        ) {
          targetHeight =
            image.naturalHeight *
            (
              targetWidth /
              image.naturalWidth
            );
        } else if (
          Number.isFinite(
            targetHeight
          ) &&
          targetHeight > 0
        ) {
          targetWidth =
            image.naturalWidth *
            (
              targetHeight /
              image.naturalHeight
            );
        } else {
          throw new Error(
            "Enter a resize width or height."
          );
        }
      } else {
        if (
          !Number.isFinite(
            targetWidth
          ) ||
          !Number.isFinite(
            targetHeight
          ) ||
          targetWidth <= 0 ||
          targetHeight <= 0
        ) {
          throw new Error(
            "Enter valid width and height values."
          );
        }
      }

      if (
        targetWidth >
          12000 ||
        targetHeight >
          12000
      ) {
        throw new Error(
          "Maximum output dimension is 12000 pixels."
        );
      }

      setupCanvas(
        targetWidth,
        targetHeight
      );

      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    if (
      mode === "crop"
    ) {
      const left =
        clamp(
          Number(
            cropLeft
          ) || 0,
          0,
          99
        );

      const top =
        clamp(
          Number(
            cropTop
          ) || 0,
          0,
          99
        );

      const widthPercent =
        clamp(
          Number(
            cropWidth
          ) || 100,
          1,
          100 - left
        );

      const heightPercent =
        clamp(
          Number(
            cropHeight
          ) || 100,
          1,
          100 - top
        );

      const sourceX =
        image.naturalWidth *
        left /
        100;

      const sourceY =
        image.naturalHeight *
        top /
        100;

      const sourceWidth =
        image.naturalWidth *
        widthPercent /
        100;

      const sourceHeight =
        image.naturalHeight *
        heightPercent /
        100;

      setupCanvas(
        sourceWidth,
        sourceHeight
      );

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    if (
      mode === "rotate"
    ) {
      const degrees =
        Number(angle);

      const swap =
        degrees === 90 ||
        degrees === 270;

      setupCanvas(
        swap
          ? image.naturalHeight
          : image.naturalWidth,
        swap
          ? image.naturalWidth
          : image.naturalHeight
      );

      if (
        degrees === 90
      ) {
        context.translate(
          canvas.width,
          0
        );

        context.rotate(
          Math.PI / 2
        );
      } else if (
        degrees === 180
      ) {
        context.translate(
          canvas.width,
          canvas.height
        );

        context.rotate(
          Math.PI
        );
      } else {
        context.translate(
          0,
          canvas.height
        );

        context.rotate(
          -Math.PI / 2
        );
      }

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "flip"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      if (
        flipDirection ===
        "horizontal"
      ) {
        context.translate(
          canvas.width,
          0
        );

        context.scale(
          -1,
          1
        );
      } else {
        context.translate(
          0,
          canvas.height
        );

        context.scale(
          1,
          -1
        );
      }

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "grayscale"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      context.filter =
        "grayscale(1)";

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "sepia"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      context.filter =
        "sepia(1)";

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "invert"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      context.filter =
        "invert(1)";

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "blur"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      context.filter =
        `blur(${clamp(
          Number(blur) ||
            0,
          0,
          20
        )}px)`;

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (
      mode === "adjust"
    ) {
      setupCanvas(
        image.naturalWidth,
        image.naturalHeight
      );

      const bright =
        clamp(
          100 +
            Number(
              brightness
            ),
          0,
          200
        );

      const contrastValue =
        clamp(
          100 +
            Number(
              contrast
            ),
          0,
          200
        );

      context.filter =
        `brightness(${bright}%) contrast(${contrastValue}%)`;

      context.drawImage(
        image,
        0,
        0
      );
    }

    if (!context) {
      throw new Error(
        "Unknown image operation."
      );
    }

    const qualityValue =
      outputMime ===
      "image/png"
        ? undefined
        : clamp(
            Number(
              quality
            ) /
              100,
            0.1,
            1
          );

    const blob =
      await canvasToBlob(
        canvas,
        outputMime,
        qualityValue
      );

    const base =
      safeBaseName(
        item.file.name
      );

    const extension =
      fixedOutputExtension ||
      extensionForMime(
        outputMime
      );

    const resultName =
      mode === "convert" &&
      fixedOutputMime
        ? `${base}.${extension}`
        : `${base}-${suffixForMode(
            mode
          )}.${extension}`;

    return {
      blob,
      resultName,
      width:
        canvas.width,
      height:
        canvas.height,
    };
  }

  async function processAll() {
    if (
      itemsRef.current
        .length === 0
    ) {
      setMessage(
        "Add one or more images first."
      );

      return;
    }

    setWorking(true);
    setMessage("");

    const snapshot =
      [
        ...itemsRef.current,
      ];

    for (
      const item of
      snapshot
    ) {
      if (
        item.resultUrl
      ) {
        URL.revokeObjectURL(
          item.resultUrl
        );
      }
    }

    commitItems(
      (previous) =>
        previous.map(
          (item) => ({
            ...item,
            status:
              item.error &&
              item.width === 0
                ? "error"
                : "ready",
            resultBlob:
              null,
            resultUrl: "",
            resultName: "",
            resultWidth: 0,
            resultHeight: 0,
            error:
              item.width === 0 &&
              item.error
                ? item.error
                : "",
          })
        )
    );

    setProgress({
      done: 0,
      total:
        snapshot.length,
    });

    let successCount = 0;
    let failureCount = 0;

    for (
      let index = 0;
      index <
      snapshot.length;
      index++
    ) {
      const item =
        snapshot[index];

      patchItem(
        item.id,
        {
          status:
            "processing",
          error: "",
        }
      );

      try {
        const result =
          await processItem(
            item
          );

        const resultUrl =
          URL.createObjectURL(
            result.blob
          );

        patchItem(
          item.id,
          {
            status:
              "done",
            resultBlob:
              result.blob,
            resultUrl,
            resultName:
              result.resultName,
            resultWidth:
              result.width,
            resultHeight:
              result.height,
            error: "",
          }
        );

        successCount += 1;
      } catch (error) {
        patchItem(
          item.id,
          {
            status:
              "error",
            error:
              error instanceof
              Error
                ? error.message
                : "Image processing failed.",
          }
        );

        failureCount += 1;
      }

      setProgress({
        done:
          index + 1,
        total:
          snapshot.length,
      });
    }

    setMessage(
      failureCount > 0
        ? `${successCount} image(s) processed. ${failureCount} failed.`
        : `${successCount} image(s) processed successfully.`
    );

    setWorking(false);
  }

  function downloadOne(
    item
  ) {
    if (
      !item.resultUrl ||
      !item.resultName
    ) {
      return;
    }

    const anchor =
      document.createElement(
        "a"
      );

    anchor.href =
      item.resultUrl;

    anchor.download =
      item.resultName;

    document.body.appendChild(
      anchor
    );

    anchor.click();
    anchor.remove();
  }

  async function downloadAllZip() {
    const completed =
      itemsRef.current.filter(
        (item) =>
          item.status ===
            "done" &&
          item.resultBlob
      );

    if (
      completed.length === 0
    ) {
      setMessage(
        "Process the images first."
      );

      return;
    }

    setZipWorking(true);

    try {
      const zip =
        new JSZip();

      const names =
        new Map();

      for (
        const item of
        completed
      ) {
        let name =
          item.resultName;

        const currentCount =
          names.get(name) ||
          0;

        names.set(
          name,
          currentCount + 1
        );

        if (
          currentCount > 0
        ) {
          const dot =
            name.lastIndexOf(
              "."
            );

          if (dot > 0) {
            name =
              `${name.slice(
                0,
                dot
              )}-${currentCount + 1}${name.slice(
                dot
              )}`;
          } else {
            name =
              `${name}-${currentCount + 1}`;
          }
        }

        zip.file(
          name,
          item.resultBlob
        );
      }

      const blob =
        await zip.generateAsync(
          {
            type: "blob",
            compression:
              "DEFLATE",
            compressionOptions: {
              level: 6,
            },
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const anchor =
        document.createElement(
          "a"
        );

      anchor.href = url;

      anchor.download =
        `solotools-${suffixForMode(
          mode
        )}-images.zip`;

      document.body.appendChild(
        anchor
      );

      anchor.click();
      anchor.remove();

      setTimeout(
        () =>
          URL.revokeObjectURL(
            url
          ),
        1000
      );

      setMessage(
        `${completed.length} result(s) added to ZIP.`
      );
    } catch {
      setMessage(
        "Could not create ZIP download."
      );
    } finally {
      setZipWorking(false);
    }
  }

  const completedCount =
    items.filter(
      (item) =>
        item.status ===
        "done"
    ).length;

  const showQuality =
    qualityEnabled &&
    fixedOutputMime !==
      "image/png" &&
    outputFormat !==
      "image/png";

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">
            Batch image mode
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Process up to {MAX_FILES} images at once.
          </p>
        </div>

        {fixedOutputLabel && (
          <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            Output: {fixedOutputLabel}
          </span>
        )}
      </div>

      <label
        onDragOver={(event) =>
          event.preventDefault()
        }
        onDrop={(event) => {
          event.preventDefault();

          if (!working) {
            addFiles(
              event.dataTransfer
                .files
            );
          }
        }}
        className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-blue-500"
      >
        <input
          type="file"
          multiple
          disabled={working}
          accept={allowedMimes.join(
            ","
          )}
          onChange={(event) => {
            addFiles(
              event.target.files
            );

            event.target.value =
              "";
          }}
          className="hidden"
        />

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          +
        </div>

        <p className="mt-4 font-bold text-slate-900">
          Select multiple images
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Or drag and drop {sourceLabel} images here.
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Maximum 25 MB per image. Up to {MAX_FILES} images per batch.
        </p>
      </label>

      {items.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-600">
            {items.length} image(s) in queue
          </p>

          <button
            type="button"
            disabled={working}
            onClick={clearQueue}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50"
          >
            Clear queue
          </button>
        </div>
      )}

      {mode === "resize" && (
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-bold">
            Resize settings
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Width (px)
              </span>

              <input
                type="number"
                min="1"
                max="12000"
                value={resizeWidth}
                onChange={(event) =>
                  setResizeWidth(
                    event.target.value
                  )
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
                value={resizeHeight}
                disabled={
                  preserveAspect
                }
                onChange={(event) =>
                  setResizeHeight(
                    event.target.value
                  )
                }
                placeholder={
                  preserveAspect
                    ? "Automatic"
                    : "Enter height"
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 disabled:bg-slate-100"
              />
            </label>
          </div>

          <label className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                preserveAspect
              }
              onChange={(event) =>
                setPreserveAspect(
                  event.target.checked
                )
              }
            />

            <span className="text-sm font-semibold">
              Preserve each image's aspect ratio
            </span>
          </label>
        </div>
      )}

      {mode === "crop" && (
        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-bold">
            Batch crop area
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Percentages apply the same relative crop area to every image, even when their dimensions are different.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Left (%)",
                cropLeft,
                setCropLeft,
              ],
              [
                "Top (%)",
                cropTop,
                setCropTop,
              ],
              [
                "Width (%)",
                cropWidth,
                setCropWidth,
              ],
              [
                "Height (%)",
                cropHeight,
                setCropHeight,
              ],
            ].map(
              ([
                label,
                value,
                setter,
              ]) => (
                <label key={label}>
                  <span className="mb-2 block text-sm font-semibold">
                    {label}
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="100"
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
        </div>
      )}

      {mode === "rotate" && (
        <label className="mt-7 block rounded-2xl border border-slate-200 bg-white p-5">
          <span className="mb-2 block font-bold">
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
      )}

      {mode === "flip" && (
        <label className="mt-7 block rounded-2xl border border-slate-200 bg-white p-5">
          <span className="mb-2 block font-bold">
            Flip direction
          </span>

          <select
            value={
              flipDirection
            }
            onChange={(event) =>
              setFlipDirection(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="horizontal">
              Horizontal
            </option>

            <option value="vertical">
              Vertical
            </option>
          </select>
        </label>
      )}

      {mode === "adjust" && (
        <div className="mt-7 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Brightness: {brightness}
            </span>

            <input
              type="range"
              min="-100"
              max="100"
              value={brightness}
              onChange={(event) =>
                setBrightness(
                  event.target.value
                )
              }
              className="w-full"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Contrast: {contrast}
            </span>

            <input
              type="range"
              min="-100"
              max="100"
              value={contrast}
              onChange={(event) =>
                setContrast(
                  event.target.value
                )
              }
              className="w-full"
            />
          </label>
        </div>
      )}

      {mode === "blur" && (
        <label className="mt-7 block rounded-2xl border border-slate-200 bg-white p-5">
          <span className="mb-2 block font-bold">
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

      {selectableOutput &&
        !fixedOutputMime && (
          <div className="mt-7 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Output format
              </span>

              <select
                value={
                  outputFormat
                }
                onChange={(event) =>
                  setOutputFormat(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                {OUTPUT_OPTIONS
                  .filter(
                    (option) =>
                      allowSameOutput ||
                      option.value !==
                        "same"
                  )
                  .map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    )
                  )}
              </select>
            </label>

            {showQuality && (
              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Quality: {quality}%
                </span>

                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(event) =>
                    setQuality(
                      event.target.value
                    )
                  }
                  className="w-full"
                />

                {outputFormat ===
                  "same" && (
                  <span className="mt-1 block text-xs text-slate-500">
                    PNG files ignore the quality setting.
                  </span>
                )}
              </label>
            )}
          </div>
        )}

      {!selectableOutput &&
        showQuality && (
          <label className="mt-7 block rounded-2xl border border-slate-200 bg-white p-5">
            <span className="mb-2 block text-sm font-semibold">
              Output quality: {quality}%
            </span>

            <input
              type="range"
              min="10"
              max="100"
              step="5"
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

      {items.length > 0 && (
        <>
          <button
            type="button"
            disabled={working}
            onClick={processAll}
            className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {working
              ? `Processing ${progress.done}/${progress.total}...`
              : MODE_LABELS[
                  mode
                ] ||
                "Process All Images"}
          </button>

          {working &&
            progress.total > 0 && (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{
                    width:
                      `${
                        (
                          progress.done /
                          progress.total
                        ) *
                        100
                      }%`,
                  }}
                />
              </div>
            )}
        </>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {completedCount > 0 && (
        <button
          type="button"
          disabled={
            zipWorking ||
            working
          }
          onClick={
            downloadAllZip
          }
          className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white disabled:opacity-60"
        >
          {zipWorking
            ? "Creating ZIP..."
            : `Download All ${completedCount} as ZIP`}
        </button>
      )}

      {items.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          {items.map(
            (item) => {
              const saving =
                item.resultBlob &&
                item.file.size >
                  0
                  ? (
                      (
                        item.file
                          .size -
                        item
                          .resultBlob
                          .size
                      ) /
                      item.file
                        .size
                    ) *
                    100
                  : 0;

              return (
                <div
                  key={
                    item.id
                  }
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-[16/10] bg-slate-100">
                    <img
                      src={
                        item.resultUrl ||
                        item.previewUrl
                      }
                      alt={
                        item.file
                          .name
                      }
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                          {
                            item.file
                              .name
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatBytes(
                            item.file
                              .size
                          )}

                          {item.width >
                            0 &&
                            item.height >
                              0 &&
                            ` - ${item.width} x ${item.height}`}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={
                          working
                        }
                        onClick={() =>
                          removeItem(
                            item.id
                          )
                        }
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-red-600 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3">
                      {item.status ===
                        "ready" && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                          Ready
                        </span>
                      )}

                      {item.status ===
                        "processing" && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-700">
                          Processing
                        </span>
                      )}

                      {item.status ===
                        "done" && (
                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                          Done
                        </span>
                      )}

                      {item.status ===
                        "error" && (
                        <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
                          Error
                        </span>
                      )}
                    </div>

                    {item.status ===
                      "done" &&
                      item.resultBlob && (
                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                          <p>
                            Output:{" "}
                            <strong>
                              {formatBytes(
                                item
                                  .resultBlob
                                  .size
                              )}
                            </strong>
                          </p>

                          <p className="mt-1">
                            Dimensions:{" "}
                            <strong>
                              {
                                item.resultWidth
                              }{" "}
                              x{" "}
                              {
                                item.resultHeight
                              }
                            </strong>
                          </p>

                          {mode ===
                            "compress" && (
                            <p className="mt-1">
                              Size change:{" "}
                              <strong>
                                {saving >=
                                0
                                  ? `${saving.toFixed(
                                      1
                                    )}% smaller`
                                  : `${Math.abs(
                                      saving
                                    ).toFixed(
                                      1
                                    )}% larger`}
                              </strong>
                            </p>
                          )}
                        </div>
                      )}

                    {item.error && (
                      <p className="mt-3 text-sm font-medium text-red-600">
                        {
                          item.error
                        }
                      </p>
                    )}

                    {item.status ===
                      "done" && (
                      <button
                        type="button"
                        onClick={() =>
                          downloadOne(
                            item
                          )
                        }
                        className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-blue-400 hover:text-blue-600"
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}