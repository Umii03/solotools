"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}

function normalizeHex(value) {
  let hex =
    String(value)
      .trim()
      .replace(/^#/, "");

  if (
    /^[0-9a-fA-F]{3}$/.test(
      hex
    )
  ) {
    hex =
      hex
        .split("")
        .map(
          (character) =>
            character +
            character
        )
        .join("");
  }

  if (
    !/^[0-9a-fA-F]{6}$/.test(
      hex
    )
  ) {
    return null;
  }

  return (
    "#" +
    hex.toLowerCase()
  );
}

function hexToRgb(hex) {
  const normalized =
    normalizeHex(hex);

  if (!normalized) {
    return null;
  }

  return {
    r:
      parseInt(
        normalized.slice(
          1,
          3
        ),
        16
      ),
    g:
      parseInt(
        normalized.slice(
          3,
          5
        ),
        16
      ),
    b:
      parseInt(
        normalized.slice(
          5,
          7
        ),
        16
      ),
  };
}

function rgbToHex(
  r,
  g,
  b
) {
  return (
    "#" +
    [r, g, b]
      .map(
        (value) =>
          clamp(
            Math.round(value),
            0,
            255
          )
            .toString(16)
            .padStart(
              2,
              "0"
            )
      )
      .join("")
  );
}

function rgbToHsl({
  r,
  g,
  b,
}) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max =
    Math.max(
      r,
      g,
      b
    );

  const min =
    Math.min(
      r,
      g,
      b
    );

  const delta =
    max - min;

  let h = 0;
  let s = 0;

  const l =
    (
      max +
      min
    ) /
    2;

  if (delta !== 0) {
    s =
      delta /
      (
        1 -
        Math.abs(
          2 * l -
          1
        )
      );

    if (max === r) {
      h =
        60 *
        (
          (
            g - b
          ) /
          delta %
          6
        );
    } else if (
      max === g
    ) {
      h =
        60 *
        (
          (
            b - r
          ) /
          delta +
          2
        );
    } else {
      h =
        60 *
        (
          (
            r - g
          ) /
          delta +
          4
        );
    }
  }

  if (h < 0) {
    h += 360;
  }

  return {
    h:
      Math.round(h),
    s:
      Math.round(
        s * 100
      ),
    l:
      Math.round(
        l * 100
      ),
  };
}

function luminance(hex) {
  const rgb =
    hexToRgb(hex);

  if (!rgb) {
    return 0;
  }

  const channels =
    [
      rgb.r,
      rgb.g,
      rgb.b,
    ].map(
      (value) => {
        const channel =
          value / 255;

        if (
          channel <=
          0.03928
        ) {
          return (
            channel /
            12.92
          );
        }

        return Math.pow(
          (
            channel +
            0.055
          ) /
          1.055,
          2.4
        );
      }
    );

  return (
    channels[0] *
      0.2126 +
    channels[1] *
      0.7152 +
    channels[2] *
      0.0722
  );
}

function contrastRatio(
  first,
  second
) {
  const a =
    luminance(first);

  const b =
    luminance(second);

  return (
    Math.max(a, b) +
    0.05
  ) /
  (
    Math.min(a, b) +
    0.05
  );
}

function mixColor(
  color,
  target,
  amount
) {
  const first =
    hexToRgb(color);

  const second =
    hexToRgb(target);

  return rgbToHex(
    first.r +
      (
        second.r -
        first.r
      ) *
      amount,
    first.g +
      (
        second.g -
        first.g
      ) *
      amount,
    first.b +
      (
        second.b -
        first.b
      ) *
      amount
  );
}

function randomHex() {
  const bytes =
    new Uint8Array(3);

  crypto.getRandomValues(
    bytes
  );

  return (
    "#" +
    [...bytes]
      .map(
        (value) =>
          value
            .toString(16)
            .padStart(
              2,
              "0"
            )
      )
      .join("")
  );
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(
      text
    );

    return true;
  } catch {
    return false;
  }
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

function InfoBox({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words font-bold">
        {value}
      </p>
    </div>
  );
}

