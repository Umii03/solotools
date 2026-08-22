"use client";

import { useState } from "react";

const currencies = [
  { code: "USD", label: "USD - US Dollar" },
  { code: "GBP", label: "GBP - British Pound" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "PKR", label: "PKR - Pakistani Rupee" },
  { code: "INR", label: "INR - Indian Rupee" },
  { code: "CAD", label: "CAD - Canadian Dollar" },
  { code: "AUD", label: "AUD - Australian Dollar" },
];

function formatMoney(value, currency) {
  if (!Number.isFinite(value)) return "-";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export default function SalaryToHourlyCalculator() {
  const [mode, setMode] = useState("salary");
  const [currency, setCurrency] = useState("USD");
  const [salary, setSalary] = useState("60000");
  const [hourlyRate, setHourlyRate] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const salaryNumber = Number(salary) || 0;
  const hourlyNumber = Number(hourlyRate) || 0;
  const hoursNumber = Number(hoursPerWeek) || 0;
  const weeksNumber = Number(weeksPerYear) || 0;

  const annualHours = hoursNumber * weeksNumber;

  const calculatedHourly =
    annualHours > 0 ? salaryNumber / annualHours : 0;

  const calculatedSalary =
    hourlyNumber * annualHours;

  const monthlySalary =
    mode === "salary"
      ? salaryNumber / 12
      : calculatedSalary / 12;

  const weeklyPay =
    mode === "salary"
      ? weeksNumber > 0
        ? salaryNumber / weeksNumber
        : 0
      : hourlyNumber * hoursNumber;

  const result =
    mode === "salary" ? calculatedHourly : calculatedSalary;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a
            href="/"
            aria-label="SoloTools home"
            className="inline-flex items-center"
          >
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            <a href="/" className="hover:text-slate-950">
              Tools
            </a>
            <a href="/guides/" className="hover:text-slate-950">
              Guides
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free salary converter
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Salary to Hourly Calculator
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Convert an annual salary into an hourly rate, or switch the
            calculator to convert an hourly rate into an estimated annual
            salary.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-8">
          <div className="grid grid-cols-2 rounded-xl bg-slate-200 p-1">
            <button
              type="button"
              onClick={() => setMode("salary")}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                mode === "salary"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600"
              }`}
            >
              Salary to Hourly
            </button>

            <button
              type="button"
              onClick={() => setMode("hourly")}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                mode === "hourly"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600"
              }`}
            >
              Hourly to Salary
            </button>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Currency
              </span>

              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                {currencies.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            {mode === "salary" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Annual salary
                </span>

                <input
                  type="number"
                  min="0"
                  step="100"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>
            ) : (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Hourly rate
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Hours per week
              </span>

              <input
                type="number"
                min="1"
                max="168"
                step="1"
                value={hoursPerWeek}
                onChange={(event) => setHoursPerWeek(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Working weeks per year
              </span>

              <input
                type="number"
                min="1"
                max="52"
                step="1"
                value={weeksPerYear}
                onChange={(event) => setWeeksPerYear(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
            <p className="text-sm font-medium text-slate-300">
              {mode === "salary"
                ? "Estimated hourly rate"
                : "Estimated annual salary"}
            </p>

            <p className="mt-2 break-words text-4xl font-bold">
              {formatMoney(result, currency)}
              {mode === "salary" && (
                <span className="ml-2 text-lg font-medium text-slate-400">
                  / hour
                </span>
              )}
            </p>

            <div className="mt-6 grid gap-4 border-t border-slate-700 pt-5 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Annual hours
                </p>
                <p className="mt-1 font-semibold">
                  {annualHours.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Weekly pay
                </p>
                <p className="mt-1 font-semibold">
                  {formatMoney(weeklyPay, currency)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Monthly pay
                </p>
                <p className="mt-1 font-semibold">
                  {formatMoney(monthlySalary, currency)}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Estimates do not include taxes, benefits, overtime, bonuses,
            paid leave, or other compensation.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            How to convert salary to hourly pay
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Multiply your weekly hours by the number of weeks you work during
            the year. Then divide your annual salary by the total annual hours.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-semibold">Salary to hourly formula</p>
            <p className="mt-2 text-lg">
              Hourly rate = Annual salary / (Hours per week x Weeks per year)
            </p>
          </div>

          <p className="mt-6 leading-7 text-slate-600">
            For example, a salary of 60,000 with a 40-hour work week across
            52 weeks equals approximately 28.85 per hour before deductions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold">
          How to convert hourly pay to annual salary
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          Multiply your hourly rate by weekly working hours and then by the
          number of weeks worked per year.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold">Hourly to salary formula</p>
          <p className="mt-2 text-lg">
            Annual salary = Hourly rate x Hours per week x Weeks per year
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            When is this calculator useful?
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold">Comparing job offers</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Compare salaried and hourly jobs using a common pay format.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold">Planning freelance rates</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Use an employee salary as a starting reference before
                accounting for freelance expenses and unpaid time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold">Part-time schedules</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Adjust weekly hours to estimate annual pay for part-time work.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold">Time away from work</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Change working weeks to account for unpaid leave or seasonal
                schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold">
          Frequently asked questions
        </h2>

        <div className="mt-7 space-y-6">
          <div>
            <h3 className="text-lg font-bold">
              What is 60,000 a year per hour?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              At 40 hours per week and 52 weeks per year, 60,000 works out to
              approximately 28.85 per hour before taxes and deductions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Can I use this as a UK hourly rate calculator?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              Yes. Select GBP and enter your annual salary, weekly hours,
              and working weeks.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Does salary to hourly include paid vacation?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              The calculator uses the working weeks you enter. Adjust that
              number if your calculation should exclude unpaid time away.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Is employee hourly pay the same as a freelance hourly rate?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              Usually not. Freelancers generally need to account for business
              expenses, non-billable time, benefits, and taxes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-2xl font-bold">
            Related freelancer tools
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a
              href="/freelance-hourly-rate-calculator/"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-400"
            >
              <h3 className="font-bold">
                Freelance Hourly Rate Calculator
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Calculate a sustainable freelance hourly rate.
              </p>
            </a>

            <a
              href="/project-price-calculator/"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-400"
            >
              <h3 className="font-bold">
                Project Price Calculator
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate a profitable project quote.
              </p>
            </a>

            <a
              href="/freelance-income-calculator/"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-400"
            >
              <h3 className="font-bold">
                Freelance Income Calculator
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate revenue, expenses, taxes, and take-home income.
              </p>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>SoloTools - free tools for freelancers.</p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/" className="hover:text-slate-900">
              About
            </a>
            <a href="/privacy-policy/" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms/" className="hover:text-slate-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
