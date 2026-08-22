"use client";

import {
  useState,
} from "react";

function secureIndex(
  max
) {
  if (max <= 1) {
    return 0;
  }

  const array =
    new Uint32Array(1);

  crypto.getRandomValues(
    array
  );

  return array[0] % max;
}

function randomInteger(
  min,
  max
) {
  const range =
    max - min + 1;

  return (
    min +
    secureIndex(range)
  );
}

function csvCell(value) {
  const text =
    value == null
      ? ""
      : typeof value ===
          "object"
        ? JSON.stringify(value)
        : String(value);

  if (
    /[",\n\r]/.test(text)
  ) {
    return `"${text.replaceAll(
      '"',
      '""'
    )}"`;
  }

  return text;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (
    let index = 0;
    index < text.length;
    index++
  ) {
    const character =
      text[index];

    if (quoted) {
      if (
        character === '"' &&
        text[index + 1] === '"'
      ) {
        cell += '"';
        index += 1;
      } else if (
        character === '"'
      ) {
        quoted = false;
      } else {
        cell += character;
      }

      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (
      character === ","
    ) {
      row.push(cell);
      cell = "";
    } else if (
      character === "\n"
    ) {
      row.push(
        cell.replace(
          /\r$/,
          ""
        )
      );

      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(
    cell.replace(
      /\r$/,
      ""
    )
  );

  if (
    row.length > 1 ||
    row[0] !== ""
  ) {
    rows.push(row);
  }

  return rows;
}

function formatXml(text) {
  const parser =
    new DOMParser();

  const document =
    parser.parseFromString(
      text,
      "application/xml"
    );

  if (
    document.querySelector(
      "parsererror"
    )
  ) {
    throw new Error(
      "Invalid XML."
    );
  }

  const serialized =
    new XMLSerializer()
      .serializeToString(
        document
      )
      .replace(
        />\s*</g,
        "><"
      )
      .replace(
        /></g,
        ">\n<"
      );

  const lines =
    serialized.split("\n");

  let level = 0;

  return lines
    .map((line) => {
      const trimmed =
        line.trim();

      if (
        /^<\//.test(
          trimmed
        )
      ) {
        level =
          Math.max(
            0,
            level - 1
          );
      }

      const result =
        `${"  ".repeat(level)}${trimmed}`;

      if (
        /^<[^!?/][^>]*[^/]?>$/.test(
          trimmed
        ) &&
        !/<\/[^>]+>$/.test(
          trimmed
        )
      ) {
        level += 1;
      }

      return result;
    })
    .join("\n");
}

export default function GrowthUtilityClient({
  mode,
}) {
  const [input, setInput] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [passwordLength, setPasswordLength] =
    useState("20");

  const [useUpper, setUseUpper] =
    useState(true);

  const [useLower, setUseLower] =
    useState(true);

  const [useNumbers, setUseNumbers] =
    useState(true);

  const [useSymbols, setUseSymbols] =
    useState(true);

  const [randomMin, setRandomMin] =
    useState("1");

  const [randomMax, setRandomMax] =
    useState("100");

  const [randomCount, setRandomCount] =
    useState("5");

  const [dateValue, setDateValue] =
    useState("");

  const [timestamp, setTimestamp] =
    useState(
      String(
        Math.floor(
          Date.now() /
          1000
        )
      )
    );

  function setText(value) {
    setInput(value);
    setOutput("");
    setMessage("");
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

  function generatePassword() {
    let characters = "";

    if (useUpper) {
      characters +=
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (useLower) {
      characters +=
        "abcdefghijklmnopqrstuvwxyz";
    }

    if (useNumbers) {
      characters +=
        "0123456789";
    }

    if (useSymbols) {
      characters +=
        "!@#$%^&*()-_=+[]{};:,.?";
    }

    if (!characters) {
      setMessage(
        "Enable at least one character type."
      );
      return;
    }

    const length =
      Math.min(
        64,
        Math.max(
          8,
          Number(
            passwordLength
          ) || 20
        )
      );

    let value = "";

    for (
      let index = 0;
      index < length;
      index++
    ) {
      value +=
        characters[
          secureIndex(
            characters.length
          )
        ];
    }

    setOutput(value);
    setMessage(
      "Password generated locally."
    );
  }

  function generateNumbers() {
    const min =
      Math.ceil(
        Number(randomMin)
      );

    const max =
      Math.floor(
        Number(randomMax)
      );

    const count =
      Math.min(
        100,
        Math.max(
          1,
          Number(
            randomCount
          ) || 1
        )
      );

    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      max < min
    ) {
      setMessage(
        "Maximum must be greater than or equal to minimum."
      );
      return;
    }

    const values =
      Array.from(
        { length: count },
        () =>
          randomInteger(
            min,
            max
          )
      );

    setOutput(
      values.join("\n")
    );

    setMessage(
      `${count} random number${
        count === 1
          ? ""
          : "s"
      } generated.`
    );
  }

  async function createHash() {
    if (!input) {
      setMessage(
        "Enter text first."
      );
      return;
    }

    const bytes =
      new TextEncoder().encode(
        input
      );

    const digest =
      await crypto.subtle.digest(
        "SHA-256",
        bytes
      );

    const hex =
      [...new Uint8Array(digest)]
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

    setOutput(hex);
    setMessage(
      "SHA-256 hash generated."
    );
  }

  function dateToTimestamp() {
    if (!dateValue) {
      setMessage(
        "Choose a date and time."
      );
      return;
    }

    const milliseconds =
      new Date(
        dateValue
      ).getTime();

    if (
      !Number.isFinite(
        milliseconds
      )
    ) {
      setMessage(
        "Invalid date."
      );
      return;
    }

    setOutput(
      [
        `Unix seconds: ${Math.floor(
          milliseconds / 1000
        )}`,
        `Unix milliseconds: ${milliseconds}`,
        `ISO: ${new Date(
          milliseconds
        ).toISOString()}`,
      ].join("\n")
    );

    setMessage("");
  }

  function timestampToDate() {
    const raw =
      Number(timestamp);

    if (
      !Number.isFinite(raw)
    ) {
      setMessage(
        "Enter a valid timestamp."
      );
      return;
    }

    const milliseconds =
      Math.abs(raw) <
      100000000000
        ? raw * 1000
        : raw;

    const date =
      new Date(
        milliseconds
      );

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      setMessage(
        "Invalid timestamp."
      );
      return;
    }

    setOutput(
      [
        `UTC: ${date.toUTCString()}`,
        `ISO: ${date.toISOString()}`,
        `Local: ${date.toLocaleString()}`,
      ].join("\n")
    );

    setMessage("");
  }

  function jsonToCsv() {
    try {
      const parsed =
        JSON.parse(input);

      const rows =
        Array.isArray(parsed)
          ? parsed
          : [parsed];

      if (
        rows.length === 0 ||
        rows.some(
          (item) =>
            item === null ||
            typeof item !==
              "object" ||
            Array.isArray(item)
        )
      ) {
        throw new Error(
          "JSON must be an object or an array of objects."
        );
      }

      const headers =
        [
          ...new Set(
            rows.flatMap(
              (item) =>
                Object.keys(
                  item
                )
            )
          ),
        ];

      const csv =
        [
          headers
            .map(csvCell)
            .join(","),
          ...rows.map(
            (item) =>
              headers
                .map(
                  (header) =>
                    csvCell(
                      item[
                        header
                      ]
                    )
                )
                .join(",")
          ),
        ].join("\n");

      setOutput(csv);
      setMessage(
        `${rows.length} row${
          rows.length === 1
            ? ""
            : "s"
        } converted.`
      );
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not convert JSON."
      );
    }
  }

  function csvToJson() {
    try {
      const rows =
        parseCsv(input);

      if (
        rows.length < 2
      ) {
        throw new Error(
          "CSV needs a header row and at least one data row."
        );
      }

      const headers =
        rows[0].map(
          (header) =>
            header.trim()
        );

      const data =
        rows
          .slice(1)
          .filter(
            (row) =>
              row.some(
                (value) =>
                  value !== ""
              )
          )
          .map(
            (row) =>
              Object.fromEntries(
                headers.map(
                  (
                    header,
                    index
                  ) => [
                    header ||
                      `column_${
                        index + 1
                      }`,
                    row[index] ??
                      "",
                  ]
                )
              )
          );

      setOutput(
        JSON.stringify(
          data,
          null,
          2
        )
      );

      setMessage(
        `${data.length} row${
          data.length === 1
            ? ""
            : "s"
        } converted.`
      );
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not convert CSV."
      );
    }
  }

  function xmlFormatter() {
    try {
      setOutput(
        formatXml(input)
      );

      setMessage(
        "Valid XML."
      );
    } catch (error) {
      setOutput("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Invalid XML."
      );
    }
  }

  function slugify() {
    const slug =
      input
        .normalize("NFKD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        );

    setOutput(slug);
    setMessage("");
  }

  function removeDuplicates() {
    const lines =
      input.split(
        /\r?\n/
      );

    const seen =
      new Set();

    const unique =
      lines.filter(
        (line) => {
          if (
            seen.has(line)
          ) {
            return false;
          }

          seen.add(line);
          return true;
        }
      );

    setOutput(
      unique.join("\n")
    );

    setMessage(
      `${
        lines.length -
        unique.length
      } duplicate line${
        lines.length -
          unique.length ===
        1
          ? ""
          : "s"
      } removed.`
    );
  }

  function sortLines(
    direction
  ) {
    const lines =
      input
        .split(/\r?\n/)
        .filter(
          (line) =>
            line.length > 0
        );

    lines.sort(
      (a, b) =>
        a.localeCompare(
          b,
          undefined,
          {
            sensitivity:
              "base",
            numeric:
              true,
          }
        )
    );

    if (
      direction ===
      "desc"
    ) {
      lines.reverse();
    }

    setOutput(
      lines.join("\n")
    );

    setMessage(
      `${lines.length} line${
        lines.length === 1
          ? ""
          : "s"
      } sorted.`
    );
  }

  const textModes = [
    "sha256",
    "jsoncsv",
    "csvjson",
    "xml",
    "slug",
    "duplicates",
    "sort",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

      {textModes.includes(
        mode
      ) && (
        <textarea
          value={input}
          onChange={(event) =>
            setText(
              event.target.value
            )
          }
          rows="11"
          placeholder={
            mode === "jsoncsv"
              ? '[{"name":"SoloTools","score":10}]'
              : mode === "csvjson"
                ? "name,score`nSoloTools,10"
                : mode === "xml"
                  ? "<root><item>Example</item></root>"
                  : "Enter text here..."
          }
          className="w-full rounded-2xl border border-slate-300 bg-white p-4 font-mono"
        />
      )}

      {mode === "password" && (
        <>
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Password length
            </span>

            <input
              type="number"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(event) =>
                setPasswordLength(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              [
                "Uppercase",
                useUpper,
                setUseUpper,
              ],
              [
                "Lowercase",
                useLower,
                setUseLower,
              ],
              [
                "Numbers",
                useNumbers,
                setUseNumbers,
              ],
              [
                "Symbols",
                useSymbols,
                setUseSymbols,
              ],
            ].map(
              ([
                label,
                checked,
                setter,
              ]) => (
                <label
                  key={label}
                  className="flex items-center gap-3 rounded-xl bg-white p-4"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                      setter(
                        event.target.checked
                      )
                    }
                  />

                  <span className="font-semibold">
                    {label}
                  </span>
                </label>
              )
            )}
          </div>

          <button
            type="button"
            onClick={generatePassword}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
          >
            Generate Password
          </button>
        </>
      )}

      {mode === "random" && (
        <>
          <div className="grid gap-5 sm:grid-cols-3">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Minimum
              </span>

              <input
                type="number"
                value={randomMin}
                onChange={(event) =>
                  setRandomMin(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Maximum
              </span>

              <input
                type="number"
                value={randomMax}
                onChange={(event) =>
                  setRandomMax(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Count
              </span>

              <input
                type="number"
                min="1"
                max="100"
                value={randomCount}
                onChange={(event) =>
                  setRandomCount(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={generateNumbers}
            className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
          >
            Generate Numbers
          </button>
        </>
      )}

      {mode === "timestamp" && (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Date and time
                </span>

                <input
                  type="datetime-local"
                  value={dateValue}
                  onChange={(event) =>
                    setDateValue(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                />
              </label>

              <button
                type="button"
                onClick={dateToTimestamp}
                className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
              >
                Convert to Timestamp
              </button>
            </div>

            <div>
              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Unix timestamp
                </span>

                <input
                  type="text"
                  value={timestamp}
                  onChange={(event) =>
                    setTimestamp(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                />
              </label>

              <button
                type="button"
                onClick={timestampToDate}
                className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
              >
                Convert to Date
              </button>
            </div>
          </div>
        </>
      )}

      {mode === "sha256" && (
        <button
          type="button"
          onClick={createHash}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Generate SHA-256
        </button>
      )}

      {mode === "jsoncsv" && (
        <button
          type="button"
          onClick={jsonToCsv}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Convert JSON to CSV
        </button>
      )}

      {mode === "csvjson" && (
        <button
          type="button"
          onClick={csvToJson}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Convert CSV to JSON
        </button>
      )}

      {mode === "xml" && (
        <button
          type="button"
          onClick={xmlFormatter}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Format XML
        </button>
      )}

      {mode === "slug" && (
        <button
          type="button"
          onClick={slugify}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Generate Slug
        </button>
      )}

      {mode === "duplicates" && (
        <button
          type="button"
          onClick={removeDuplicates}
          className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
        >
          Remove Duplicate Lines
        </button>
      )}

      {mode === "sort" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              sortLines("asc")
            }
            className="rounded-xl bg-blue-600 px-5 py-4 font-bold text-white"
          >
            Sort A-Z
          </button>

          <button
            type="button"
            onClick={() =>
              sortLines("desc")
            }
            className="rounded-xl bg-slate-900 px-5 py-4 font-bold text-white"
          >
            Sort Z-A
          </button>
        </div>
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
            className="mt-3 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
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
    </div>
  );
}