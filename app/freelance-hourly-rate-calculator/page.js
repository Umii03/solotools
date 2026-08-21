"use client";

import { useMemo, useState } from "react";

export default function FreelanceHourlyRateCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [incomeGoal, setIncomeGoal] = useState(60000);
  const [expenses, setExpenses] = useState(6000);
  const [taxRate, setTaxRate] = useState(20);
  const [weeksOff, setWeeksOff] = useState(4);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [billablePercent, setBillablePercent] = useState(60);

  const results = useMemo(() => {
    const workingWeeks = Math.max(0, 52 - weeksOff);

    const totalWorkingHours =
      workingWeeks * daysPerWeek * hoursPerDay;

    const billableHours =
      totalWorkingHours * (billablePercent / 100);

    const safeTaxRate = Math.min(
      Math.max(taxRate / 100, 0),
      0.95
    );

    const profitBeforeTax =
      incomeGoal / (1 - safeTaxRate);

    const requiredRevenue =
      profitBeforeTax + expenses;

    const hourlyRate =
      billableHours > 0
        ? requiredRevenue / billableHours
        : 0;

    return {
      workingWeeks,
      billableHours,
      requiredRevenue,
      hourlyRate,
      monthlyRevenue: requiredRevenue / 12,
    };
  }, [
    incomeGoal,
    expenses,
    taxRate,
    weeksOff,
    daysPerWeek,
    hoursPerDay,
    billablePercent,
  ]);

  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" aria-label="SoloTools home" className="inline-flex items-center">
  <img
    src="/solotools-logo.png"
    alt="SoloTools"
    className="h-9 w-auto sm:h-10"
  />
</a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            â† Back to Tools
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pb-10 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold text-blue-600">
            FREE FREELANCE CALCULATOR
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Freelance Hourly Rate Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Find out how much you should charge per hour based on your income
            goal, expenses, taxes, working schedule and billable time.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">Your details</h2>

            <p className="mt-2 text-sm text-slate-500">
              Adjust the numbers below to match your situation.
            </p>

            <div className="mt-8 space-y-6">
              {/* Currency */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="PKR">PKR - Pakistani Rupee</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>

              <Input
                label="Desired yearly take-home income"
                value={incomeGoal}
                onChange={setIncomeGoal}
              />

              <Input
                label="Yearly business expenses"
                value={expenses}
                onChange={setExpenses}
              />

              <Input
                label="Estimated tax rate"
                value={taxRate}
                onChange={setTaxRate}
                suffix="%"
              />

              <Input
                label="Weeks off per year"
                value={weeksOff}
                onChange={setWeeksOff}
              />

              <Input
                label="Working days per week"
                value={daysPerWeek}
                onChange={setDaysPerWeek}
              />

              <Input
                label="Working hours per day"
                value={hoursPerDay}
                onChange={setHoursPerDay}
              />

              <Input
                label="Billable time"
                value={billablePercent}
                onChange={setBillablePercent}
                suffix="%"
              />
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Recommended hourly rate
              </p>

              <div className="mt-4 text-5xl font-bold sm:text-6xl">
                {money(results.hourlyRate)}
              </div>

              <p className="mt-3 text-slate-300">
                per billable hour
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ResultBox
                  label="Yearly revenue needed"
                  value={money(results.requiredRevenue)}
                />

                <ResultBox
                  label="Monthly revenue target"
                  value={money(results.monthlyRevenue)}
                />

                <ResultBox
                  label="Billable hours/year"
                  value={Math.round(results.billableHours).toLocaleString()}
                />

                <ResultBox
                  label="Working weeks/year"
                  value={results.workingWeeks}
                />
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                How is your freelance rate calculated?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Your hourly rate needs to cover more than your salary.
                Freelancers also need to account for taxes, business expenses,
                vacation time and hours spent on non-billable work such as
                marketing, administration and finding clients.
              </p>

              <div className="mt-6 rounded-xl bg-blue-50 p-5">
                <p className="font-semibold text-blue-900">
                  Your current estimate
                </p>

                <p className="mt-2 leading-7 text-blue-800">
                  To reach a take-home income of{" "}
                  <strong>{money(incomeGoal)}</strong>, your business needs to
                  generate approximately{" "}
                  <strong>{money(results.requiredRevenue)}</strong> per year.
                  With about{" "}
                  <strong>
                    {Math.round(results.billableHours).toLocaleString()}
                  </strong>{" "}
                  billable hours available, your estimated minimum rate is{" "}
                  <strong>{money(results.hourlyRate)} per hour</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, onChange, suffix }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultBox({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-4">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