function ColorConverter() {
  const [hex, setHex] =
    useState("#2563eb");

  const [message, setMessage] =
    useState("");

  const normalized =
    normalizeHex(hex);

  const rgb =
    normalized
      ? hexToRgb(
          normalized
        )
      : null;

  const hsl =
    rgb
      ? rgbToHsl(rgb)
      : null;

  async function copy(value) {
    const success =
      await copyText(value);

    setMessage(
      success
        ? "Copied to clipboard."
        : "Could not copy automatically."
    );
  }

  return (
    <ToolBox>
      <label>
        <Label>
          HEX color
        </Label>

        <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
          <input
            type="text"
            value={hex}
            onChange={(event) =>
              setHex(
                event.target.value
              )
            }
            placeholder="#2563eb"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3"
          />

          <input
            type="color"
            value={
              normalized ||
              "#2563eb"
            }
            onChange={(event) =>
              setHex(
                event.target.value
              )
            }
            className="h-12 w-full"
          />
        </div>
      </label>

      {rgb && hsl ? (
        <>
          <div
            className="mt-6 h-32 rounded-2xl border border-slate-200"
            style={{
              backgroundColor:
                normalized,
            }}
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoBox
              label="HEX"
              value={normalized}
            />

            <InfoBox
              label="RGB"
              value={
                "rgb(" +
                rgb.r +
                ", " +
                rgb.g +
                ", " +
                rgb.b +
                ")"
              }
            />

            <InfoBox
              label="HSL"
              value={
                "hsl(" +
                hsl.h +
                " " +
                hsl.s +
                "% " +
                hsl.l +
                "%)"
              }
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                copy(normalized)
              }
              className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
            >
              Copy HEX
            </button>

            <button
              type="button"
              onClick={() =>
                copy(
                  "rgb(" +
                  rgb.r +
                  ", " +
                  rgb.g +
                  ", " +
                  rgb.b +
                  ")"
                )
              }
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold"
            >
              Copy RGB
            </button>
          </div>
        </>
      ) : (
        <p className="mt-5 font-semibold text-red-600">
          Enter a valid 3-digit or 6-digit HEX color.
        </p>
      )}

      {message && (
        <p className="mt-4 text-sm font-semibold text-slate-600">
          {message}
        </p>
      )}
    </ToolBox>
  );
}

function ContrastChecker() {
  const [
    foreground,
    setForeground,
  ] =
    useState("#111827");

  const [
    background,
    setBackground,
  ] =
    useState("#ffffff");

  const ratio =
    contrastRatio(
      foreground,
      background
    );

  return (
    <ToolBox>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <Label>
            Text color
          </Label>

          <input
            type="color"
            value={foreground}
            onChange={(event) =>
              setForeground(
                event.target.value
              )
            }
            className="h-14 w-full"
          />

          <code className="mt-2 block">
            {foreground}
          </code>
        </label>

        <label>
          <Label>
            Background color
          </Label>

          <input
            type="color"
            value={background}
            onChange={(event) =>
              setBackground(
                event.target.value
              )
            }
            className="h-14 w-full"
          />

          <code className="mt-2 block">
            {background}
          </code>
        </label>
      </div>

      <div
        className="mt-6 rounded-2xl border border-slate-200 p-8 text-center text-xl font-bold"
        style={{
          color:
            foreground,
          backgroundColor:
            background,
        }}
      >
        Sample readable text
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoBox
          label="Ratio"
          value={
            ratio.toFixed(2) +
            ":1"
          }
        />

        <InfoBox
          label="AA normal"
          value={
            ratio >= 4.5
              ? "Pass"
              : "Fail"
          }
        />

        <InfoBox
          label="AAA normal"
          value={
            ratio >= 7
              ? "Pass"
              : "Fail"
          }
        />

        <InfoBox
          label="AA large"
          value={
            ratio >= 3
              ? "Pass"
              : "Fail"
          }
        />
      </div>
    </ToolBox>
  );
}

