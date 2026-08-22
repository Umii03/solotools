"use client";

import {
  useState,
} from "react";

function bytesToHex(
  bytes
) {
  return [...bytes]
    .map(
      (byte) =>
        byte
          .toString(16)
          .padStart(
            2,
            "0"
          )
    )
    .join("");
}

function base64UrlDecode(
  input
) {
  let value =
    input
      .replace(
        /-/g,
        "+"
      )
      .replace(
        /_/g,
        "/"
      );

  while (
    value.length % 4
  ) {
    value += "=";
  }

  const binary =
    atob(value);

  const bytes =
    Uint8Array.from(
      binary,
      (character) =>
        character.charCodeAt(
          0
        )
    );

  return new TextDecoder()
    .decode(bytes);
}

function htmlEncode(
  text
) {
  return text
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
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#39;"
    );
}

function htmlDecode(
  text
) {
  const textarea =
    document.createElement(
      "textarea"
    );

  textarea.innerHTML =
    text;

  return textarea.value;
}

function parseBigIntBase(
  input,
  base
) {
  const cleaned =
    input
      .trim()
      .toLowerCase();

  if (!cleaned) {
    throw new Error(
      "Enter a number."
    );
  }

  const negative =
    cleaned.startsWith(
      "-"
    );

  const valueText =
    negative
      ? cleaned.slice(1)
      : cleaned;

  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyz";

  let result =
    0n;

  for (
    const character of
    valueText
  ) {
    const digit =
      alphabet.indexOf(
        character
      );

    if (
      digit < 0 ||
      digit >= base
    ) {
      throw new Error(
        `Invalid digit "${character}" for base ${base}.`
      );
    }

    result =
      result *
      BigInt(base) +
      BigInt(digit);
  }

  return negative
    ? -result
    : result;
}

