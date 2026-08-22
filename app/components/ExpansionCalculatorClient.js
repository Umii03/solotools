"use client";

import {
  useMemo,
  useState,
} from "react";

const currencies = [
  "USD",
  "GBP",
  "EUR",
  "PKR",
  "INR",
  "CAD",
  "AUD",
];

function money(
  value,
  currency
) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(value);
}

function number(
  value,
  digits = 2
) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits:
        digits,
    }
  ).format(value);
}

function ResultCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function NumberInput({
  label,
  value,
  setter,
  min,
  max,
  step = "any",
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) =>
          setter(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      />
    </label>
  );
}

function gcd(
  first,
  second
) {
  let a =
    Math.abs(first);

  let b =
    Math.abs(second);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a || 1;
}

function timeToMinutes(
  value
) {
  const parts =
    String(value)
      .split(":")
      .map(Number);

  if (
    parts.length !== 2 ||
    parts.some(
      (item) =>
        !Number.isFinite(item)
    )
  ) {
    return null;
  }

  return (
    parts[0] * 60 +
    parts[1]
  );
}

function formatPace(
  minutes
) {
  if (
    !Number.isFinite(minutes)
  ) {
    return "-";
  }

  let whole =
    Math.floor(minutes);

  let seconds =
    Math.round(
      (minutes - whole) *
      60
    );

  if (seconds === 60) {
    whole += 1;
    seconds = 0;
  }

  return `${whole}:${String(
    seconds
  ).padStart(2, "0")}`;
}

