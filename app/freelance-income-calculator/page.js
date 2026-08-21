"use client";

import { useMemo, useState } from "react";

export default function FreelanceIncomeCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [hourlyRate, setHourlyRate] = useState(50);
  const [billableHours, setBillableHours] = useState(25);
  const [workingWeeks, setWorkingWeeks] = useState(48);
  const [monthlyExpenses, setMonthlyExpenses] = useState(300);
  const [taxRate, setTaxRate] = useState(20);

  const results = useMemo(() => {
    const annualHours = Math.max(0, billableHours * workingWeeks);
    const annualRevenue = Math.max(0, hourlyRate * annualHours);
    const annualExpenses = Math.max(0, monthlyExpenses * 12);
    const profitBeforeTax = Math.max(0, annualRevenue - annualExpenses);

    const safeTaxRate = Math.min(
      Math.max(taxRate / 100, 0),
      0.95
    );

    const estimatedTax = profitBeforeTax * safeTaxRate;
    const takeHome = Math.max(0, profitBeforeTax - estimatedTax);

    const monthlyRevenue = annualRevenue / 12;
    const monthlyTakeHome = takeHome / 12;
    const weeklyTakeHome =
      workingWeeks > 0 ? takeHome / workingWeeks : 0;

    const effectiveTakeHomeRate =
      annualHours > 0 ? takeHome / annualHours : 0;

    return {
      annualHours,
      annualRevenue,
      annualExpenses,
      profitBeforeTax,
      estimatedTax,
      takeHome,
      monthlyRevenue,
      monthlyTakeHome,
      weeklyTakeHome,
      effectiveTakeHomeRate,
    };
  }, [
    hourlyRate,
    billableHours,
    workingWeeks,
    monthlyExpenses,
    taxRate,
  ]);

  const money = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Solo<span className="text-blue-600">Tools</span>
          </a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            ← Back to Tools
          </a>
        </div>
      </nav>

      <section className="px-6 pb-10 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-semibold text-blue-600">
            FREE FREELANCE CALCULATOR
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Freelance Income Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Estimate your yearly and monthly freelance income using your hourly
            rate, billable hours, business expenses and estimated tax rate.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">
              Your freelance workload
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Adjust the numbers to estimate your income.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
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
                label="Hourly rate"
                value={hourlyRate}
                onChange={setHourlyRate}
              />

              <Input
                label="Billable hours per week"
                value={billableHours}
                onChange={setBillableHours}
              />

              <Input
                label="Working weeks per year"
                value={workingWeeks}
                onChange={setWorkingWeeks}
              />

              <Input
                label="Monthly business expenses"
                value={monthlyExpenses}
                onChange={setMonthlyExpenses}
              />

              <Input
                label="Estimated tax rate"
                value={taxRate}
                onChange={setTaxRate}
                suffix="%"
              />
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Estimated yearly take-home income
              </p>

              <div className="mt-4 text-5xl font-bold sm:text-6xl">
                {money(results.takeHome)}
              </div>

              <p className="mt-3 text-slate-300">
                after estimated expenses and taxes
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ResultBox
                  label="Monthly take-home"
                  value={money(results.monthlyTakeHome)}
                />

                <ResultBox
                  label="Weekly take-home"
                  value={money(results.weeklyTakeHome)}
                />

                <ResultBox
                  label="Annual gross revenue"
                  value={money(results.annualRevenue)}
                />

                <ResultBox
                  label="Billable hours/year"
                  value={Math.round(results.annualHours).toLocaleString()}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                Income breakdown
              </h2>

              <div className="mt-6 space-y-3 rounded-xl bg-blue-50 p-5 text-blue-900">
                <BreakdownRow
                  label="Gross yearly revenue"
                  value={money(results.annualRevenue)}
                />

                <BreakdownRow
                  label="Yearly business expenses"
                  value={money(results.annualExpenses)}
                />

                <BreakdownRow
                  label="Profit before estimated tax"
                  value={money(results.profitBeforeTax)}
                />

                <BreakdownRow
                  label="Estimated taxes"
                  value={money(results.estimatedTax)}
                />

                <div className="border-t border-blue-200 pt-3 text-lg font-bold">
                  <BreakdownRow
                    label="Estimated take-home"
                    value={money(results.takeHome)}
                  />
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-500">
                This calculator provides a simplified estimate for planning
                purposes. Actual taxes and deductible expenses depend on your
                country and individual circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
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
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
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

function BreakdownRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
        <p>© 2026 SoloTools. Free tools for independent professionals.</p>

        <div className="flex flex-wrap gap-5">
          <a href="/about/" className="hover:text-white">About</a>
          <a href="/contact/" className="hover:text-white">Contact</a>
          <a href="/privacy-policy/" className="hover:text-white">Privacy</a>
          <a href="/terms/" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