function GradientGenerator() {
  const [first, setFirst] =
    useState("#2563eb");

  const [second, setSecond] =
    useState("#8b5cf6");

  const [angle, setAngle] =
    useState("135");

  const [message, setMessage] =
    useState("");

  const gradient =
    "linear-gradient(" +
    angle +
    "deg, " +
    first +
    ", " +
    second +
    ")";

  const css =
    "background: " +
    gradient +
    ";";

  async function copy() {
    const success =
      await copyText(css);

    setMessage(
      success
        ? "CSS copied."
        : "Could not copy automatically."
    );
  }

  return (
    <ToolBox>
      <div
        className="h-56 rounded-2xl border border-slate-200"
        style={{
          background:
            gradient,
        }}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <input
          type="color"
          value={first}
          onChange={(event) =>
            setFirst(
              event.target.value
            )
          }
          className="h-14 w-full"
        />

        <input
          type="color"
          value={second}
          onChange={(event) =>
            setSecond(
              event.target.value
            )
          }
          className="h-14 w-full"
        />

        <label>
          <Label>
            Angle: {angle} degrees
          </Label>

          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(event) =>
              setAngle(
                event.target.value
              )
            }
            className="w-full"
          />
        </label>
      </div>

      <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm text-white">
        {css}
      </pre>

      <button
        type="button"
        onClick={copy}
        className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
      >
        Copy CSS
      </button>

      {message && (
        <p className="mt-3 text-sm font-semibold">
          {message}
        </p>
      )}
    </ToolBox>
  );
}

function PaletteGenerator() {
  const [base, setBase] =
    useState("#2563eb");

  const [message, setMessage] =
    useState("");

  const colors = [
    mixColor(
      base,
      "#ffffff",
      0.88
    ),
    mixColor(
      base,
      "#ffffff",
      0.68
    ),
    mixColor(
      base,
      "#ffffff",
      0.45
    ),
    mixColor(
      base,
      "#ffffff",
      0.22
    ),
    base,
    mixColor(
      base,
      "#000000",
      0.15
    ),
    mixColor(
      base,
      "#000000",
      0.30
    ),
    mixColor(
      base,
      "#000000",
      0.48
    ),
    mixColor(
      base,
      "#000000",
      0.65
    ),
  ];

  async function copy(
    color
  ) {
    const success =
      await copyText(color);

    setMessage(
      success
        ? color +
          " copied."
        : "Could not copy automatically."
    );
  }

  return (
    <ToolBox>
      <label>
        <Label>
          Base color
        </Label>

        <input
          type="color"
          value={base}
          onChange={(event) =>
            setBase(
              event.target.value
            )
          }
          className="h-14 w-full"
        />
      </label>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
        {colors.map(
          (
            color,
            index
          ) => (
            <button
              key={
                color +
                "-" +
                index
              }
              type="button"
              onClick={() =>
                copy(color)
              }
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <span
                className="block h-20"
                style={{
                  backgroundColor:
                    color,
                }}
              />

              <span className="block px-1 py-2 text-[11px] font-bold">
                {color}
              </span>
            </button>
          )
        )}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Click any color to copy its HEX value.
      </p>

      {message && (
        <p className="mt-2 text-sm font-semibold">
          {message}
        </p>
      )}
    </ToolBox>
  );
}

function RandomColor() {
  const [color, setColor] =
    useState("#2563eb");

  const [message, setMessage] =
    useState("");

  const rgb =
    hexToRgb(color);

  const hsl =
    rgbToHsl(rgb);

  async function copy() {
    const success =
      await copyText(color);

    setMessage(
      success
        ? "HEX copied."
        : "Could not copy automatically."
    );
  }

  return (
    <ToolBox>
      <div
        className="h-56 rounded-2xl border border-slate-200"
        style={{
          backgroundColor:
            color,
        }}
      />

      <div className="mt-5 rounded-2xl bg-slate-950 p-6 text-white">
        <p className="text-3xl font-bold">
          {color}
        </p>

        <p className="mt-2 text-slate-300">
          {"rgb(" +
            rgb.r +
            ", " +
            rgb.g +
            ", " +
            rgb.b +
            ")"}
        </p>

        <p className="mt-1 text-slate-300">
          {"hsl(" +
            hsl.h +
            " " +
            hsl.s +
            "% " +
            hsl.l +
            "%)"}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            setColor(
              randomHex()
            )
          }
          className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
        >
          Generate Random Color
        </button>

        <button
          type="button"
          onClick={copy}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold"
        >
          Copy HEX
        </button>
      </div>

      {message && (
        <p className="mt-3 text-sm font-semibold">
          {message}
        </p>
      )}
    </ToolBox>
  );
}

