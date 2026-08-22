export default function CalculatorsPage() {
  const calculators = [
    {
      title: "Salary to Hourly Calculator",
      description:
        "Convert annual salary to hourly pay or hourly rate to annual salary.",
      href: "/salary-to-hourly-calculator/",
      label: "Salary",
    },
    {
      title: "Percentage Calculator",
      description:
        "Calculate percentages, percentage ratios, increases, and decreases.",
      href: "/percentage-calculator/",
      label: "Everyday",
    },
    {
      title: "Discount Calculator",
      description:
        "Calculate sale discounts, savings, and final prices.",
      href: "/discount-calculator/",
      label: "Shopping",
    },
    {
      title: "Profit Margin Calculator",
      description:
        "Calculate profit, margin percentage, and markup.",
      href: "/profit-margin-calculator/",
      label: "Business",
    },
    {
      title: "Loan Calculator",
      description:
        "Estimate monthly payments, total repayment, and interest.",
      href: "/loan-calculator/",
      label: "Finance",
    },
    {
      title: "Age Calculator",
      description:
        "Calculate age in years, months, days, and total elapsed days.",
      href: "/age-calculator/",
      label: "Date",
    },
    {
      title: "Date Difference Calculator",
      description:
        "Find the number of days, weeks, and hours between two dates.",
      href: "/date-difference-calculator/",
      label: "Date",
    },
    {
      title: "VAT Calculator",
      description:
        "Add VAT to net prices or extract VAT from gross amounts.",
      href: "/vat-calculator/",
      label: "Business",
    },
    {
      title: "Freelance Hourly Rate Calculator",
      description:
        "Estimate a sustainable freelance hourly rate from income goals and billable time.",
      href: "/freelance-hourly-rate-calculator/",
      label: "Freelance",
    },
    {
      title: "Project Price Calculator",
      description:
        "Estimate a profitable freelance project price from hours, costs, and margin.",
      href: "/project-price-calculator/",
      label: "Freelance",
    },
    {
      title: "Freelance Income Calculator",
      description:
        "Estimate freelance revenue, expenses, taxes, and take-home income.",
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
          >
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <a
              href="/calculators/"
              className="text-slate-950"
            >
              Calculators
            </a>

            <a href="/image-tools/">
              Image Tools
            </a>

            <a href="/pdf-tools/">
              PDF Tools
            </a>

            <a href="/text-tools/">
              Text Tools
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
            Free calculators for salary, percentages, discounts, loans,
            dates, VAT, business margins, and freelance planning.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map(
            (calculator) => (
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
                  Open calculator -&gt;
                </span>
              </a>
            )
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            Practical calculators for everyday tasks
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            SoloTools combines everyday calculators with specialized
            freelance tools. Calculations run directly in the browser and
            do not require an account.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>
            SoloTools - free practical online tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/">
              About
            </a>

            <a href="/contact/">
              Contact
            </a>

            <a href="/privacy-policy/">
              Privacy
            </a>

            <a href="/terms/">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
