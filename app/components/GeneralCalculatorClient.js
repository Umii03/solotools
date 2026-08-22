"use client";

import {
  useEffect,
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

function money(value, currency) {
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

function number(value, decimals = 2) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits:
        decimals,
    }
  ).format(value);
}

function percent(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${number(value, 2)}%`;
}

function localDateString() {
  const date = new Date();

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DAY_MS =
  24 * 60 * 60 * 1000;

function parseUtcDate(value) {
  if (!value) {
    return null;
  }

  const parts =
    value
      .split("-")
      .map(Number);

  if (parts.length !== 3) {
    return null;
  }

  return new Date(
    Date.UTC(
      parts[0],
      parts[1] - 1,
      parts[2]
    )
  );
}

function daysInMonth(
  year,
  month
) {
  return new Date(
    Date.UTC(
      year,
      month + 1,
      0
    )
  ).getUTCDate();
}

function addYearsClamped(
  date,
  years
) {
  const year =
    date.getUTCFullYear() +
    years;

  const month =
    date.getUTCMonth();

  const day =
    Math.min(
      date.getUTCDate(),
      daysInMonth(
        year,
        month
      )
    );

  return new Date(
    Date.UTC(
      year,
      month,
      day
    )
  );
}

function addMonthsClamped(
  date,
  months
) {
  const sourceYear =
    date.getUTCFullYear();

  const sourceMonth =
    date.getUTCMonth();

  const totalMonths =
    sourceYear * 12 +
    sourceMonth +
    months;

  const year =
    Math.floor(
      totalMonths / 12
    );

  const month =
    totalMonths % 12;

  const day =
    Math.min(
      date.getUTCDate(),
      daysInMonth(
        year,
        month
      )
    );

  return new Date(
    Date.UTC(
      year,
      month,
      day
    )
  );
}

function ageDetails(
  birthValue,
  referenceValue
) {
  const birth =
    parseUtcDate(
      birthValue
    );

  const reference =
    parseUtcDate(
      referenceValue
    );

  if (!birth || !reference) {
    return null;
  }

  if (reference < birth) {
    return {
      error:
        "The reference date cannot be before the date of birth.",
    };
  }

  let years =
    reference.getUTCFullYear() -
    birth.getUTCFullYear();

  let cursor =
    addYearsClamped(
      birth,
      years
    );

  if (cursor > reference) {
    years -= 1;

    cursor =
      addYearsClamped(
        birth,
        years
      );
  }

  let months = 0;

  while (months < 11) {

    const next =
      addMonthsClamped(
        cursor,
        1
      );

    if (next > reference) {
      break;
    }

    cursor = next;
    months += 1;
  }

  const days =
    Math.floor(
      (reference - cursor) /
      DAY_MS
    );

  const totalDays =
    Math.floor(
      (reference - birth) /
      DAY_MS
    );

  return {
    years,
    months,
    days,
    totalDays,
  };
}

function InputField({
  label,
  value,
  onChange,
  type = "number",
  min,
  max,
  step = "any",
  placeholder,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">
        {label}
      </span>

      <input
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />
    </label>
  );
}

function CurrencyField({
  value,
  onChange,
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">
        Currency
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      >
        {currencies.map(
          (currency) => (
            <option
              key={currency}
              value={currency}
            >
              {currency}
            </option>
          )
        )}
      </select>
    </label>
  );
}

function StatCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-2xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}

export default function GeneralCalculatorClient({
  mode,
}) {
  const [currency, setCurrency] =
    useState("USD");

  const [
    percentageMode,
    setPercentageMode,
  ] = useState("of");

  const [x, setX] =
    useState("20");

  const [y, setY] =
    useState("100");

  const [
    originalPrice,
    setOriginalPrice,
  ] = useState("100");

  const [
    discountRate,
    setDiscountRate,
  ] = useState("20");

  const [revenue, setRevenue] =
    useState("1000");

  const [cost, setCost] =
    useState("600");

  const [
    loanAmount,
    setLoanAmount,
  ] = useState("10000");

  const [
    annualRate,
    setAnnualRate,
  ] = useState("7");

  const [
    loanYears,
    setLoanYears,
  ] = useState("3");

  const [
    birthDate,
    setBirthDate,
  ] = useState("");

  const [
    ageOnDate,
    setAgeOnDate,
  ] = useState("");

  const [
    startDate,
    setStartDate,
  ] = useState("");

  const [
    endDate,
    setEndDate,
  ] = useState("");

  const [
    vatMode,
    setVatMode,
  ] = useState("add");

  const [
    vatAmount,
    setVatAmount,
  ] = useState("100");

  const [
    vatRate,
    setVatRate,
  ] = useState("20");

  useEffect(() => {
    const today =
      localDateString();

    setAgeOnDate(
      (current) =>
        current || today
    );

    setEndDate(
      (current) =>
        current || today
    );
  }, []);

  const result =
    useMemo(() => {

      if (
        mode ===
        "percentage"
      ) {
        const first =
          Number(x);

        const second =
          Number(y);

        if (
          !Number.isFinite(
            first
          ) ||
          !Number.isFinite(
            second
          )
        ) {
          return {
            error:
              "Enter valid numbers.",
            cards: [],
          };
        }

        if (
          percentageMode ===
          "of"
        ) {
          const value =
            second *
            (first / 100);

          return {
            cards: [
              {
                label:
                  `${number(first)}% of ${number(second)}`,
                value:
                  number(value),
              },
            ],
          };
        }

        if (
          percentageMode ===
          "is"
        ) {
          if (second === 0) {
            return {
              error:
                "The total value cannot be zero.",
              cards: [],
            };
          }

          const value =
            (first / second) *
            100;

          return {
            cards: [
              {
                label:
                  "Percentage",
                value:
                  percent(value),
              },
            ],
          };
        }

        if (first === 0) {
          return {
            error:
              "The starting value cannot be zero for percentage change.",
            cards: [],
          };
        }

        const change =
          ((second - first) /
            Math.abs(first)) *
          100;

        return {
          cards: [
            {
              label:
                "Percentage change",
              value:
                percent(change),
            },
            {
              label:
                change >= 0
                  ? "Increase"
                  : "Decrease",
              value:
                number(
                  Math.abs(
                    second - first
                  )
                ),
            },
          ],
        };
      }

      if (
        mode ===
        "discount"
      ) {
        const price =
          Number(
            originalPrice
          );

        const rate =
          Number(
            discountRate
          );

        if (
          !Number.isFinite(
            price
          ) ||
          !Number.isFinite(
            rate
          ) ||
          price < 0 ||
          rate < 0 ||
          rate > 100
        ) {
          return {
            error:
              "Enter a valid price and a discount between 0% and 100%.",
            cards: [],
          };
        }

        const saving =
          price *
          (rate / 100);

        const finalPrice =
          price - saving;

        return {
          cards: [
            {
              label:
                "You save",
              value:
                money(
                  saving,
                  currency
                ),
            },
            {
              label:
                "Final price",
              value:
                money(
                  finalPrice,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode ===
        "profit"
      ) {
        const sales =
          Number(revenue);

        const expenses =
          Number(cost);

        if (
          !Number.isFinite(
            sales
          ) ||
          !Number.isFinite(
            expenses
          ) ||
          sales < 0 ||
          expenses < 0
        ) {
          return {
            error:
              "Enter valid revenue and cost values.",
            cards: [],
          };
        }

        const profit =
          sales - expenses;

        const margin =
          sales !== 0
            ? (profit / sales) *
              100
            : null;

        const markup =
          expenses !== 0
            ? (profit /
                expenses) *
              100
            : null;

        return {
          cards: [
            {
              label:
                "Profit",
              value:
                money(
                  profit,
                  currency
                ),
            },
            {
              label:
                "Profit margin",
              value:
                margin === null
                  ? "-"
                  : percent(
                      margin
                    ),
            },
            {
              label:
                "Markup",
              value:
                markup === null
                  ? "-"
                  : percent(
                      markup
                    ),
            },
          ],
        };
      }

      if (
        mode ===
        "loan"
      ) {
        const principal =
          Number(
            loanAmount
          );

        const rate =
          Number(
            annualRate
          );

        const years =
          Number(
            loanYears
          );

        if (
          !Number.isFinite(
            principal
          ) ||
          !Number.isFinite(
            rate
          ) ||
          !Number.isFinite(
            years
          ) ||
          principal <= 0 ||
          rate < 0 ||
          years <= 0
        ) {
          return {
            error:
              "Enter a positive loan amount and term with a non-negative interest rate.",
            cards: [],
          };
        }

        const months =
          Math.max(
            1,
            Math.round(
              years * 12
            )
          );

        const monthlyRate =
          rate /
          100 /
          12;

        let payment = 0;

        if (
          monthlyRate === 0
        ) {
          payment =
            principal /
            months;
        } else {

          const factor =
            Math.pow(
              1 + monthlyRate,
              months
            );

          payment =
            principal *
            monthlyRate *
            factor /
            (factor - 1);
        }

        const total =
          payment * months;

        const interest =
          total - principal;

        return {
          cards: [
            {
              label:
                "Monthly payment",
              value:
                money(
                  payment,
                  currency
                ),
            },
            {
              label:
                "Total repayment",
              value:
                money(
                  total,
                  currency
                ),
            },
            {
              label:
                "Total interest",
              value:
                money(
                  interest,
                  currency
                ),
            },
            {
              label:
                "Payments",
              value:
                number(
                  months,
                  0
                ),
            },
          ],
        };
      }

      if (
        mode ===
        "age"
      ) {
        if (
          !birthDate ||
          !ageOnDate
        ) {
          return {
            cards: [],
          };
        }

        const details =
          ageDetails(
            birthDate,
            ageOnDate
          );

        if (!details) {
          return {
            error:
              "Enter valid dates.",
            cards: [],
          };
        }

        if (details.error) {
          return {
            error:
              details.error,
            cards: [],
          };
        }

        return {
          cards: [
            {
              label:
                "Years",
              value:
                number(
                  details.years,
                  0
                ),
            },
            {
              label:
                "Months",
              value:
                number(
                  details.months,
                  0
                ),
            },
            {
              label:
                "Days",
              value:
                number(
                  details.days,
                  0
                ),
            },
            {
              label:
                "Total days",
              value:
                number(
                  details.totalDays,
                  0
                ),
            },
          ],
        };
      }

      if (
        mode ===
        "date"
      ) {
        if (
          !startDate ||
          !endDate
        ) {
          return {
            cards: [],
          };
        }

        const start =
          parseUtcDate(
            startDate
          );

        const end =
          parseUtcDate(
            endDate
          );

        if (!start || !end) {
          return {
            error:
              "Enter valid dates.",
            cards: [],
          };
        }

        if (end < start) {
          return {
            error:
              "The end date cannot be before the start date.",
            cards: [],
          };
        }

        const totalDays =
          Math.floor(
            (end - start) /
            DAY_MS
          );

        const weeks =
          Math.floor(
            totalDays / 7
          );

        const remainingDays =
          totalDays % 7;

        return {
          cards: [
            {
              label:
                "Total days",
              value:
                number(
                  totalDays,
                  0
                ),
            },
            {
              label:
                "Full weeks",
              value:
                number(
                  weeks,
                  0
                ),
            },
            {
              label:
                "Extra days",
              value:
                number(
                  remainingDays,
                  0
                ),
            },
            {
              label:
                "Total hours",
              value:
                number(
                  totalDays * 24,
                  0
                ),
            },
          ],
        };
      }

      if (
        mode ===
        "vat"
      ) {
        const amount =
          Number(
            vatAmount
          );

        const rate =
          Number(
            vatRate
          );

        if (
          !Number.isFinite(
            amount
          ) ||
          !Number.isFinite(
            rate
          ) ||
          amount < 0 ||
          rate < 0
        ) {
          return {
            error:
              "Enter a valid amount and VAT rate.",
            cards: [],
          };
        }

        let net = 0;
        let vat = 0;
        let gross = 0;

        if (
          vatMode ===
          "add"
        ) {
          net = amount;

          vat =
            net *
            (rate / 100);

          gross =
            net + vat;

        } else {

          gross = amount;

          const divisor =
            1 +
            rate / 100;

          net =
            divisor === 0
              ? gross
              : gross /
                divisor;

          vat =
            gross - net;
        }

        return {
          cards: [
            {
              label:
                "Net amount",
              value:
                money(
                  net,
                  currency
                ),
            },
            {
              label:
                "VAT amount",
              value:
                money(
                  vat,
                  currency
                ),
            },
            {
              label:
                "Gross amount",
              value:
                money(
                  gross,
                  currency
                ),
            },
          ],
        };
      }

      return {
        cards: [],
      };

    }, [
      mode,
      percentageMode,
      x,
      y,
      originalPrice,
      discountRate,
      revenue,
      cost,
      loanAmount,
      annualRate,
      loanYears,
      birthDate,
      ageOnDate,
      startDate,
      endDate,
      vatMode,
      vatAmount,
      vatRate,
      currency,
    ]);

  const financialMode =
    [
      "discount",
      "profit",
      "loan",
      "vat",
    ].includes(mode);

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">

      {financialMode && (
        <div className="mb-6 max-w-xs">
          <CurrencyField
            value={currency}
            onChange={setCurrency}
          />
        </div>
      )}

      {mode === "percentage" && (
        <>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Calculation
            </span>

            <select
              value={percentageMode}
              onChange={(event) =>
                setPercentageMode(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="of">
                What is X% of Y?
              </option>

              <option value="is">
                X is what percent of Y?
              </option>

              <option value="change">
                Percentage change from X to Y
              </option>
            </select>
          </label>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <InputField
              label={
                percentageMode ===
                "of"
                  ? "Percentage (X)"
                  : percentageMode ===
                      "change"
                    ? "Starting value (X)"
                    : "Value (X)"
              }
              value={x}
              onChange={setX}
            />

            <InputField
              label={
                percentageMode ===
                "of"
                  ? "Number (Y)"
                  : percentageMode ===
                      "change"
                    ? "Ending value (Y)"
                    : "Total (Y)"
              }
              value={y}
              onChange={setY}
            />
          </div>
        </>
      )}

      {mode === "discount" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Original price"
            value={originalPrice}
            onChange={setOriginalPrice}
            min="0"
          />

          <InputField
            label="Discount (%)"
            value={discountRate}
            onChange={setDiscountRate}
            min="0"
            max="100"
          />
        </div>
      )}

      {mode === "profit" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Revenue / selling price"
            value={revenue}
            onChange={setRevenue}
            min="0"
          />

          <InputField
            label="Cost"
            value={cost}
            onChange={setCost}
            min="0"
          />
        </div>
      )}

      {mode === "loan" && (
        <div className="grid gap-5 sm:grid-cols-3">
          <InputField
            label="Loan amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min="0"
          />

          <InputField
            label="Annual interest (%)"
            value={annualRate}
            onChange={setAnnualRate}
            min="0"
          />

          <InputField
            label="Loan term (years)"
            value={loanYears}
            onChange={setLoanYears}
            min="0.1"
            step="0.1"
          />
        </div>
      )}

      {mode === "age" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Date of birth"
            type="date"
            value={birthDate}
            onChange={setBirthDate}
          />

          <InputField
            label="Age on date"
            type="date"
            value={ageOnDate}
            onChange={setAgeOnDate}
          />
        </div>
      )}

      {mode === "date" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Start date"
            type="date"
            value={startDate}
            onChange={setStartDate}
          />

          <InputField
            label="End date"
            type="date"
            value={endDate}
            onChange={setEndDate}
          />
        </div>
      )}

      {mode === "vat" && (
        <>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              VAT calculation
            </span>

            <select
              value={vatMode}
              onChange={(event) =>
                setVatMode(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              <option value="add">
                Add VAT to net amount
              </option>

              <option value="remove">
                Extract VAT from gross amount
              </option>
            </select>
          </label>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <InputField
              label={
                vatMode === "add"
                  ? "Net amount"
                  : "Gross amount"
              }
              value={vatAmount}
              onChange={setVatAmount}
              min="0"
            />

            <InputField
              label="VAT rate (%)"
              value={vatRate}
              onChange={setVatRate}
              min="0"
            />
          </div>
        </>
      )}

      {result.error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {result.error}
        </div>
      )}

      {result.cards &&
        result.cards.length > 0 && (
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {result.cards.map(
              (card) => (
                <StatCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                />
              )
            )}
          </div>
        )}
    </div>
  );
}