function pad(value) {
  return String(
    Math.floor(value)
  ).padStart(
    2,
    "0"
  );
}

function getDefaultTarget() {
  const target =
    new Date(
      Date.now() +
      86400000
    );

  const local =
    new Date(
      target.getTime() -
      target.getTimezoneOffset() *
        60000
    );

  return local
    .toISOString()
    .slice(
      0,
      16
    );
}

function Countdown() {
  const [target, setTarget] =
    useState("");

  const [now, setNow] =
    useState(0);

  useEffect(() => {
    setTarget(
      getDefaultTarget()
    );

    setNow(
      Date.now()
    );

    const interval =
      setInterval(
        () =>
          setNow(
            Date.now()
          ),
        1000
      );

    return () =>
      clearInterval(
        interval
      );
  }, []);

  const targetTime =
    target
      ? new Date(
          target
        ).getTime()
      : now;

  const total =
    Math.max(
      0,
      Math.floor(
        (
          targetTime -
          now
        ) /
        1000
      )
    );

  const days =
    Math.floor(
      total /
      86400
    );

  const hours =
    Math.floor(
      (
        total %
        86400
      ) /
      3600
    );

  const minutes =
    Math.floor(
      (
        total %
        3600
      ) /
      60
    );

  const seconds =
    total %
    60;

  return (
    <ToolBox>
      <label>
        <Label>
          Target date and time
        </Label>

        <input
          type="datetime-local"
          value={target}
          onChange={(event) =>
            setTarget(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        />
      </label>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          [days, "Days"],
          [hours, "Hours"],
          [minutes, "Minutes"],
          [seconds, "Seconds"],
        ].map(
          (item) => (
            <div
              key={item[1]}
              className="rounded-2xl bg-slate-950 p-5 text-center text-white"
            >
              <p className="text-3xl font-bold">
                {pad(item[0])}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {item[1]}
              </p>
            </div>
          )
        )}
      </div>

      {target &&
        targetTime <= now && (
        <p className="mt-5 text-center font-bold text-blue-700">
          Target time reached.
        </p>
      )}
    </ToolBox>
  );
}

function Stopwatch() {
  const [elapsed, setElapsed] =
    useState(0);

  const [running, setRunning] =
    useState(false);

  const startRef =
    useRef(0);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval =
      setInterval(
        () =>
          setElapsed(
            Date.now() -
              startRef.current
          ),
        33
      );

    return () =>
      clearInterval(
        interval
      );
  }, [running]);

  function start() {
    startRef.current =
      Date.now() -
      elapsed;

    setRunning(true);
  }

  const totalSeconds =
    Math.floor(
      elapsed /
      1000
    );

  const hours =
    Math.floor(
      totalSeconds /
      3600
    );

  const minutes =
    Math.floor(
      (
        totalSeconds %
        3600
      ) /
      60
    );

  const seconds =
    totalSeconds %
    60;

  const hundredths =
    Math.floor(
      (
        elapsed %
        1000
      ) /
      10
    );

  return (
    <ToolBox>
      <div className="rounded-3xl bg-slate-950 px-4 py-10 text-center font-mono text-4xl font-bold text-white sm:text-6xl">
        {pad(hours)}
        :
        {pad(minutes)}
        :
        {pad(seconds)}
        .
        {pad(hundredths)}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          disabled={running}
          onClick={start}
          className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white disabled:opacity-50"
        >
          {elapsed > 0
            ? "Resume"
            : "Start"}
        </button>

        <button
          type="button"
          disabled={!running}
          onClick={() =>
            setRunning(false)
          }
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold disabled:opacity-50"
        >
          Pause
        </button>

        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold"
        >
          Reset
        </button>
      </div>
    </ToolBox>
  );
}

