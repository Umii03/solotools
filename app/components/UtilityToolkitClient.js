"use client";

import { useMemo, useState } from "react";

function getStats(text) {
  const trimmed = text.trim();

  const words =
    trimmed.length > 0
      ? trimmed.split(/\s+/).length
      : 0;

  const characters = text.length;

  const charactersNoSpaces =
    text.replace(/\s/g, "").length;

  const lines =
    text.length > 0
      ? text.split(/\r?\n/).length
      : 0;

  const paragraphs =
    trimmed.length > 0
      ? trimmed
          .split(/\n\s*\n/)
          .filter(
            (item) =>
              item.trim().length > 0
          ).length
      : 0;

  const sentences =
    trimmed.length > 0
      ? trimmed
          .split(/[.!?]+/)
          .filter(
            (item) =>
              item.trim().length > 0
          ).length
      : 0;

  const readingMinutes =
    words > 0
      ? Math.max(
          1,
          Math.ceil(words / 200)
        )
      : 0;

  return {
    words,
    characters,
    charactersNoSpaces,
    lines,
    paragraphs,
    sentences,
    readingMinutes,
  };
}

function titleCase(value) {
  return value
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

function sentenceCase(value) {
  const lower =
    value.toLowerCase();

  return lower.replace(
    /(^\s*\w|[.!?]\s+\w)/g,
    (match) =>
      match.toUpperCase()
  );
}

function wordsForCase(value) {
  return value
    .trim()
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    )
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}

function camelCase(value) {
  const words =
    wordsForCase(value);

  return words
    .map(
      (word, index) => {
        const lower =
          word.toLowerCase();

        if (index === 0) {
          return lower;
        }

        return (
          lower.charAt(0).toUpperCase() +
          lower.slice(1)
        );
      }
    )
    .join("");
}

function snakeCase(value) {
  return wordsForCase(value)
    .map((word) =>
      word.toLowerCase()
    )
    .join("_");
}

function kebabCase(value) {
  return wordsForCase(value)
    .map((word) =>
      word.toLowerCase()
    )
    .join("-");
}

function utf8ToBase64(value) {
  const bytes =
    new TextEncoder().encode(value);

  let binary = "";

  bytes.forEach((byte) => {
    binary +=
      String.fromCharCode(byte);
  });

  return btoa(binary);
}

function base64ToUtf8(value) {
  const clean =
    value.replace(/\s+/g, "");

  const binary =
    atob(clean);

  const bytes =
    Uint8Array.from(
      binary,
      (character) =>
        character.charCodeAt(0)
    );

  return new TextDecoder().decode(
    bytes
  );
}

function createUuid() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return crypto.randomUUID();
  }

  const bytes =
    new Uint8Array(16);

  crypto.getRandomValues(bytes);

  bytes[6] =
    (bytes[6] & 15) | 64;

  bytes[8] =
    (bytes[8] & 63) | 128;

  const hex =
    [...bytes].map(
      (byte) =>
        byte
          .toString(16)
          .padStart(2, "0")
    );

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

