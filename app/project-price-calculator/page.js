"use client";

import { useMemo, useState } from "react";

export default function ProjectPriceCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hours, setHours] = useState(40);
  const [expenses, setExpenses] = useState(200);
  const [profitMargin, setProfitMargin] = useState(20);
  const [contingency, setContingency] = useState(10);

  const results = useMemo(() => {
    const laborCost = hourlyRate * hours;
    const baseCost = laborCost + expenses;
    const contingencyAmount = baseCost * (Math.max(contingency, 0) / 100);
    const totalCost = baseCost + contingencyAmount;

    const safeMargin = Math.min(
      Math.max(profitMargin / 100, 0),
      0.95
    );

    const projectPrice = totalCost / (1 - safeMargin);
    const profit = projectPrice - totalCost;

    return {
      laborCost,
      contingencyAmount,
      totalCost,
      projectPrice,
      profit,
    };
  }, [hourlyRate, hours, expenses, profitMargin, contingency]);

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
            Project Price Calculator
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Calculate how much you should charge for a freelance project based
            on your hourly rate, estimated hours, expenses, contingency and
            desired profit margin.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold">Project details</h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your project costs and desired profit.
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
                label="Your hourly rate"
                value={hourlyRate}
                onChange={setHourlyRate}
              />

              <Input
                label="Estimated project hours"
                value={hours}
                onChange={setHours}
              />

              <Input
                label="Project expenses"
                value={expenses}
                onChange={setExpenses}
              />

              <Input
                label="Contingency buffer"
                value={contingency}
                onChange={setContingency}
                suffix="%"
              />

              <Input
                label="Desired profit margin"
                value={profitMargin}
                onChange={setProfitMargin}
                suffix="%"
              />
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Recommended project price
              </p>

              <div className="mt-4 text-5xl font-bold sm:text-6xl">
                {money(results.projectPrice)}
              </div>

              <p className="mt-3 text-slate-300">
                Suggested client quote
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <ResultBox
                  label="Labor cost"
                  value={money(results.laborCost)}
                />

                <ResultBox
                  label="Expenses"
                  value={money(expenses)}
                />

                <ResultBox
                  label="Contingency"
                  value={money(results.contingencyAmount)}
                />

                <ResultBox
                  label="Estimated profit"
                  value={money(results.profit)}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                How is your project price calculated?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Your quote should cover your time, direct expenses, unexpected
                work and your target profit. A contingency buffer helps protect
                you when a project takes longer than expected.
              </p>

              <div className="mt-6 space-y-3 rounded-xl bg-blue-50 p-5 text-blue-900">
                <BreakdownRow
                  label="Labor"
                  value={money(results.laborCost)}
                />

                <BreakdownRow
                  label="Expenses"
                  value={money(expenses)}
                />

                <BreakdownRow
                  label="Contingency"
                  value={money(results.contingencyAmount)}
                />

                <div className="border-t border-blue-200 pt-3">
                  <BreakdownRow
                    label="Total project cost"
                    value={money(results.totalCost)}
                  />
                </div>

                <BreakdownRow
                  label="Target profit"
                  value={money(results.profit)}
                />

                <div className="border-t border-blue-200 pt-3 text-lg font-bold">
                  <BreakdownRow
                    label="Recommended quote"
                    value={money(results.projectPrice)}
                  />
                </div>
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

