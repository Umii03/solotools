"use client";

import {
  useEffect,
  useState,
} from "react";

function loadImage(url) {
  return new Promise(
    (resolve, reject) => {
      const image =
        new Image();

      image.onload =
        () => resolve(image);

      image.onerror =
        reject;

      image.src = url;
    }
  );
}

function blobFromCanvas(
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

export default function ImageEditClient({
  mode,
}) {
  const [file, setFile] =
    useState(null);

  const [sourceUrl, setSourceUrl] =
    useState("");

  const [width, setWidth] =
    useState(0);

  const [height, setHeight] =
    useState(0);

  const [cropX, setCropX] =
    useState("0");

  const [cropY, setCropY] =
    useState("0");

  const [cropWidth, setCropWidth] =
    useState("");

  const [cropHeight, setCropHeight] =
    useState("");

  const [angle, setAngle] =
    useState("90");

  const [flipDirection, setFlipDirection] =
    useState("horizontal");

  const [brightness, setBrightness] =
    useState("0");

  const [contrast, setContrast] =
    useState("0");

  const [outputType, setOutputType] =
    useState("same");

  const [quality, setQuality] =
    useState("0.85");

  const [resultUrl, setResultUrl] =
    useState("");

  const [resultBlob, setResultBlob] =
    useState(null);

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
    [sourceUrl, resultUrl]
  );

  async function chooseFile(
    selected
  ) {
    setResultUrl("");
    setResultBlob(null);
    setMessage("");

    if (!selected) {
      return;
    }

    if (
      selected.size >
      25 * 1024 * 1024
    ) {
      setMessage(
        "Please choose an image under 25 MB."
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
      const image =
        await loadImage(url);

      setFile(selected);
      setSourceUrl(url);
      setWidth(
        image.naturalWidth
      );
      setHeight(
        image.naturalHeight
      );
      setCropX("0");
      setCropY("0");
      setCropWidth(
        String(
          image.naturalWidth
        )
      );
      setCropHeight(
        String(
          image.naturalHeight
        )
      );
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
      setMessage(
        "Choose an image first."
      );
      return;
    }

    setWorking(true);
    setMessage("");

    try {
      const image =
        await loadImage(
          sourceUrl
        );

      let canvas =
        document.createElement(
          "canvas"
        );

      let context;

      if (mode === "crop") {
        const x =
          Number(cropX);

        const y =
          Number(cropY);

        const w =
          Number(cropWidth);

        const h =
          Number(cropHeight);

        if (
          x < 0 ||
          y < 0 ||
          w <= 0 ||
          h <= 0 ||
          x + w >
            image.naturalWidth ||
          y + h >
            image.naturalHeight
        ) {
          throw new Error(
            "Crop area must stay inside the image."
          );
        }

        canvas.width = w;
        canvas.height = h;

        context =
          canvas.getContext(
            "2d"
          );

        context.drawImage(
          image,
          x,
          y,
          w,
          h,
          0,
          0,
          w,
          h
        );
      }

      if (mode === "rotate") {
        const degrees =
          Number(angle);

        const swap =
          degrees === 90 ||
          degrees === 270;

        canvas.width =
          swap
            ? image.naturalHeight
            : image.naturalWidth;

        canvas.height =
          swap
            ? image.naturalWidth
            : image.naturalHeight;

        context =
          canvas.getContext(
            "2d"
          );

        if (degrees === 90) {
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

      if (mode === "flip") {
        canvas.width =
          image.naturalWidth;

        canvas.height =
          image.naturalHeight;

        context =
          canvas.getContext(
            "2d"
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
        mode === "grayscale" ||
        mode === "adjust"
      ) {
        canvas.width =
          image.naturalWidth;

        canvas.height =
          image.naturalHeight;

        context =
          canvas.getContext(
            "2d"
          );

        context.drawImage(
          image,
          0,
          0
        );

        const imageData =
          context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

        const data =
          imageData.data;

        if (
          mode === "grayscale"
        ) {
          for (
            let index = 0;
            index <
            data.length;
            index += 4
          ) {
            const gray =
              0.299 *
                data[index] +
              0.587 *
                data[
                  index + 1
                ] +
              0.114 *
                data[
                  index + 2
                ];

            data[index] =
              gray;

            data[
              index + 1
            ] = gray;

            data[
              index + 2
            ] = gray;
          }
        } else {
          const brightnessValue =
            Number(
              brightness
            ) *
            2.55;

          const contrastValue =
            Number(
              contrast
            ) *
            2.55;

          const factor =
            (
              259 *
              (
                contrastValue +
                255
              )
            ) /
            (
              255 *
              (
                259 -
                contrastValue
              )
            );

          for (
            let index = 0;
            index <
            data.length;
            index += 4
          ) {
            for (
              let channel = 0;
              channel < 3;
              channel++
            ) {
              const value =
                factor *
                  (
                    data[
                      index +
                      channel
                    ] -
                    128
                  ) +
                128 +
                brightnessValue;

              data[
                index +
                channel
              ] =
                Math.max(
                  0,
                  Math.min(
                    255,
                    value
                  )
                );
            }
          }
        }

        context.putImageData(
          imageData,
          0,
          0
        );
      }

      let mime =
        outputType === "same"
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
        mime === "image/jpeg"
      ) {
        const jpegCanvas =
          document.createElement(
            "canvas"
          );

        jpegCanvas.width =
          canvas.width;

        jpegCanvas.height =
          canvas.height;

        const jpegContext =
          jpegCanvas.getContext(
            "2d"
          );

        jpegContext.fillStyle =
          "#ffffff";

        jpegContext.fillRect(
          0,
          0,
          jpegCanvas.width,
          jpegCanvas.height
        );

        jpegContext.drawImage(
          canvas,
          0,
          0
        );

        canvas =
          jpegCanvas;
      }

      const blob =
        await blobFromCanvas(
          canvas,
          mime,
          Number(quality)
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

      setResultUrl(url);
      setResultBlob(blob);
      setMessage(
        `Output ready: ${canvas.width} x ${canvas.height}`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image processing failed."
      );
    } finally {
      setWorking(false);
    }
  }

  function downloadResult() {
    if (
      !resultUrl ||
      !resultBlob
    ) {
      return;
    }

    const mime =
      resultBlob.type;

    const extension =
      extensionForMime(
        mime
      );

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
      `${base}-edited.${extension}`;

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
                alt="Original preview"
                className="max-h-80 w-full object-contain"
              />

              <p className="mt-3 text-center text-sm text-slate-500">
                {width} x {height}
              </p>
            </div>

            {resultUrl && (
              <div className="rounded-2xl bg-white p-4">
                <p className="mb-3 text-sm font-semibold">
                  Result
                </p>

                <img
                  src={resultUrl}
                  alt="Edited preview"
                  className="max-h-80 w-full object-contain"
                />
              </div>
            )}
          </div>

          {mode === "crop" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "X",
                  cropX,
                  setCropX,
                ],
                [
                  "Y",
                  cropY,
                  setCropY,
                ],
                [
                  "Width",
                  cropWidth,
                  setCropWidth,
                ],
                [
                  "Height",
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
          )}

          {mode === "rotate" && (
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-semibold">
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
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-semibold">
                Flip direction
              </span>

              <select
                value={flipDirection}
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
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
          onClick={downloadResult}
          className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white"
        >
          Download Image
        </button>
      )}
    </div>
  );
}