export default function ExpansionCalculatorClient({
  mode,
}) {
  const [currency, setCurrency] =
    useState("USD");

  const [amount, setAmount] =
    useState("100");

  const [rate, setRate] =
    useState("8");

  const [sales, setSales] =
    useState("10000");

  const [commissionRate, setCommissionRate] =
    useState("5");

  const [basePay, setBasePay] =
    useState("0");

  const [goal, setGoal] =
    useState("20000");

  const [currentSavings, setCurrentSavings] =
    useState("5000");

  const [savingsRate, setSavingsRate] =
    useState("4");

  const [months, setMonths] =
    useState("36");

  const [currentPay, setCurrentPay] =
    useState("50000");

  const [raiseRate, setRaiseRate] =
    useState("5");

  const [startTime, setStartTime] =
    useState("09:00");

  const [endTime, setEndTime] =
    useState("17:30");

  const [distance, setDistance] =
    useState("10");

  const [hours, setHours] =
    useState("1");

  const [travelMinutes, setTravelMinutes] =
    useState("0");

  const [distanceUnit, setDistanceUnit] =
    useState("km");

  const [watts, setWatts] =
    useState("1000");

  const [hoursPerDay, setHoursPerDay] =
    useState("2");

  const [days, setDays] =
    useState("30");

  const [electricityRate, setElectricityRate] =
    useState("0.15");

  const [statistics, setStatistics] =
    useState("4, 7, 7, 9, 12");

  const [ratioA, setRatioA] =
    useState("12");

  const [ratioB, setRatioB] =
    useState("18");

  const financialModes =
    new Set([
      "salesTax",
      "commission",
      "savings",
      "raise",
      "electricity",
    ]);

  const result =
    useMemo(() => {

      if (
        mode === "salesTax"
      ) {
        const base =
          Number(amount);

        const taxRate =
          Number(rate);

        if (
          base < 0 ||
          taxRate < 0
        ) {
          return {
            error:
              "Enter valid amount and tax rate.",
          };
        }

        const tax =
          base *
          taxRate /
          100;

        return {
          cards: [
            {
              label:
                "Tax amount",
              value:
                money(
                  tax,
                  currency
                ),
            },
            {
              label:
                "Total price",
              value:
                money(
                  base + tax,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode === "commission"
      ) {
        const salesValue =
          Number(sales);

        const percentage =
          Number(
            commissionRate
          );

        const base =
          Number(basePay);

        if (
          salesValue < 0 ||
          percentage < 0 ||
          base < 0
        ) {
          return {
            error:
              "Enter valid sales, commission rate, and base pay.",
          };
        }

        const commission =
          salesValue *
          percentage /
          100;

        return {
          cards: [
            {
              label:
                "Commission",
              value:
                money(
                  commission,
                  currency
                ),
            },
            {
              label:
                "Total earnings",
              value:
                money(
                  commission +
                  base,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode === "savings"
      ) {
        const target =
          Number(goal);

        const current =
          Number(
            currentSavings
          );

        const annualRate =
          Number(
            savingsRate
          );

        const periodMonths =
          Math.round(
            Number(months)
          );

        if (
          target <= 0 ||
          current < 0 ||
          annualRate < 0 ||
          periodMonths <= 0
        ) {
          return {
            error:
              "Enter valid goal, savings, rate, and time values.",
          };
        }

        const monthlyRate =
          annualRate /
          100 /
          12;

        let futureCurrent;
        let required;

        if (
          monthlyRate === 0
        ) {
          futureCurrent =
            current;

          required =
            Math.max(
              0,
              (
                target -
                current
              ) /
              periodMonths
            );
        } else {
          const growth =
            Math.pow(
              1 +
              monthlyRate,
              periodMonths
            );

          futureCurrent =
            current *
            growth;

          const annuityFactor =
            (
              growth - 1
            ) /
            monthlyRate;

          required =
            Math.max(
              0,
              (
                target -
                futureCurrent
              ) /
              annuityFactor
            );
        }

        return {
          cards: [
            {
              label:
                "Required monthly saving",
              value:
                money(
                  required,
                  currency
                ),
            },
            {
              label:
                "Current savings projected",
              value:
                money(
                  futureCurrent,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode === "raise"
      ) {
        const current =
          Number(currentPay);

        const percentage =
          Number(raiseRate);

        if (
          current < 0
        ) {
          return {
            error:
              "Enter a valid current pay amount.",
          };
        }

        const increase =
          current *
          percentage /
          100;

        const updated =
          current +
          increase;

        return {
          cards: [
            {
              label:
                "Annual increase",
              value:
                money(
                  increase,
                  currency
                ),
            },
            {
              label:
                "New annual pay",
              value:
                money(
                  updated,
                  currency
                ),
            },
            {
              label:
                "Monthly increase",
              value:
                money(
                  increase /
                  12,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode === "duration"
      ) {
        const start =
          timeToMinutes(
            startTime
          );

        const end =
          timeToMinutes(
            endTime
          );

        if (
          start === null ||
          end === null
        ) {
          return {
            error:
              "Choose valid start and end times.",
          };
        }

        let difference =
          end - start;

        if (
          difference < 0
        ) {
          difference +=
            24 * 60;
        }

        return {
          cards: [
            {
              label:
                "Hours",
              value:
                number(
                  difference /
                  60,
                  2
                ),
            },
            {
              label:
                "Minutes",
              value:
                number(
                  difference,
                  0
                ),
            },
            {
              label:
                "Clock duration",
              value:
                `${Math.floor(
                  difference / 60
                )}h ${
                  difference % 60
                }m`,
            },
          ],
        };
      }

      if (
        mode === "speed" ||
        mode === "pace"
      ) {
        const tripDistance =
          Number(distance);

        const totalHours =
          Number(hours) +
          Number(
            travelMinutes
          ) /
          60;

        if (
          tripDistance <= 0 ||
          totalHours <= 0
        ) {
          return {
            error:
              "Distance and travel time must be above zero.",
          };
        }

        const speed =
          tripDistance /
          totalHours;

        if (
          mode === "speed"
        ) {
          return {
            cards: [
              {
                label:
                  "Average speed",
                value:
                  `${number(
                    speed,
                    2
                  )} ${
                    distanceUnit ===
                    "km"
                      ? "km/h"
                      : "mph"
                  }`,
              },
              {
                label:
                  "Travel time",
                value:
                  `${number(
                    totalHours,
                    2
                  )} hours`,
              },
            ],
          };
        }

        const paceMinutes =
          totalHours *
          60 /
          tripDistance;

        return {
          cards: [
            {
              label:
                "Pace",
              value:
                `${formatPace(
                  paceMinutes
                )} min/${
                  distanceUnit
                }`,
            },
            {
              label:
                "Average speed",
              value:
                `${number(
                  speed,
                  2
                )} ${
                  distanceUnit ===
                  "km"
                    ? "km/h"
                    : "mph"
                }`,
            },
          ],
        };
      }

      if (
        mode === "electricity"
      ) {
        const power =
          Number(watts);

        const dailyHours =
          Number(
            hoursPerDay
          );

        const periodDays =
          Number(days);

        const price =
          Number(
            electricityRate
          );

        if (
          power < 0 ||
          dailyHours < 0 ||
          periodDays < 0 ||
          price < 0
        ) {
          return {
            error:
              "Enter valid electricity values.",
          };
        }

        const kwh =
          power /
          1000 *
          dailyHours *
          periodDays;

        return {
          cards: [
            {
              label:
                "Energy used",
              value:
                `${number(
                  kwh,
                  2
                )} kWh`,
            },
            {
              label:
                "Estimated cost",
              value:
                money(
                  kwh *
                  price,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode === "statistics"
      ) {
        const values =
          statistics
            .split(
              /[\s,]+/
            )
            .filter(Boolean)
            .map(Number);

        if (
          values.length === 0 ||
          values.some(
            (value) =>
              !Number.isFinite(
                value
              )
          )
        ) {
          return {
            error:
              "Enter numbers separated by spaces or commas.",
          };
        }

        const sorted =
          [...values].sort(
            (a, b) =>
              a - b
          );

        const sum =
          values.reduce(
            (
              total,
              value
            ) =>
              total +
              value,
            0
          );

        const mean =
          sum /
          values.length;

        const middle =
          Math.floor(
            sorted.length /
            2
          );

        const median =
          sorted.length % 2
            ? sorted[middle]
            : (
                sorted[
                  middle - 1
                ] +
                sorted[middle]
              ) /
              2;

        const frequencies =
          new Map();

        for (
          const value of
          values
        ) {
          frequencies.set(
            value,
            (
              frequencies.get(
                value
              ) || 0
            ) + 1
          );
        }

        const maxFrequency =
          Math.max(
            ...frequencies.values()
          );

        const modes =
          maxFrequency <= 1
            ? []
            : [
                ...frequencies.entries(),
              ]
                .filter(
                  ([, count]) =>
                    count ===
                    maxFrequency
                )
                .map(
                  ([value]) =>
                    value
                );

        return {
          cards: [
            {
              label:
                "Mean",
              value:
                number(
                  mean,
                  4
                ),
            },
            {
              label:
                "Median",
              value:
                number(
                  median,
                  4
                ),
            },
            {
              label:
                "Mode",
              value:
                modes.length
                  ? modes.join(
                      ", "
                    )
                  : "No repeated mode",
            },
            {
              label:
                "Range",
              value:
                number(
                  sorted[
                    sorted.length -
                    1
                  ] -
                  sorted[0],
                  4
                ),
            },
            {
              label:
                "Count",
              value:
                String(
                  values.length
                ),
            },
          ],
        };
      }

      if (
        mode === "ratio"
      ) {
        const first =
          Number(ratioA);

        const second =
          Number(ratioB);

        if (
          !Number.isInteger(
            first
          ) ||
          !Number.isInteger(
            second
          ) ||
          first === 0 ||
          second === 0
        ) {
          return {
            error:
              "Enter non-zero whole numbers.",
          };
        }

        const divisor =
          gcd(
            first,
            second
          );

        return {
          cards: [
            {
              label:
                "Simplified ratio",
              value:
                `${
                  first /
                  divisor
                }:${
                  second /
                  divisor
                }`,
            },
            {
              label:
                "A divided by B",
              value:
                number(
                  first /
                  second,
                  6
                ),
            },
            {
              label:
                "A as percentage of B",
              value:
                `${number(
                  first /
                  second *
                  100,
                  2
                )}%`,
            },
          ],
        };
      }

      return {
        cards: [],
      };

    }, [
      mode,
      amount,
      rate,
      currency,
      sales,
      commissionRate,
      basePay,
      goal,
      currentSavings,
      savingsRate,
      months,
      currentPay,
      raiseRate,
      startTime,
      endTime,
      distance,
      hours,
      travelMinutes,
      distanceUnit,
      watts,
      hoursPerDay,
      days,
      electricityRate,
      statistics,
      ratioA,
      ratioB,
    ]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

      {financialModes.has(
        mode
      ) && (
        <label className="mb-6 block max-w-xs">
          <span className="mb-2 block text-sm font-semibold">
            Currency
          </span>

          <select
            value={currency}
            onChange={(event) =>
              setCurrency(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            {currencies.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        </label>
      )}

      {mode === "salesTax" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="Price before tax"
            value={amount}
            setter={setAmount}
            min="0"
          />

          <NumberInput
            label="Sales tax (%)"
            value={rate}
            setter={setRate}
            min="0"
          />
        </div>
      )}

      {mode === "commission" && (
        <div className="grid gap-5 sm:grid-cols-3">
          <NumberInput
            label="Sales amount"
            value={sales}
            setter={setSales}
            min="0"
          />

          <NumberInput
            label="Commission rate (%)"
            value={commissionRate}
            setter={setCommissionRate}
            min="0"
          />

          <NumberInput
            label="Base pay"
            value={basePay}
            setter={setBasePay}
            min="0"
          />
        </div>
      )}

      {mode === "savings" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="Savings goal"
            value={goal}
            setter={setGoal}
            min="1"
          />

          <NumberInput
            label="Current savings"
            value={currentSavings}
            setter={setCurrentSavings}
            min="0"
          />

          <NumberInput
            label="Estimated annual return (%)"
            value={savingsRate}
            setter={setSavingsRate}
            min="0"
          />

          <NumberInput
            label="Months to goal"
            value={months}
            setter={setMonths}
            min="1"
            step="1"
          />
        </div>
      )}

      {mode === "raise" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="Current annual pay"
            value={currentPay}
            setter={setCurrentPay}
            min="0"
          />

          <NumberInput
            label="Raise (%)"
            value={raiseRate}
            setter={setRaiseRate}
          />
        </div>
      )}

      {mode === "duration" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Start time
            </span>

            <input
              type="time"
              value={startTime}
              onChange={(event) =>
                setStartTime(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              End time
            </span>

            <input
              type="time"
              value={endTime}
              onChange={(event) =>
                setEndTime(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            />
          </label>

          <p className="text-sm text-slate-500 sm:col-span-2">
            If the end time is earlier than the start time, the calculator treats it as the following day.
          </p>
        </div>
      )}

      {(mode === "speed" ||
        mode === "pace") && (
        <>
          <label className="mb-6 block max-w-xs">
            <span className="mb-2 block text-sm font-semibold">
              Distance unit
            </span>

            <select
              value={distanceUnit}
              onChange={(event) =>
                setDistanceUnit(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="km">
                Kilometers
              </option>

              <option value="mile">
                Miles
              </option>
            </select>
          </label>

          <div className="grid gap-5 sm:grid-cols-3">
            <NumberInput
              label={
                distanceUnit ===
                "km"
                  ? "Distance (km)"
                  : "Distance (miles)"
              }
              value={distance}
              setter={setDistance}
              min="0.01"
            />

            <NumberInput
              label="Hours"
              value={hours}
              setter={setHours}
              min="0"
            />

            <NumberInput
              label="Minutes"
              value={travelMinutes}
              setter={setTravelMinutes}
              min="0"
            />
          </div>
        </>
      )}

      {mode === "electricity" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="Appliance power (watts)"
            value={watts}
            setter={setWatts}
            min="0"
          />

          <NumberInput
            label="Hours used per day"
            value={hoursPerDay}
            setter={setHoursPerDay}
            min="0"
          />

          <NumberInput
            label="Number of days"
            value={days}
            setter={setDays}
            min="0"
          />

          <NumberInput
            label="Electricity price per kWh"
            value={electricityRate}
            setter={setElectricityRate}
            min="0"
          />
        </div>
      )}

      {mode === "statistics" && (
        <label>
          <span className="mb-2 block text-sm font-semibold">
            Numbers
          </span>

          <textarea
            value={statistics}
            onChange={(event) =>
              setStatistics(
                event.target.value
              )
            }
            rows="6"
            placeholder="4, 7, 7, 9, 12"
            className="w-full rounded-2xl border border-slate-300 bg-white p-4"
          />
        </label>
      )}

      {mode === "ratio" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberInput
            label="First whole number"
            value={ratioA}
            setter={setRatioA}
            step="1"
          />

          <NumberInput
            label="Second whole number"
            value={ratioB}
            setter={setRatioB}
            step="1"
          />
        </div>
      )}

      {result.error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {result.error}
        </div>
      )}

      {result.cards &&
        result.cards.length >
        0 && (
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {result.cards.map(
              (card) => (
                <ResultCard
                  key={
                    card.label
                  }
                  label={
                    card.label
                  }
                  value={
                    card.value
                  }
                />
              )
            )}
          </div>
        )}
    </div>
  );
}