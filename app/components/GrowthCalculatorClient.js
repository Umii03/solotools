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

function numeric(
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

function Card({
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

function Input({
  label,
  value,
  setValue,
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
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          setValue(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
      />
    </label>
  );
}

export default function GrowthCalculatorClient({
  mode,
}) {
  const [currency, setCurrency] =
    useState("USD");

  const [units, setUnits] =
    useState("metric");

  const [weight, setWeight] =
    useState("70");

  const [heightCm, setHeightCm] =
    useState("175");

  const [feet, setFeet] =
    useState("5");

  const [inches, setInches] =
    useState("9");

  const [age, setAge] =
    useState("30");

  const [sex, setSex] =
    useState("male");

  const [activity, setActivity] =
    useState("1.55");

  const [bill, setBill] =
    useState("100");

  const [tipRate, setTipRate] =
    useState("15");

  const [people, setPeople] =
    useState("2");

  const [principal, setPrincipal] =
    useState("10000");

  const [rate, setRate] =
    useState("5");

  const [years, setYears] =
    useState("10");

  const [compounds, setCompounds] =
    useState("12");

  const [homePrice, setHomePrice] =
    useState("300000");

  const [downPayment, setDownPayment] =
    useState("60000");

  const [mortgageRate, setMortgageRate] =
    useState("6.5");

  const [mortgageYears, setMortgageYears] =
    useState("30");

  const [initialInvestment, setInitialInvestment] =
    useState("10000");

  const [finalValue, setFinalValue] =
    useState("12500");

  const [investmentCosts, setInvestmentCosts] =
    useState("0");

  const [fixedCosts, setFixedCosts] =
    useState("10000");

  const [unitPrice, setUnitPrice] =
    useState("50");

  const [variableCost, setVariableCost] =
    useState("30");

  const [distance, setDistance] =
    useState("300");

  const [efficiency, setEfficiency] =
    useState("12");

  const [fuelPrice, setFuelPrice] =
    useState("1.5");

  const [trips, setTrips] =
    useState("1");

  const financialModes = [
    "tip",
    "compound",
    "simple",
    "mortgage",
    "roi",
    "breakeven",
    "fuel",
  ];

  const result =
    useMemo(() => {
      function metricValues() {
        if (units === "metric") {
          return {
            kg:
              Number(weight),
            cm:
              Number(heightCm),
          };
        }

        const pounds =
          Number(weight);

        const totalInches =
          Number(feet) * 12 +
          Number(inches);

        return {
          kg:
            pounds *
            0.45359237,
          cm:
            totalInches *
            2.54,
        };
      }

      if (mode === "bmi") {
        const values =
          metricValues();

        const meters =
          values.cm / 100;

        if (
          values.kg <= 0 ||
          meters <= 0
        ) {
          return {
            error:
              "Enter valid weight and height values.",
          };
        }

        const bmi =
          values.kg /
          (meters * meters);

        let category =
          "General adult screening range";

        if (bmi < 18.5) {
          category =
            "Below common adult reference range";
        } else if (
          bmi < 25
        ) {
          category =
            "Within common adult reference range";
        } else if (
          bmi < 30
        ) {
          category =
            "Above common adult reference range";
        } else {
          category =
            "Well above common adult reference range";
        }

        return {
          cards: [
            {
              label:
                "BMI",
              value:
                numeric(
                  bmi,
                  1
                ),
            },
            {
              label:
                "General reference",
              value:
                category,
            },
          ],
        };
      }

      if (
        mode === "bmr" ||
        mode === "calorie"
      ) {
        const values =
          metricValues();

        const yearsOld =
          Number(age);

        if (
          values.kg <= 0 ||
          values.cm <= 0 ||
          yearsOld <= 0
        ) {
          return {
            error:
              "Enter valid weight, height, and age values.",
          };
        }

        const adjustment =
          sex === "male"
            ? 5
            : -161;

        const bmr =
          10 * values.kg +
          6.25 * values.cm -
          5 * yearsOld +
          adjustment;

        if (
          mode === "bmr"
        ) {
          return {
            cards: [
              {
                label:
                  "Estimated BMR",
                value:
                  `${numeric(
                    bmr,
                    0
                  )} kcal/day`,
              },
            ],
          };
        }

        const maintenance =
          bmr *
          Number(activity);

        return {
          cards: [
            {
              label:
                "Estimated BMR",
              value:
                `${numeric(
                  bmr,
                  0
                )} kcal/day`,
            },
            {
              label:
                "Estimated maintenance",
              value:
                `${numeric(
                  maintenance,
                  0
                )} kcal/day`,
            },
          ],
        };
      }

      if (mode === "tip") {
        const base =
          Number(bill);

        const tip =
          Number(tipRate);

        const count =
          Number(people);

        if (
          base < 0 ||
          tip < 0 ||
          count <= 0
        ) {
          return {
            error:
              "Enter valid bill, tip, and people values.",
          };
        }

        const tipAmount =
          base *
          tip /
          100;

        const total =
          base +
          tipAmount;

        return {
          cards: [
            {
              label:
                "Tip",
              value:
                money(
                  tipAmount,
                  currency
                ),
            },
            {
              label:
                "Total bill",
              value:
                money(
                  total,
                  currency
                ),
            },
            {
              label:
                "Per person",
              value:
                money(
                  total /
                  count,
                  currency
                ),
            },
          ],
        };
      }

      if (
        mode === "compound"
      ) {
        const p =
          Number(principal);

        const r =
          Number(rate) /
          100;

        const t =
          Number(years);

        const n =
          Number(compounds);

        if (
          p < 0 ||
          t < 0 ||
          n <= 0
        ) {
          return {
            error:
              "Enter valid principal, term, and compounding values.",
          };
        }

        const final =
          p *
          Math.pow(
            1 + r / n,
            n * t
          );

        return {
          cards: [
            {
              label:
                "Final balance",
              value:
                money(
                  final,
                  currency
                ),
            },
            {
              label:
                "Interest earned",
              value:
                money(
                  final - p,
                  currency
                ),
            },
          ],
        };
      }

      if (mode === "simple") {
        const p =
          Number(principal);

        const r =
          Number(rate) /
          100;

        const t =
          Number(years);

        if (
          p < 0 ||
          t < 0
        ) {
          return {
            error:
              "Enter valid values.",
          };
        }

        const interest =
          p * r * t;

        return {
          cards: [
            {
              label:
                "Simple interest",
              value:
                money(
                  interest,
                  currency
                ),
            },
            {
              label:
                "Final balance",
              value:
                money(
                  p + interest,
                  currency
                ),
            },
          ],
        };
      }

      if (mode === "mortgage") {
        const price =
          Number(homePrice);

        const down =
          Number(downPayment);

        const annual =
          Number(mortgageRate);

        const term =
          Number(mortgageYears);

        const loan =
          price - down;

        if (
          price <= 0 ||
          down < 0 ||
          loan <= 0 ||
          annual < 0 ||
          term <= 0
        ) {
          return {
            error:
              "Enter valid home price, down payment, interest rate, and term.",
          };
        }

        const months =
          Math.round(
            term * 12
          );

        const monthlyRate =
          annual /
          100 /
          12;

        let payment;

        if (
          monthlyRate === 0
        ) {
          payment =
            loan /
            months;
        } else {
          const factor =
            Math.pow(
              1 +
              monthlyRate,
              months
            );

          payment =
            loan *
            monthlyRate *
            factor /
            (factor - 1);
        }

        return {
          cards: [
            {
              label:
                "Mortgage principal",
              value:
                money(
                  loan,
                  currency
                ),
            },
            {
              label:
                "Monthly P&I",
              value:
                money(
                  payment,
                  currency
                ),
            },
            {
              label:
                "Total P&I payments",
              value:
                money(
                  payment *
                  months,
                  currency
                ),
            },
          ],
        };
      }

      if (mode === "roi") {
        const initial =
          Number(
            initialInvestment
          );

        const ending =
          Number(
            finalValue
          );

        const costs =
          Number(
            investmentCosts
          );

        const invested =
          initial +
          costs;

        if (
          invested <= 0
        ) {
          return {
            error:
              "Total invested amount must be above zero.",
          };
        }

        const profit =
          ending -
          invested;

        const roi =
          profit /
          invested *
          100;

        return {
          cards: [
            {
              label:
                "Profit / loss",
              value:
                money(
                  profit,
                  currency
                ),
            },
            {
              label:
                "ROI",
              value:
                `${numeric(
                  roi,
                  2
                )}%`,
            },
          ],
        };
      }

      if (
        mode === "breakeven"
      ) {
        const fixed =
          Number(fixedCosts);

        const price =
          Number(unitPrice);

        const variable =
          Number(variableCost);

        const margin =
          price -
          variable;

        if (
          fixed < 0 ||
          price <= 0 ||
          variable < 0 ||
          margin <= 0
        ) {
          return {
            error:
              "Selling price must be greater than variable cost.",
          };
        }

        const unitsNeeded =
          Math.ceil(
            fixed /
            margin
          );

        return {
          cards: [
            {
              label:
                "Contribution per unit",
              value:
                money(
                  margin,
                  currency
                ),
            },
            {
              label:
                "Break-even units",
              value:
                numeric(
                  unitsNeeded,
                  0
                ),
            },
            {
              label:
                "Break-even revenue",
              value:
                money(
                  unitsNeeded *
                  price,
                  currency
                ),
            },
          ],
        };
      }

      if (mode === "fuel") {
        const tripDistance =
          Number(distance);

        const economy =
          Number(efficiency);

        const price =
          Number(fuelPrice);

        const tripCount =
          Number(trips);

        if (
          tripDistance < 0 ||
          economy <= 0 ||
          price < 0 ||
          tripCount <= 0
        ) {
          return {
            error:
              "Enter valid distance, efficiency, price, and trip values.",
          };
        }

        const totalDistance =
          tripDistance *
          tripCount;

        const fuelUsed =
          totalDistance /
          economy;

        return {
          cards: [
            {
              label:
                units === "metric"
                  ? "Fuel used (liters)"
                  : "Fuel used (gallons)",
              value:
                numeric(
                  fuelUsed,
                  2
                ),
            },
            {
              label:
                "Total fuel cost",
              value:
                money(
                  fuelUsed *
                  price,
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
      units,
      weight,
      heightCm,
      feet,
      inches,
      age,
      sex,
      activity,
      bill,
      tipRate,
      people,
      currency,
      principal,
      rate,
      years,
      compounds,
      homePrice,
      downPayment,
      mortgageRate,
      mortgageYears,
      initialInvestment,
      finalValue,
      investmentCosts,
      fixedCosts,
      unitPrice,
      variableCost,
      distance,
      efficiency,
      fuelPrice,
      trips,
    ]);

  const healthMode =
    [
      "bmi",
      "bmr",
      "calorie",
    ].includes(mode);

  const showCurrency =
    financialModes.includes(
      mode
    );

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">

      {showCurrency && (
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

      {(healthMode ||
        mode === "fuel") && (
        <label className="mb-6 block max-w-xs">
          <span className="mb-2 block text-sm font-semibold">
            Units
          </span>

          <select
            value={units}
            onChange={(event) =>
              setUnits(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="metric">
              Metric
            </option>

            <option value="us">
              US
            </option>
          </select>
        </label>
      )}

      {healthMode && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label={
              units === "metric"
                ? "Weight (kg)"
                : "Weight (lb)"
            }
            value={weight}
            setValue={setWeight}
            min="1"
          />

          {units === "metric" ? (
            <Input
              label="Height (cm)"
              value={heightCm}
              setValue={setHeightCm}
              min="1"
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Feet"
                value={feet}
                setValue={setFeet}
                min="1"
              />

              <Input
                label="Inches"
                value={inches}
                setValue={setInches}
                min="0"
                max="11"
              />
            </div>
          )}

          {(mode === "bmr" ||
            mode === "calorie") && (
            <>
              <Input
                label="Age"
                value={age}
                setValue={setAge}
                min="1"
              />

              <label>
                <span className="mb-2 block text-sm font-semibold">
                  Sex used by formula
                </span>

                <select
                  value={sex}
                  onChange={(event) =>
                    setSex(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>
                </select>
              </label>
            </>
          )}

          {mode === "calorie" && (
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold">
                Activity level
              </span>

              <select
                value={activity}
                onChange={(event) =>
                  setActivity(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="1.2">
                  Sedentary
                </option>

                <option value="1.375">
                  Light activity
                </option>

                <option value="1.55">
                  Moderate activity
                </option>

                <option value="1.725">
                  Very active
                </option>

                <option value="1.9">
                  Extra active
                </option>
              </select>
            </label>
          )}
        </div>
      )}

      {mode === "tip" && (
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Bill amount"
            value={bill}
            setValue={setBill}
            min="0"
          />

          <Input
            label="Tip (%)"
            value={tipRate}
            setValue={setTipRate}
            min="0"
          />

          <Input
            label="People"
            value={people}
            setValue={setPeople}
            min="1"
            step="1"
          />
        </div>
      )}

      {(mode === "compound" ||
        mode === "simple") && (
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Principal"
            value={principal}
            setValue={setPrincipal}
            min="0"
          />

          <Input
            label="Annual rate (%)"
            value={rate}
            setValue={setRate}
          />

          <Input
            label="Years"
            value={years}
            setValue={setYears}
            min="0"
          />

          {mode === "compound" && (
            <label className="sm:col-span-3">
              <span className="mb-2 block text-sm font-semibold">
                Compounds per year
              </span>

              <select
                value={compounds}
                onChange={(event) =>
                  setCompounds(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
              >
                <option value="1">
                  Annually
                </option>

                <option value="2">
                  Semi-annually
                </option>

                <option value="4">
                  Quarterly
                </option>

                <option value="12">
                  Monthly
                </option>

                <option value="365">
                  Daily
                </option>
              </select>
            </label>
          )}
        </div>
      )}

      {mode === "mortgage" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Home price"
            value={homePrice}
            setValue={setHomePrice}
            min="1"
          />

          <Input
            label="Down payment"
            value={downPayment}
            setValue={setDownPayment}
            min="0"
          />

          <Input
            label="Annual interest (%)"
            value={mortgageRate}
            setValue={setMortgageRate}
            min="0"
          />

          <Input
            label="Mortgage term (years)"
            value={mortgageYears}
            setValue={setMortgageYears}
            min="1"
          />
        </div>
      )}

      {mode === "roi" && (
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Initial investment"
            value={initialInvestment}
            setValue={setInitialInvestment}
          />

          <Input
            label="Final value"
            value={finalValue}
            setValue={setFinalValue}
          />

          <Input
            label="Additional costs"
            value={investmentCosts}
            setValue={setInvestmentCosts}
          />
        </div>
      )}

      {mode === "breakeven" && (
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Fixed costs"
            value={fixedCosts}
            setValue={setFixedCosts}
            min="0"
          />

          <Input
            label="Selling price / unit"
            value={unitPrice}
            setValue={setUnitPrice}
            min="0"
          />

          <Input
            label="Variable cost / unit"
            value={variableCost}
            setValue={setVariableCost}
            min="0"
          />
        </div>
      )}

      {mode === "fuel" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label={
              units === "metric"
                ? "Distance (km)"
                : "Distance (miles)"
            }
            value={distance}
            setValue={setDistance}
            min="0"
          />

          <Input
            label={
              units === "metric"
                ? "Efficiency (km/L)"
                : "Efficiency (MPG)"
            }
            value={efficiency}
            setValue={setEfficiency}
            min="0.01"
          />

          <Input
            label={
              units === "metric"
                ? "Fuel price / liter"
                : "Fuel price / gallon"
            }
            value={fuelPrice}
            setValue={setFuelPrice}
            min="0"
          />

          <Input
            label="Number of trips"
            value={trips}
            setValue={setTrips}
            min="1"
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
        result.cards.length > 0 && (
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {result.cards.map(
              (card) => (
                <Card
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