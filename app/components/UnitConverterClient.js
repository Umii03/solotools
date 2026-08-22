"use client";

import {
  useState,
} from "react";

const CONFIG = {
  length: {
    from: "m",
    to: "ft",
    units: {
      m: ["Meters", 1],
      km: ["Kilometers", 1000],
      cm: ["Centimeters", 0.01],
      mm: ["Millimeters", 0.001],
      in: ["Inches", 0.0254],
      ft: ["Feet", 0.3048],
      yd: ["Yards", 0.9144],
      mi: ["Miles", 1609.344],
    },
  },

  weight: {
    from: "kg",
    to: "lb",
    units: {
      kg: ["Kilograms", 1],
      g: ["Grams", 0.001],
      mg: ["Milligrams", 0.000001],
      lb: ["Pounds", 0.45359237],
      oz: ["Ounces", 0.028349523125],
      st: ["Stone", 6.35029318],
    },
  },

  temperature: {
    from: "C",
    to: "F",
    units: {
      C: ["Celsius", 1],
      F: ["Fahrenheit", 1],
      K: ["Kelvin", 1],
    },
  },

  area: {
    from: "m2",
    to: "ft2",
    units: {
      m2: ["Square meters", 1],
      km2: ["Square kilometers", 1000000],
      cm2: ["Square centimeters", 0.0001],
      ft2: ["Square feet", 0.09290304],
      yd2: ["Square yards", 0.83612736],
      acre: ["Acres", 4046.8564224],
      ha: ["Hectares", 10000],
      mi2: ["Square miles", 2589988.110336],
    },
  },

  volume: {
    from: "l",
    to: "gal",
    units: {
      l: ["Liters", 1],
      ml: ["Milliliters", 0.001],
      m3: ["Cubic meters", 1000],
      gal: ["US gallons", 3.785411784],
      qt: ["US quarts", 0.946352946],
      pt: ["US pints", 0.473176473],
      cup: ["US cups", 0.2365882365],
      floz: ["US fluid ounces", 0.0295735295625],
      tbsp: ["US tablespoons", 0.01478676478125],
      tsp: ["US teaspoons", 0.00492892159375],
    },
  },

  data: {
    from: "GB",
    to: "GiB",
    units: {
      B: ["Bytes", 1],
      KB: ["Kilobytes (KB)", 1000],
      MB: ["Megabytes (MB)", 1000000],
      GB: ["Gigabytes (GB)", 1000000000],
      TB: ["Terabytes (TB)", 1000000000000],
      KiB: ["Kibibytes (KiB)", 1024],
      MiB: ["Mebibytes (MiB)", 1048576],
      GiB: ["Gibibytes (GiB)", 1073741824],
      TiB: ["Tebibytes (TiB)", 1099511627776],
    },
  },
};

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (
    value !== 0 &&
    (
      Math.abs(value) >= 1e9 ||
      Math.abs(value) < 1e-6
    )
  ) {
    return value.toExponential(8);
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits: 10,
    }
  ).format(value);
}

function convertTemperature(
  value,
  from,
  to
) {
  let celsius;

  if (from === "C") {
    celsius = value;
  } else if (from === "F") {
    celsius =
      (value - 32) *
      5 /
      9;
  } else {
    celsius =
      value - 273.15;
  }

  if (to === "C") {
    return celsius;
  }

  if (to === "F") {
    return (
      celsius *
      9 /
      5 +
      32
    );
  }

  return celsius + 273.15;
}

export default function UnitConverterClient({
  mode,
}) {
  const config =
    CONFIG[mode];

  const [value, setValue] =
    useState("1");

  const [from, setFrom] =
    useState(config.from);

  const [to, setTo] =
    useState(config.to);

  const number =
    Number(value);

  let result =
    Number.NaN;

  if (
    value !== "" &&
    Number.isFinite(number)
  ) {
    if (
      mode ===
      "temperature"
    ) {
      result =
        convertTemperature(
          number,
          from,
          to
        );
    } else {
      result =
        number *
        config.units[from][1] /
        config.units[to][1];
    }
  }

  const output =
    formatNumber(result);

  function swap() {
    const oldFrom = from;

    setFrom(to);
    setTo(oldFrom);

    if (
      Number.isFinite(result)
    ) {
      setValue(
        String(result)
      );
    }
  }

  async function copyResult() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        output
      );
    } catch {
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">

      <label>
        <span className="mb-2 block text-sm font-bold">
          Value
        </span>

        <input
          type="number"
          step="any"
          value={value}
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg"
        />
      </label>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">

        <label>
          <span className="mb-2 block text-sm font-bold">
            From
          </span>

          <select
            value={from}
            onChange={(event) =>
              setFrom(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            {Object.entries(
              config.units
            ).map(
              ([
                key,
                item,
              ]) => (
                <option
                  key={key}
                  value={key}
                >
                  {item[0]}
                </option>
              )
            )}
          </select>
        </label>

        <button
          type="button"
          onClick={swap}
          className="h-12 rounded-xl border border-slate-300 bg-white px-5 font-bold hover:border-blue-400 hover:text-blue-700"
        >
          Swap
        </button>

        <label>
          <span className="mb-2 block text-sm font-bold">
            To
          </span>

          <select
            value={to}
            onChange={(event) =>
              setTo(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            {Object.entries(
              config.units
            ).map(
              ([
                key,
                item,
              ]) => (
                <option
                  key={key}
                  value={key}
                >
                  {item[0]}
                </option>
              )
            )}
          </select>
        </label>
      </div>

      <div className="mt-7 rounded-2xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold text-slate-400">
          Converted result
        </p>

        <p className="mt-2 break-words text-3xl font-bold">
          {output ||
            "Enter a valid number"}
        </p>

        {output && (
          <p className="mt-2 text-sm text-slate-400">
            {config.units[to][0]}
          </p>
        )}

        <button
          type="button"
          disabled={!output}
          onClick={copyResult}
          className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-bold text-white disabled:opacity-50"
        >
          Copy Result
        </button>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        Conversion runs locally in your browser.
      </p>
    </div>
  );
}