export default function UtilityToolkitClient({
  mode,
}) {
  const [text, setText] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [uuidCount, setUuidCount] =
    useState("5");

  const [qrSize, setQrSize] =
    useState("384");

  const [qrLevel, setQrLevel] =
    useState("M");

  const [qrUrl, setQrUrl] =
    useState("");

  const [working, setWorking] =
    useState(false);

  const stats =
    useMemo(
      () => getStats(text),
      [text]
    );

  function clearResult() {
    setOutput("");
    setMessage("");
    setQrUrl("");
  }

  function changeText(value) {
    setText(value);
    clearResult();
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        output
      );

      setMessage(
        "Copied to clipboard."
      );

    } catch {
      setMessage(
        "Could not copy automatically."
      );
    }
  }

  function convertCase(type) {
    if (!text) {
      setMessage(
        "Enter some text first."
      );

      return;
    }

    let result = text;

    if (type === "upper") {
      result =
        text.toUpperCase();
    }

    if (type === "lower") {
      result =
        text.toLowerCase();
    }

    if (type === "title") {
      result =
        titleCase(text);
    }

    if (type === "sentence") {
      result =
        sentenceCase(text);
    }

    if (type === "camel") {
      result =
        camelCase(text);
    }

    if (type === "snake") {
      result =
        snakeCase(text);
    }

    if (type === "kebab") {
      result =
        kebabCase(text);
    }

    setOutput(result);
    setMessage("");
  }

  function formatJson() {
    if (!text.trim()) {
      setMessage(
        "Enter JSON first."
      );

      return;
    }

    try {
      const parsed =
        JSON.parse(text);

      setOutput(
        JSON.stringify(
          parsed,
          null,
          2
        )
      );

      setMessage(
        "Valid JSON."
      );

    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? `Invalid JSON: ${error.message}`
          : "Invalid JSON."
      );
    }
  }

  function minifyJson() {
    if (!text.trim()) {
      setMessage(
        "Enter JSON first."
      );

      return;
    }

    try {
      const parsed =
        JSON.parse(text);

      setOutput(
        JSON.stringify(parsed)
      );

      setMessage(
        "Valid JSON."
      );

    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? `Invalid JSON: ${error.message}`
          : "Invalid JSON."
      );
    }
  }

  function validateJson() {
    if (!text.trim()) {
      setMessage(
        "Enter JSON first."
      );

      return;
    }

    try {
      JSON.parse(text);

      setMessage(
        "Valid JSON."
      );

    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Invalid JSON: ${error.message}`
          : "Invalid JSON."
      );
    }
  }

  function encodeUrl() {
    try {
      setOutput(
        encodeURIComponent(text)
      );

      setMessage("");
    } catch {
      setMessage(
        "Could not encode this value."
      );
    }
  }

  function decodeUrl() {
    try {
      setOutput(
        decodeURIComponent(text)
      );

      setMessage("");
    } catch {
      setOutput("");

      setMessage(
        "This is not valid URL-encoded text."
      );
    }
  }

  function encodeBase64() {
    try {
      setOutput(
        utf8ToBase64(text)
      );

      setMessage("");
    } catch {
      setOutput("");

      setMessage(
        "Could not encode this text."
      );
    }
  }

  function decodeBase64() {
    try {
      setOutput(
        base64ToUtf8(text)
      );

      setMessage("");
    } catch {
      setOutput("");

      setMessage(
        "This is not valid Base64."
      );
    }
  }

  function generateUuids() {
    const count =
      Math.min(
        20,
        Math.max(
          1,
          Number(uuidCount) || 1
        )
      );

    const values =
      Array.from(
        { length: count },
        () => createUuid()
      );

    setOutput(
      values.join("\n")
    );

    setMessage(
      `${count} UUID${
        count === 1 ? "" : "s"
      } generated.`
    );
  }

  async function generateQr() {
    if (!text.trim()) {
      setMessage(
        "Enter text or a URL first."
      );

      return;
    }

    setWorking(true);
    setMessage("");
    setQrUrl("");

    try {
      const module =
        await import("qrcode");

      const QRCode =
        module.default ||
        module;

      const dataUrl =
        await QRCode.toDataURL(
          text,
          {
            width:
              Number(qrSize),
            margin: 2,
            errorCorrectionLevel:
              qrLevel,
          }
        );

      setQrUrl(dataUrl);

      setMessage(
        "QR code generated."
      );

    } catch {
      setMessage(
        "QR code could not be generated."
      );

    } finally {
      setWorking(false);
    }
  }

  function downloadQr() {
    if (!qrUrl) {
      return;
    }

    const anchor =
      document.createElement("a");

    anchor.href = qrUrl;
    anchor.download =
      "solotools-qr-code.png";

    document.body.appendChild(
      anchor
    );

    anchor.click();
    anchor.remove();
  }

  const isCounter =
    mode === "word" ||
    mode === "character";

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">

      {mode !== "uuid" && (
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            {mode === "qr"
              ? "Text or URL"
              : "Input"}
          </span>

          <textarea
            value={text}
            onChange={(event) =>
              changeText(
                event.target.value
              )
            }
            rows={
              isCounter ? 12 : 10
            }
            placeholder={
              mode === "json"
                ? '{"example": true}'
                : mode === "qr"
                  ? "https://example.com"
                  : "Enter text here..."
            }
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 font-inherit outline-none focus:border-blue-500"
          />
        </label>
      )}

      {isCounter && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Words
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.words}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Characters
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.characters}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Without spaces
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.charactersNoSpaces}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Sentences
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.sentences}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Paragraphs
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.paragraphs}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Reading time
            </p>
            <p className="mt-1 text-2xl font-bold">
              {stats.readingMinutes}
              {stats.readingMinutes === 1
                ? " min"
                : " mins"}
            </p>
          </div>

          {mode === "character" && (
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Lines
              </p>
              <p className="mt-1 text-2xl font-bold">
                {stats.lines}
              </p>
            </div>
          )}
        </div>
      )}

      {mode === "case" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            onClick={() =>
              convertCase("upper")
            }
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            UPPERCASE
          </button>

          <button
            type="button"
            onClick={() =>
              convertCase("lower")
            }
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            lowercase
          </button>

          <button
            type="button"
            onClick={() =>
              convertCase("title")
            }
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            Title Case
          </button>

          <button
            type="button"
            onClick={() =>
              convertCase("sentence")
            }
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            Sentence case
          </button>

          <button
            type="button"
            onClick={() =>
              convertCase("camel")
            }
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            camelCase
          </button>

          <button
            type="button"
            onClick={() =>
              convertCase("snake")
            }
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            snake_case
          </button>

          <button
            type="button"
            onClick={() =>
              convertCase("kebab")
            }
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            kebab-case
          </button>
        </div>
      )}

      {mode === "json" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={formatJson}
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            Format JSON
          </button>

          <button
            type="button"
            onClick={minifyJson}
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            Minify JSON
          </button>

          <button
            type="button"
            onClick={validateJson}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold"
          >
            Validate JSON
          </button>
        </div>
      )}

      {mode === "url" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={encodeUrl}
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            Encode URL
          </button>

          <button
            type="button"
            onClick={decodeUrl}
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            Decode URL
          </button>
        </div>
      )}

      {mode === "base64" && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={encodeBase64}
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
          >
            Encode Base64
          </button>

          <button
            type="button"
            onClick={decodeBase64}
            className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
          >
            Decode Base64
          </button>
        </div>
      )}

      {mode === "uuid" && (
        <>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Number of UUIDs
            </span>

            <input
              type="number"
              min="1"
              max="20"
              value={uuidCount}
              onChange={(event) =>
                setUuidCount(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <button
            type="button"
            onClick={generateUuids}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
          >
            Generate UUIDs
          </button>
        </>
      )}

      {mode === "qr" && (
        <>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                QR size
              </span>

              <select
                value={qrSize}
                onChange={(event) =>
                  setQrSize(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="256">
                  256 x 256
                </option>

                <option value="384">
                  384 x 384
                </option>

                <option value="512">
                  512 x 512
                </option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Error correction
              </span>

              <select
                value={qrLevel}
                onChange={(event) =>
                  setQrLevel(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="L">
                  Low
                </option>

                <option value="M">
                  Medium
                </option>

                <option value="Q">
                  Quartile
                </option>

                <option value="H">
                  High
                </option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={generateQr}
            disabled={working}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white disabled:opacity-60"
          >
            {working
              ? "Generating..."
              : "Generate QR Code"}
          </button>
        </>
      )}

      {output && (
        <div className="mt-7">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Output
            </span>

            <textarea
              readOnly
              value={output}
              rows="10"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 font-mono"
            />
          </label>

          <button
            type="button"
            onClick={copyOutput}
            className="mt-3 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Copy Output
          </button>
        </div>
      )}

      {qrUrl && (
        <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="font-bold text-green-900">
            QR code ready
          </p>

          <img
            src={qrUrl}
            alt="Generated QR code"
            className="mx-auto mt-5 rounded-xl bg-white p-3"
          />

          <button
            type="button"
            onClick={downloadQr}
            className="mt-5 w-full rounded-xl bg-slate-900 px-5 py-4 font-bold text-white"
          >
            Download QR Code
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}
    </div>
  );
}
