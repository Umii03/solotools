"use client";

import JSZip from "jszip";

import {
  useEffect,
  useRef,
  useState,
} from "react";

function downloadBlob(
  blob,
  filename
) {
  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    filename;

  document.body.appendChild(
    link
  );

  link.click();
  link.remove();

  setTimeout(
    () =>
      URL.revokeObjectURL(
        url
      ),
    1000
  );
}

async function copyText(
  text
) {
  if (!text) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(
      text
    );

    return true;
  } catch {
    return false;
  }
}

function escapeHtml(
  value
) {
  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    );
}

function escapeXml(
  value
) {
  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    );
}

function ToolBox({
  children,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

function Label({
  children,
}) {
  return (
    <span className="mb-2 block text-sm font-bold">
      {children}
    </span>
  );
}

function Message({
  children,
}) {
  return (
    <p className="mt-4 text-sm font-semibold text-slate-600">
      {children}
    </p>
  );
}

function OutputPanel({
  output,
  message,
  filename,
}) {
  if (
    !output &&
    !message
  ) {
    return null;
  }

  async function copy() {
    await copyText(
      output
    );
  }

  function download() {
    if (!output) {
      return;
    }

    downloadBlob(
      new Blob(
        [output],
        {
          type:
            "text/plain;charset=utf-8",
        }
      ),
      filename ||
        "solotools-output.txt"
    );
  }

  return (
    <div className="mt-6">

      {output && (
        <>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-slate-950 p-5 text-sm text-slate-100">
            {output}
          </pre>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copy}
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-bold text-white"
            >
              Copy
            </button>

            <button
              type="button"
              onClick={download}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-bold"
            >
              Download
            </button>
          </div>
        </>
      )}

      {message && (
        <Message>
          {message}
        </Message>
      )}
    </div>
  );
}

function formatBytes(
  bytes
) {
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

  const index =
    Math.min(
      Math.floor(
        Math.log(bytes) /
        Math.log(1024)
      ),
      units.length - 1
    );

  return (
    (
      bytes /
      Math.pow(
        1024,
        index
      )
    ).toFixed(
      index === 0
        ? 0
        : 2
    ) +
    " " +
    units[index]
  );
}

function safeImageName(
  source,
  index,
  mime
) {
  let name = "";

  try {
    const parsed =
      new URL(source);

    name =
      decodeURIComponent(
        parsed.pathname
          .split("/")
          .pop() ||
          ""
      );
  } catch {
  }

  name =
    name
      .replace(
        /[<>:"/\\|?*\x00-\x1F]/g,
        "-"
      )
      .trim();

  if (
    !name ||
    !/\.[a-z0-9]{2,5}$/i.test(
      name
    )
  ) {
    let extension =
      "jpg";

    if (
      mime.includes(
        "png"
      )
    ) {
      extension =
        "png";
    } else if (
      mime.includes(
        "webp"
      )
    ) {
      extension =
        "webp";
    } else if (
      mime.includes(
        "gif"
      )
    ) {
      extension =
        "gif";
    } else if (
      mime.includes(
        "svg"
      )
    ) {
      extension =
        "svg";
    } else if (
      mime.includes(
        "avif"
      )
    ) {
      extension =
        "avif";
    }

    name =
      "image-" +
      index +
      "." +
      extension;
  }

  return name;
}

function ImageDownloader() {
  const [urls, setUrls] =
    useState("");

  const [items, setItems] =
    useState([]);

  const itemsRef =
    useRef([]);

  const [working, setWorking] =
    useState(false);

  const [
    zipWorking,
    setZipWorking,
  ] =
    useState(false);

  const [
    progress,
    setProgress,
  ] =
    useState({
      done: 0,
      total: 0,
    });

  const [
    message,
    setMessage,
  ] =
    useState("");

  useEffect(() => {
    itemsRef.current =
      items;
  }, [items]);

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
      }
    };
  }, []);

  function clearResults() {
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
    }

    itemsRef.current =
      [];

    setItems([]);
  }

  async function processUrls() {
    clearResults();

    const input =
      [
        ...new Set(
          urls
            .split(/\r?\n/)
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean)
        ),
      ];

    if (
      input.length === 0
    ) {
      setMessage(
        "Paste at least one direct image URL."
      );

      return;
    }

    const targets =
      input.slice(
        0,
        200
      );

    setWorking(true);

    setProgress({
      done: 0,
      total:
        targets.length,
    });

    setMessage("");

    const results = [];

    let batchBytes = 0;

    for (
      let index = 0;
      index <
      targets.length;
      index++
    ) {
      const source =
        targets[index];

      try {
        const parsed =
          new URL(source);

        if (
          parsed.protocol !==
            "http:" &&
          parsed.protocol !==
            "https:"
        ) {
          throw new Error(
            "Only HTTP and HTTPS URLs are supported."
          );
        }

        const response =
          await fetch(
            source,
            {
              mode:
                "cors",
              cache:
                "no-store",
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "HTTP " +
            response.status
          );
        }

        const blob =
          await response.blob();

        const appearsToBeImage =
          blob.type.startsWith(
            "image/"
          ) ||
          /\.(png|jpe?g|webp|gif|svg|bmp|avif)(?:$|[?#])/i.test(
            source
          );

        if (
          !appearsToBeImage
        ) {
          throw new Error(
            "The response does not appear to be an image."
          );
        }

        if (
          blob.size >
          25 *
            1024 *
            1024
        ) {
          throw new Error(
            "Image exceeds the 25 MB file limit."
          );
        }

        if (
          batchBytes +
            blob.size >
          250 *
            1024 *
            1024
        ) {
          throw new Error(
            "The 250 MB batch memory limit was reached."
          );
        }

        batchBytes +=
          blob.size;

        const previewUrl =
          URL.createObjectURL(
            blob
          );

        results.push({
          ok: true,
          source,
          blob,
          previewUrl,
          size:
            blob.size,
          name:
            safeImageName(
              source,
              index + 1,
              blob.type
            ),
        });
      } catch (error) {
        results.push({
          ok: false,
          source,
          error:
            error instanceof
            Error
              ? error.message
              : "Download failed.",
        });
      }

      const snapshot =
        [...results];

      itemsRef.current =
        snapshot;

      setItems(
        snapshot
      );

      setProgress({
        done:
          index + 1,
        total:
          targets.length,
      });
    }

    const successes =
      results.filter(
        (item) =>
          item.ok
      ).length;

    setMessage(
      successes +
      " of " +
      targets.length +
      " image URL(s) downloaded successfully." +
      (
        input.length > 200
          ? " Only the first 200 unique URLs were processed."
          : ""
      )
    );

    setWorking(false);
  }

  function downloadOne(
    item
  ) {
    if (
      !item.ok ||
      !item.blob
    ) {
      return;
    }

    downloadBlob(
      item.blob,
      item.name
    );
  }

  async function downloadZip() {
    const successful =
      itemsRef.current.filter(
        (item) =>
          item.ok &&
          item.blob
      );

    if (
      successful.length ===
      0
    ) {
      setMessage(
        "No successful images are available for ZIP download."
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
        successful
      ) {
        let name =
          item.name;

        const duplicateNumber =
          names.get(name) ||
          0;

        names.set(
          name,
          duplicateNumber +
          1
        );

        if (
          duplicateNumber > 0
        ) {
          const dot =
            name.lastIndexOf(
              "."
            );

          if (
            dot > 0
          ) {
            name =
              name.slice(
                0,
                dot
              ) +
              "-" +
              (
                duplicateNumber +
                1
              ) +
              name.slice(dot);
          } else {
            name =
              name +
              "-" +
              (
                duplicateNumber +
                1
              );
          }
        }

        zip.file(
          name,
          item.blob
        );
      }

      const zipBlob =
        await zip.generateAsync(
          {
            type:
              "blob",
            compression:
              "DEFLATE",
            compressionOptions: {
              level: 6,
            },
          }
        );

      downloadBlob(
        zipBlob,
        "solotools-downloaded-images.zip"
      );

      setMessage(
        successful.length +
        " image(s) added to the ZIP."
      );
    } catch {
      setMessage(
        "Could not create the ZIP file."
      );
    } finally {
      setZipWorking(
        false
      );
    }
  }

  const successCount =
    items.filter(
      (item) =>
        item.ok
    ).length;

  return (
    <ToolBox>

      <label>
        <Label>
          Direct image URLs
        </Label>

        <textarea
          rows={10}
          value={urls}
          onChange={(event) =>
            setUrls(
              event.target.value
            )
          }
          placeholder={
            "https://example.com/photo.jpg\nhttps://example.com/image.png"
          }
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm"
        />
      </label>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Enter one direct image URL per line. Up to 200 unique URLs can be processed. Some websites block browser downloads using CORS or hotlink protection; SoloTools does not bypass those restrictions.
      </p>

      <button
        type="button"
        disabled={working}
        onClick={
          processUrls
        }
        className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-50"
      >
        {working
          ? "Downloading " +
            progress.done +
            "/" +
            progress.total +
            "..."
          : "Download Images"}
      </button>

      {working &&
        progress.total >
          0 && (
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width:
                  (
                    progress.done /
                    progress.total *
                    100
                  ) +
                  "%",
              }}
            />
          </div>
        )}

      {successCount >
        0 && (
        <button
          type="button"
          disabled={
            zipWorking
          }
          onClick={
            downloadZip
          }
          className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-4 font-bold text-white disabled:opacity-50"
        >
          {zipWorking
            ? "Creating ZIP..."
            : "Download All " +
              successCount +
              " as ZIP"}
        </button>
      )}

      {message && (
        <Message>
          {message}
        </Message>
      )}

      {items.length >
        0 && (
        <div className="mt-7 grid gap-4 sm:grid-cols-2">

          {items.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  item.source +
                  "-" +
                  index
                }
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                {item.ok ? (
                  <img
                    src={
                      item.previewUrl
                    }
                    alt=""
                    className="aspect-[16/10] w-full bg-slate-100 object-contain"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-red-50 p-5 text-center text-sm font-bold text-red-700">
                    Download blocked or failed
                  </div>
                )}

                <div className="p-4">

                  <p className="break-all text-xs text-slate-500">
                    {item.source}
                  </p>

                  {item.ok ? (
                    <>
                      <p className="mt-2 font-bold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatBytes(
                          item.size
                        )}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          downloadOne(
                            item
                          )
                        }
                        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 font-bold text-white"
                      >
                        Download This Image
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-sm font-semibold text-red-600">
                        {item.error}
                      </p>

                      <a
                        href={
                          item.source
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 block rounded-xl border border-slate-300 px-4 py-2.5 text-center font-bold"
                      >
                        Open Original URL
                      </a>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </ToolBox>
  );
}