export default function ExpansionUtilityClient({
  mode,
}) {
  const [input, setInput] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [findText, setFindText] =
    useState("");

  const [replaceText, setReplaceText] =
    useState("");

  const [repeatCount, setRepeatCount] =
    useState("3");

  const [htmlMode, setHtmlMode] =
    useState("encode");

  const [hexMode, setHexMode] =
    useState("encode");

  const [fromBase, setFromBase] =
    useState("10");

  const [toBase, setToBase] =
    useState("16");

  const [regexPattern, setRegexPattern] =
    useState("\\b\\w{4}\\b");

  const [regexFlags, setRegexFlags] =
    useState("gi");

  function cleanMessage() {
    setMessage("");
    setOutput("");
  }

  async function copyOutput() {
    if (!output) return;

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

  async function generateHash(
    algorithm
  ) {
    if (!input) {
      setMessage(
        "Enter text first."
      );
      return;
    }

    try {
      const data =
        new TextEncoder().encode(
          input
        );

      const hash =
        await crypto.subtle.digest(
          algorithm,
          data
        );

      setOutput(
        bytesToHex(
          new Uint8Array(
            hash
          )
        )
      );

      setMessage(
        `${algorithm} generated.`
      );
    } catch {
      setOutput("");
      setMessage(
        "Hash generation failed."
      );
    }
  }

  function countLines() {
    if (
      input.length === 0
    ) {
      setOutput(
        [
          "Total lines: 0",
          "Non-empty lines: 0",
          "Empty lines: 0",
        ].join("\n")
      );

      return;
    }

    const lines =
      input.split(
        /\r?\n/
      );

    const nonEmpty =
      lines.filter(
        (line) =>
          line.trim()
            .length > 0
      ).length;

    setOutput(
      [
        `Total lines: ${lines.length}`,
        `Non-empty lines: ${nonEmpty}`,
        `Empty lines: ${lines.length - nonEmpty}`,
      ].join("\n")
    );
  }

  function countSentences() {
    const trimmed =
      input.trim();

    if (!trimmed) {
      setOutput(
        "Sentences: 0"
      );

      return;
    }

    const matches =
      trimmed.match(
        /[^.!?]+(?:[.!?]+|$)/g
      ) || [];

    const count =
      matches.filter(
        (item) =>
          item.trim()
            .length > 0
      ).length;

    setOutput(
      `Sentences: ${count}`
    );
  }

  function countParagraphs() {
    const trimmed =
      input.trim();

    const count =
      trimmed
        ? trimmed
            .split(
              /\n\s*\n/
            )
            .filter(
              (item) =>
                item.trim()
                  .length > 0
            ).length
        : 0;

    setOutput(
      `Paragraphs: ${count}`
    );
  }

  function cleanWhitespace() {
    const result =
      input
        .split(/\r?\n/)
        .map(
          (line) =>
            line
              .replace(
                /[ \t]+/g,
                " "
              )
              .trim()
        )
        .join("\n")
        .replace(
          /\n{3,}/g,
          "\n\n"
        )
        .trim();

    setOutput(result);
  }

  function reverseText() {
    setOutput(
      Array.from(input)
        .reverse()
        .join("")
    );
  }

  function findReplace() {
    if (!findText) {
      setMessage(
        "Enter text to find."
      );

      return;
    }

    const pieces =
      input.split(
        findText
      );

    const count =
      Math.max(
        0,
        pieces.length - 1
      );

    setOutput(
      pieces.join(
        replaceText
      )
    );

    setMessage(
      `${count} replacement${
        count === 1
          ? ""
          : "s"
      } made.`
    );
  }

  function wordFrequency() {
    const words =
      input
        .toLowerCase()
        .match(
          /[\p{L}\p{N}']+/gu
        ) || [];

    const frequency =
      new Map();

    for (
      const word of words
    ) {
      frequency.set(
        word,
        (
          frequency.get(
            word
          ) || 0
        ) + 1
      );
    }

    const sorted =
      [
        ...frequency.entries(),
      ].sort(
        (a, b) =>
          b[1] - a[1] ||
          a[0].localeCompare(
            b[0]
          )
      );

    setOutput(
      sorted
        .map(
          ([word, count]) =>
            `${word}: ${count}`
        )
        .join("\n")
    );

    setMessage(
      `${words.length} total words, ${sorted.length} unique.`
    );
  }

  function repeatText() {
    const count =
      Math.min(
        100,
        Math.max(
          1,
          Math.round(
            Number(
              repeatCount
            ) || 1
          )
        )
      );

    setOutput(
      Array.from(
        {
          length: count,
        },
        () => input
      ).join("\n")
    );

    setMessage(
      `Repeated ${count} time${
        count === 1
          ? ""
          : "s"
      }.`
    );
  }

  function convertHtml() {
    try {
      setOutput(
        htmlMode ===
        "encode"
          ? htmlEncode(
              input
            )
          : htmlDecode(
              input
            )
      );

      setMessage("");
    } catch {
      setOutput("");
      setMessage(
        "HTML conversion failed."
      );
    }
  }

  function decodeJwt() {
    try {
      const parts =
        input
          .trim()
          .split(".");

      if (
        parts.length < 2
      ) {
        throw new Error(
          "A JWT should contain at least a header and payload."
        );
      }

      const header =
        JSON.parse(
          base64UrlDecode(
            parts[0]
          )
        );

      const payload =
        JSON.parse(
          base64UrlDecode(
            parts[1]
          )
        );

      setOutput(
        [
          "HEADER",
          JSON.stringify(
            header,
            null,
            2
          ),
          "",
          "PAYLOAD",
          JSON.stringify(
            payload,
            null,
            2
          ),
        ].join("\n")
      );

      setMessage(
        "Decoded only. Signature has not been verified."
      );
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not decode JWT."
      );
    }
  }

  function parseQuery() {
    try {
      let source =
        input.trim();

      if (!source) {
        throw new Error(
          "Enter a URL or query string."
        );
      }

      if (
        source.includes(
          "://"
        )
      ) {
        source =
          new URL(
            source
          ).search;
      }

      source =
        source.replace(
          /^\?/,
          ""
        );

      const params =
        new URLSearchParams(
          source
        );

      const result = {};

      for (
        const [
          key,
          value,
        ] of params.entries()
      ) {
        if (
          Object.prototype.hasOwnProperty.call(
            result,
            key
          )
        ) {
          result[key] =
            Array.isArray(
              result[key]
            )
              ? [
                  ...result[
                    key
                  ],
                  value,
                ]
              : [
                  result[
                    key
                  ],
                  value,
                ];
        } else {
          result[key] =
            value;
        }
      }

      setOutput(
        JSON.stringify(
          result,
          null,
          2
        )
      );

      setMessage(
        `${params.size} query value${
          params.size === 1
            ? ""
            : "s"
        } parsed.`
      );
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not parse query string."
      );
    }
  }

  function convertHex() {
    try {
      if (
        hexMode ===
        "encode"
      ) {
        const bytes =
          new TextEncoder().encode(
            input
          );

        setOutput(
          bytesToHex(
            bytes
          )
        );
      } else {
        const cleaned =
          input
            .replace(
              /\s+/g,
              ""
            )
            .toLowerCase();

        if (
          !/^[0-9a-f]*$/.test(
            cleaned
          ) ||
          cleaned.length %
            2 !==
            0
        ) {
          throw new Error(
            "Hex input must contain complete byte pairs."
          );
        }

        const bytes =
          new Uint8Array(
            cleaned.length /
            2
          );

        for (
          let index = 0;
          index <
          cleaned.length;
          index += 2
        ) {
          bytes[
            index / 2
          ] =
            parseInt(
              cleaned.slice(
                index,
                index + 2
              ),
              16
            );
        }

        setOutput(
          new TextDecoder(
            "utf-8",
            {
              fatal: true,
            }
          ).decode(bytes)
        );
      }

      setMessage("");
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Hex conversion failed."
      );
    }
  }

  function convertBase() {
    try {
      const sourceBase =
        Number(
          fromBase
        );

      const destinationBase =
        Number(
          toBase
        );

      const value =
        parseBigIntBase(
          input,
          sourceBase
        );

      setOutput(
        value.toString(
          destinationBase
        )
      );

      setMessage("");
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Number conversion failed."
      );
    }
  }

  function testRegex() {
    try {
      const regex =
        new RegExp(
          regexPattern,
          regexFlags
        );

      const matches = [];

      if (
        regex.global
      ) {
        let match;
        let guard = 0;

        while (
          (
            match =
              regex.exec(
                input
              )
          ) !== null &&
          guard < 500
        ) {
          matches.push({
            value:
              match[0],
            index:
              match.index,
          });

          if (
            match[0] === ""
          ) {
            regex.lastIndex +=
              1;
          }

          guard += 1;
        }
      } else {
        const match =
          regex.exec(input);

        if (match) {
          matches.push({
            value:
              match[0],
            index:
              match.index,
          });
        }
      }

      setOutput(
        matches.length
          ? matches
              .map(
                (
                  item,
                  index
                ) =>
                  `${
                    index + 1
                  }. index ${
                    item.index
                  }: ${
                    item.value
                  }`
              )
              .join("\n")
          : "No matches."
      );

      setMessage(
        `${matches.length} match${
          matches.length ===
          1
            ? ""
            : "es"
        }.`
      );
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Invalid regular expression."
      );
    }
  }

  const runAction = () => {
    setMessage("");

    if (
      mode === "line"
    ) {
      countLines();
    }

    if (
      mode === "sentence"
    ) {
      countSentences();
    }

    if (
      mode === "paragraph"
    ) {
      countParagraphs();
    }

    if (
      mode === "whitespace"
    ) {
      cleanWhitespace();
    }

    if (
      mode === "reverse"
    ) {
      reverseText();
    }

    if (
      mode === "findReplace"
    ) {
      findReplace();
    }

    if (
      mode === "frequency"
    ) {
      wordFrequency();
    }

    if (
      mode === "repeat"
    ) {
      repeatText();
    }

    if (
      mode === "html"
    ) {
      convertHtml();
    }

    if (
      mode === "jwt"
    ) {
      decodeJwt();
    }

    if (
      mode === "query"
    ) {
      parseQuery();
    }

    if (
      mode === "hex"
    ) {
      convertHex();
    }

    if (
      mode === "base"
    ) {
      convertBase();
    }

    if (
      mode === "regex"
    ) {
      testRegex();
    }
  };

  const buttonLabel = {
    line:
      "Count Lines",
    sentence:
      "Count Sentences",
    paragraph:
      "Count Paragraphs",
    whitespace:
      "Clean Whitespace",
    reverse:
      "Reverse Text",
    findReplace:
      "Replace All",
    frequency:
      "Count Word Frequency",
    repeat:
      "Repeat Text",
    html:
      "Convert HTML",
    jwt:
      "Decode JWT",
    query:
      "Parse Query String",
    hex:
      "Convert",
    base:
      "Convert Number",
    regex:
      "Test Regex",
  }[mode];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

      {mode === "findReplace" && (
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Find
            </span>

            <input
              type="text"
              value={findText}
              onChange={(event) =>
                setFindText(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Replace with
            </span>

            <input
              type="text"
              value={replaceText}
              onChange={(event) =>
                setReplaceText(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>
        </div>
      )}

      {mode === "repeat" && (
        <label className="mb-5 block">
          <span className="mb-2 block text-sm font-semibold">
            Repeat count
          </span>

          <input
            type="number"
            min="1"
            max="100"
            value={repeatCount}
            onChange={(event) =>
              setRepeatCount(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
        </label>
      )}

      {mode === "html" && (
        <label className="mb-5 block">
          <span className="mb-2 block text-sm font-semibold">
            Operation
          </span>

          <select
            value={htmlMode}
            onChange={(event) =>
              setHtmlMode(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="encode">
              Encode HTML entities
            </option>

            <option value="decode">
              Decode HTML entities
            </option>
          </select>
        </label>
      )}

      {mode === "hex" && (
        <label className="mb-5 block">
          <span className="mb-2 block text-sm font-semibold">
            Operation
          </span>

          <select
            value={hexMode}
            onChange={(event) =>
              setHexMode(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="encode">
              Text to Hex
            </option>

            <option value="decode">
              Hex to Text
            </option>
          </select>
        </label>
      )}

      {mode === "base" && (
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              From base
            </span>

            <select
              value={fromBase}
              onChange={(event) =>
                setFromBase(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="2">
                Binary
              </option>

              <option value="8">
                Octal
              </option>

              <option value="10">
                Decimal
              </option>

              <option value="16">
                Hexadecimal
              </option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              To base
            </span>

            <select
              value={toBase}
              onChange={(event) =>
                setToBase(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="2">
                Binary
              </option>

              <option value="8">
                Octal
              </option>

              <option value="10">
                Decimal
              </option>

              <option value="16">
                Hexadecimal
              </option>
            </select>
          </label>
        </div>
      )}

      {mode === "regex" && (
        <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_160px]">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Pattern
            </span>

            <input
              type="text"
              value={regexPattern}
              onChange={(event) =>
                setRegexPattern(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Flags
            </span>

            <input
              type="text"
              value={regexFlags}
              onChange={(event) =>
                setRegexFlags(
                  event.target.value
                )
              }
              placeholder="gi"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono"
            />
          </label>
        </div>
      )}

      <textarea
        value={input}
        onChange={(event) => {
          setInput(
            event.target.value
          );

          cleanMessage();
        }}
        rows="11"
        placeholder={
          mode === "jwt"
            ? "Paste JWT here..."
            : mode === "query"
              ? "https://example.com/?name=SoloTools&page=2"
              : mode === "base"
                ? "255"
                : mode === "hex"
                  ? "Enter text or hexadecimal..."
                  : "Enter text here..."
        }
        className="w-full rounded-2xl border border-slate-300 bg-white p-4 font-mono"
      />

      {mode === "sha1" && (
        <button
          type="button"
          onClick={() =>
            generateHash(
              "SHA-1"
            )
          }
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Generate SHA-1
        </button>
      )}

      {mode === "sha512" && (
        <button
          type="button"
          onClick={() =>
            generateHash(
              "SHA-512"
            )
          }
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Generate SHA-512
        </button>
      )}

      {buttonLabel && (
        <button
          type="button"
          onClick={
            runAction
          }
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          {buttonLabel}
        </button>
      )}

      {output && (
        <div className="mt-7">
          <p className="mb-2 text-sm font-semibold">
            Output
          </p>

          <textarea
            readOnly
            value={output}
            rows="10"
            className="w-full rounded-2xl border border-slate-300 bg-white p-4 font-mono"
          />

          <button
            type="button"
            onClick={copyOutput}
            className="mt-3 w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
          >
            Copy Output
          </button>
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-slate-600">
          {message}
        </p>
      )}

      {mode === "jwt" && (
        <p className="mt-5 text-sm text-amber-800">
          JWT decoding only displays encoded data. It does not verify authenticity or signature validity.
        </p>
      )}
    </div>
  );
}