function Pomodoro() {
  const durations = {
    focus:
      25 * 60,
    short:
      5 * 60,
    long:
      15 * 60,
  };

  const [session, setSession] =
    useState("focus");

  const [
    remaining,
    setRemaining,
  ] =
    useState(
      durations.focus
    );

  const [running, setRunning] =
    useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval =
      setInterval(
        () => {
          setRemaining(
            (previous) => {
              if (
                previous <= 1
              ) {
                setRunning(
                  false
                );

                return 0;
              }

              return (
                previous -
                1
              );
            }
          );
        },
        1000
      );

    return () =>
      clearInterval(
        interval
      );
  }, [running]);

  function selectSession(
    value
  ) {
    setRunning(false);
    setSession(value);
    setRemaining(
      durations[value]
    );
  }

  return (
    <ToolBox>
      <div className="flex flex-wrap justify-center gap-2">
        {[
          ["focus", "Focus 25"],
          ["short", "Short Break 5"],
          ["long", "Long Break 15"],
        ].map(
          (item) => (
            <button
              key={item[0]}
              type="button"
              onClick={() =>
                selectSession(
                  item[0]
                )
              }
              className={
                session ===
                item[0]
                  ? "rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
                  : "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold"
              }
            >
              {item[1]}
            </button>
          )
        )}
      </div>

      <div className="mt-6 rounded-3xl bg-slate-950 px-4 py-10 text-center font-mono text-6xl font-bold text-white">
        {pad(
          Math.floor(
            remaining /
            60
          )
        )}
        :
        {pad(
          remaining %
          60
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          disabled={
            running ||
            remaining <= 0
          }
          onClick={() =>
            setRunning(true)
          }
          className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white disabled:opacity-50"
        >
          Start
        </button>

        <button
          type="button"
          disabled={!running}
          onClick={() =>
            setRunning(false)
          }
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold disabled:opacity-50"
        >
          Pause
        </button>

        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setRemaining(
              durations[
                session
              ]
            );
          }}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold"
        >
          Reset
        </button>
      </div>

      {remaining === 0 && (
        <p className="mt-5 text-center font-bold text-blue-700">
          Session complete.
        </p>
      )}
    </ToolBox>
  );
}

function DaysUntil() {
  const [selected, setSelected] =
    useState("");

  let difference = null;

  if (selected) {
    const parts =
      selected
        .split("-")
        .map(Number);

    if (
      parts.length === 3
    ) {
      const target =
        Date.UTC(
          parts[0],
          parts[1] - 1,
          parts[2]
        );

      const now =
        new Date();

      const today =
        Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

      difference =
        Math.round(
          (
            target -
            today
          ) /
          86400000
        );
    }
  }

  return (
    <ToolBox>
      <label>
        <Label>
          Select a date
        </Label>

        <input
          type="date"
          value={selected}
          onChange={(event) =>
            setSelected(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        />
      </label>

      <div className="mt-6 rounded-2xl bg-slate-950 p-7 text-center text-white">
        {difference === null ? (
          <p className="text-xl font-bold">
            Choose a date.
          </p>
        ) : (
          <>
            <p className="text-5xl font-bold">
              {Math.abs(
                difference
              )}
            </p>

            <p className="mt-2 text-slate-300">
              {difference > 0
                ? "calendar days until the selected date"
                : difference < 0
                  ? "calendar days since the selected date"
                  : "The selected date is today"}
            </p>
          </>
        )}
      </div>
    </ToolBox>
  );
}

export default function ColorTimeToolClient({
  mode,
}) {
  if (
    mode ===
    "color-converter"
  ) {
    return (
      <ColorConverter />
    );
  }

  if (
    mode ===
    "contrast"
  ) {
    return (
      <ContrastChecker />
    );
  }

  if (
    mode ===
    "gradient"
  ) {
    return (
      <GradientGenerator />
    );
  }

  if (
    mode ===
    "palette"
  ) {
    return (
      <PaletteGenerator />
    );
  }

  if (
    mode ===
    "random-color"
  ) {
    return (
      <RandomColor />
    );
  }

  if (
    mode ===
    "countdown"
  ) {
    return (
      <Countdown />
    );
  }

  if (
    mode ===
    "stopwatch"
  ) {
    return (
      <Stopwatch />
    );
  }

  if (
    mode ===
    "pomodoro"
  ) {
    return (
      <Pomodoro />
    );
  }

  return (
    <DaysUntil />
  );
}