function TextGenerator({
  mode,
}) {
  const [title, setTitle] =
    useState(
      "Example Page Title"
    );

  const [
    description,
    setDescription,
  ] =
    useState(
      "A useful and concise page description."
    );

  const [url, setUrl] =
    useState(
      "https://example.com/page/"
    );

  const [image, setImage] =
    useState(
      "https://example.com/social-image.jpg"
    );

  const [
    siteName,
    setSiteName,
  ] =
    useState(
      "Example"
    );

  const [
    keywords,
    setKeywords,
  ] =
    useState("");

  const [robots, setRobots] =
    useState(
      "index, follow"
    );

  const [allow, setAllow] =
    useState("/");

  const [
    disallow,
    setDisallow,
  ] =
    useState(
      "/admin/"
    );

  const [
    robotsSitemap,
    setRobotsSitemap,
  ] =
    useState(
      "https://example.com/sitemap.xml"
    );

  const [
    sitemapUrls,
    setSitemapUrls,
  ] =
    useState(
      "https://example.com/\nhttps://example.com/about/"
    );

  const [output, setOutput] =
    useState("");

  const [
    message,
    setMessage,
  ] =
    useState("");

  function generate() {
    setMessage("");

    if (
      mode ===
      "meta"
    ) {
      const lines = [];

      if (
        title.trim()
      ) {
        lines.push(
          "<title>" +
          escapeHtml(
            title.trim()
          ) +
          "</title>"
        );
      }

      if (
        description.trim()
      ) {
        lines.push(
          '<meta name="description" content="' +
          escapeHtml(
            description.trim()
          ) +
          '">'
        );
      }

      if (
        keywords.trim()
      ) {
        lines.push(
          '<meta name="keywords" content="' +
          escapeHtml(
            keywords.trim()
          ) +
          '">'
        );
      }

      if (
        url.trim()
      ) {
        lines.push(
          '<link rel="canonical" href="' +
          escapeHtml(
            url.trim()
          ) +
          '">'
        );
      }

      lines.push(
        '<meta name="robots" content="' +
        escapeHtml(
          robots
        ) +
        '">'
      );

      setOutput(
        lines.join("\n")
      );

      return;
    }

    if (
      mode ===
      "robots"
    ) {
      const lines = [
        "User-agent: *",
      ];

      allow
        .split(/\r?\n/)
        .map(
          (item) =>
            item.trim()
        )
        .filter(Boolean)
        .forEach(
          (item) => {
            lines.push(
              "Allow: " +
              item
            );
          }
        );

      disallow
        .split(/\r?\n/)
        .map(
          (item) =>
            item.trim()
        )
        .filter(Boolean)
        .forEach(
          (item) => {
            lines.push(
              "Disallow: " +
              item
            );
          }
        );

      if (
        robotsSitemap.trim()
      ) {
        lines.push(
          "",
          "Sitemap: " +
          robotsSitemap.trim()
        );
      }

      setOutput(
        lines.join("\n")
      );

      return;
    }

    if (
      mode ===
      "sitemap"
    ) {
      const unique =
        [
          ...new Set(
            sitemapUrls
              .split(/\r?\n/)
              .map(
                (item) =>
                  item.trim()
              )
              .filter(Boolean)
          ),
        ].slice(
          0,
          1000
        );

      const valid = [];

      for (
        const item of
        unique
      ) {
        try {
          const parsed =
            new URL(item);

          if (
            parsed.protocol ===
              "http:" ||
            parsed.protocol ===
              "https:"
          ) {
            valid.push(
              parsed.href
            );
          }
        } catch {
        }
      }

      const lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ];

      for (
        const item of
        valid
      ) {
        lines.push(
          "  <url><loc>" +
          escapeXml(item) +
          "</loc></url>"
        );
      }

      lines.push(
        "</urlset>"
      );

      setOutput(
        lines.join("\n")
      );

      setMessage(
        valid.length +
        " valid URL(s) added."
      );

      return;
    }

    const lines = [
      '<meta property="og:title" content="' +
        escapeHtml(title) +
        '">',
      '<meta property="og:description" content="' +
        escapeHtml(description) +
        '">',
      '<meta property="og:url" content="' +
        escapeHtml(url) +
        '">',
      '<meta property="og:image" content="' +
        escapeHtml(image) +
        '">',
      '<meta property="og:site_name" content="' +
        escapeHtml(siteName) +
        '">',
      '<meta property="og:type" content="website">',
    ];

    setOutput(
      lines.join("\n")
    );
  }

  let filename =
    "generated-meta.txt";

  if (
    mode ===
    "robots"
  ) {
    filename =
      "robots.txt";
  }

  if (
    mode ===
    "sitemap"
  ) {
    filename =
      "sitemap.xml";
  }

  return (
    <ToolBox>

      {mode ===
      "robots" ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">

            <label>
              <Label>
                Allowed paths
              </Label>

              <textarea
                rows={6}
                value={allow}
                onChange={(event) =>
                  setAllow(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm"
              />
            </label>

            <label>
              <Label>
                Disallowed paths
              </Label>

              <textarea
                rows={6}
                value={disallow}
                onChange={(event) =>
                  setDisallow(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <Label>
              Sitemap URL
            </Label>

            <input
              value={
                robotsSitemap
              }
              onChange={(event) =>
                setRobotsSitemap(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>
        </>
      ) : mode ===
        "sitemap" ? (
        <label>
          <Label>
            Website URLs - one per line
          </Label>

          <textarea
            rows={11}
            value={
              sitemapUrls
            }
            onChange={(event) =>
              setSitemapUrls(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm"
          />
        </label>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">

          <label>
            <Label>
              Page title
            </Label>

            <input
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <Label>
              Page URL
            </Label>

            <input
              value={url}
              onChange={(event) =>
                setUrl(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label className="sm:col-span-2">
            <Label>
              Description
            </Label>

            <textarea
              rows={4}
              value={
                description
              }
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          {mode ===
            "meta" && (
            <>
              <label>
                <Label>
                  Keywords
                </Label>

                <input
                  value={
                    keywords
                  }
                  onChange={(event) =>
                    setKeywords(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                />
              </label>

              <label>
                <Label>
                  Robots
                </Label>

                <select
                  value={
                    robots
                  }
                  onChange={(event) =>
                    setRobots(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="index, follow">
                    index, follow
                  </option>

                  <option value="noindex, follow">
                    noindex, follow
                  </option>

                  <option value="index, nofollow">
                    index, nofollow
                  </option>

                  <option value="noindex, nofollow">
                    noindex, nofollow
                  </option>
                </select>
              </label>
            </>
          )}

          {mode ===
            "open-graph" && (
            <>
              <label>
                <Label>
                  Image URL
                </Label>

                <input
                  value={image}
                  onChange={(event) =>
                    setImage(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                />
              </label>

              <label>
                <Label>
                  Site name
                </Label>

                <input
                  value={
                    siteName
                  }
                  onChange={(event) =>
                    setSiteName(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                />
              </label>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={generate}
        className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
      >
        Generate
      </button>

      <OutputPanel
        output={output}
        message={message}
        filename={filename}
      />
    </ToolBox>
  );
}

function canvasToBlob(
  canvas
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
                "Could not generate PNG output."
              )
            );
          }
        },
        "image/png"
      );
    }
  );
}

function FaviconGenerator() {
  const [
    results,
    setResults,
  ] =
    useState([]);

  const resultsRef =
    useRef([]);

  const [
    working,
    setWorking,
  ] =
    useState(false);

  const [
    zipWorking,
    setZipWorking,
  ] =
    useState(false);

  const [
    message,
    setMessage,
  ] =
    useState("");

  useEffect(() => {
    resultsRef.current =
      results;
  }, [results]);

  useEffect(() => {
    return () => {
      for (
        const item of
        resultsRef.current
      ) {
        if (item.url) {
          URL.revokeObjectURL(
            item.url
          );
        }
      }
    };
  }, []);

  async function generate(
    file
  ) {
    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setMessage(
        "Choose a browser-supported image file."
      );

      return;
    }

    if (
      file.size >
      25 *
        1024 *
        1024
    ) {
      setMessage(
        "Maximum source image size is 25 MB."
      );

      return;
    }

    for (
      const item of
      resultsRef.current
    ) {
      if (item.url) {
        URL.revokeObjectURL(
          item.url
        );
      }
    }

    setResults([]);
    setWorking(true);
    setMessage("");

    const sourceUrl =
      URL.createObjectURL(
        file
      );

    try {
      const image =
        new Image();

      await new Promise(
        (
          resolve,
          reject
        ) => {
          image.onload =
            resolve;

          image.onerror =
            reject;

          image.src =
            sourceUrl;
        }
      );

      const sizes = [
        16,
        32,
        48,
        180,
        192,
        512,
      ];

      const generated = [];

      for (
        const size of
        sizes
      ) {
        const canvas =
          document.createElement(
            "canvas"
          );

        canvas.width =
          size;

        canvas.height =
          size;

        const context =
          canvas.getContext(
            "2d"
          );

        if (!context) {
          continue;
        }

        const scale =
          Math.min(
            size /
              image.naturalWidth,
            size /
              image.naturalHeight
          );

        const width =
          image.naturalWidth *
          scale;

        const height =
          image.naturalHeight *
          scale;

        context.clearRect(
          0,
          0,
          size,
          size
        );

        context.drawImage(
          image,
          (
            size -
            width
          ) /
            2,
          (
            size -
            height
          ) /
            2,
          width,
          height
        );

        const blob =
          await canvasToBlob(
            canvas
          );

        const name =
          size === 180
            ? "apple-touch-icon.png"
            : "favicon-" +
              size +
              "x" +
              size +
              ".png";

        generated.push({
          size,
          blob,
          name,
          url:
            URL.createObjectURL(
              blob
            ),
        });
      }

      resultsRef.current =
        generated;

      setResults(
        generated
      );

      setMessage(
        generated.length +
        " favicon sizes generated."
      );
    } catch {
      setMessage(
        "Could not process that source image."
      );
    } finally {
      URL.revokeObjectURL(
        sourceUrl
      );

      setWorking(false);
    }
  }

  async function zipAll() {
    if (
      results.length ===
      0
    ) {
      return;
    }

    setZipWorking(true);

    try {
      const zip =
        new JSZip();

      for (
        const item of
        results
      ) {
        zip.file(
          item.name,
          item.blob
        );
      }

      const blob =
        await zip.generateAsync(
          {
            type:
              "blob",
          }
        );

      downloadBlob(
        blob,
        "solotools-favicons.zip"
      );
    } finally {
      setZipWorking(false);
    }
  }

  return (
    <ToolBox>

      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center">

        <input
          type="file"
          accept="image/*"
          disabled={working}
          className="hidden"
          onChange={(event) => {
            const file =
              event.target.files?.[0];

            generate(file);

            event.target.value =
              "";
          }}
        />

        <p className="text-lg font-bold">
          Select a source image
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Your source image is processed locally in your browser.
        </p>
      </label>

      {working && (
        <p className="mt-4 text-center font-semibold">
          Generating favicon sizes...
        </p>
      )}

      {results.length >
        0 && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            {results.map(
              (item) => (
                <div
                  key={
                    item.size
                  }
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
                >
                  <img
                    src={
                      item.url
                    }
                    alt=""
                    className="mx-auto h-20 w-20 object-contain"
                  />

                  <p className="mt-3 font-bold">
                    {item.size}
                    {" x "}
                    {item.size}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      downloadBlob(
                        item.blob,
                        item.name
                      )
                    }
                    className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 font-bold"
                  >
                    Download
                  </button>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            disabled={
              zipWorking
            }
            onClick={
              zipAll
            }
            className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-50"
          >
            {zipWorking
              ? "Creating ZIP..."
              : "Download All Favicons as ZIP"}
          </button>
        </>
      )}

      {message && (
        <Message>
          {message}
        </Message>
      )}
    </ToolBox>
  );
}

export default function WebToolkitClient({
  mode,
}) {
  if (
    mode ===
    "image-downloader"
  ) {
    return (
      <ImageDownloader />
    );
  }

  if (
    mode ===
    "favicon"
  ) {
    return (
      <FaviconGenerator />
    );
  }

  return (
    <TextGenerator
      mode={mode}
    />
  );
}
