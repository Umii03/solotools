export default function CalculatorsPage() {
  const calculators = [
    {
      title: "Salary to Hourly Calculator",
      description:
        "Convert an annual salary to hourly pay or convert an hourly rate into an estimated annual salary.",
      href: "/salary-to-hourly-calculator/",
      label: "Salary & Pay",
    },
    {
      title: "Freelance Hourly Rate Calculator",
      description:
        "Estimate a sustainable freelance hourly rate based on income goals, expenses, taxes, and billable time.",
      href: "/freelance-hourly-rate-calculator/",
      label: "Freelance",
    },
    {
      title: "Project Price Calculator",
      description:
        "Estimate a profitable freelance project quote using hours, expenses, contingency, and profit margin.",
      href: "/project-price-calculator/",
      label: "Freelance",
    },
    {
      title: "Freelance Income Calculator",
      description:
        "Estimate annual revenue, business expenses, taxes, monthly income, and take-home freelance earnings.",
      href: "/freelance-income-calculator/",
      label: "Freelance",
    },
  ];

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
            <a href="/calculators/" className="text-slate-950">
              Calculators
            </a>
            <a href="/guides/" className="hover:text-slate-950">
              Guides
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free online calculators
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Calculators
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Free calculators for salary conversions, freelance pricing,
            project estimates, and income planning. No signup required.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {calculators.map((calculator) => (
            <a
              key={calculator.href}
              href={calculator.href}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-400 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {calculator.label}
              </p>

              <h2 className="mt-2 text-xl font-bold group-hover:text-blue-700">
                {calculator.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {calculator.description}
              </p>

              <span className="mt-5 inline-flex font-semibold text-blue-700">
                Open calculator →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            What can you calculate with SoloTools?
          </h2>

          <div className="mt-7 space-y-6 text-slate-600">
            <p className="leading-7">
              SoloTools provides browser-based calculators designed to make
              common work, salary, and freelance calculations easier to
              understand.
            </p>

            <p className="leading-7">
              You can convert salary to hourly pay, estimate a freelance hourly
              rate, calculate a project price, and plan expected freelance
              income using simple adjustable inputs.
            </p>

            <p className="leading-7">
              More calculators will be added over time for everyday finance,
              percentages, dates, business calculations, and other practical
              tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-2xl font-bold">
          Need help with freelance pricing?
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Browse practical guides covering freelance rates, billable hours,
          pricing mistakes, project estimates, and income planning.
        </p>

        <a
          href="/guides/"
          className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
        >
          Browse freelance guides →
        </a>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>SoloTools - free practical online tools.</p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/" className="hover:text-slate-900">
              About
            </a>
            <a href="/contact/" className="hover:text-slate-900">
              Contact
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
