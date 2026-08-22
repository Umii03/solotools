export default function Home() {
  const tools = [
    {
      symbol: "$",
      title: "Freelance Hourly Rate Calculator",
      description:
        "Calculate how much you should charge per hour based on your income goal, expenses, taxes and billable hours.",
      href: "/freelance-hourly-rate-calculator/",
    },
    {
      symbol: "P",
      title: "Project Price Calculator",
      description:
        "Estimate a profitable project price using your hourly rate, project hours, expenses and desired profit margin.",
      href: "/project-price-calculator/",
    },
    {
      symbol: "I",
      title: "Freelance Income Calculator",
      description:
        "Estimate monthly and yearly freelance income using your rate, billable hours, expenses and taxes.",
      href: "/freelance-income-calculator/",
    },
  ];

  const guides = [
    {
      title: "How Much Should I Charge as a Freelancer?",
      href: "/how-much-should-i-charge-as-a-freelancer/",
    },
    {
      title: "Hourly Rate vs Fixed Project Pricing",
      href: "/hourly-vs-fixed-project-pricing/",
    },
    {
      title: "What Are Billable Hours for Freelancers?",
      href: "/billable-hours-for-freelancers/",
    },
  ];

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

          <div className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#tools">Tools</a>
            <a href="/guides/">Guides</a>
            <a href="/about/">About</a>
          </div>
        </div>
      </nav>

      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            100% Free Tools for Freelancers
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Simple tools to help you
            <span className="text-blue-600"> earn smarter.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Free calculators and practical guides for freelancers, consultants,
            creators and independent professionals.
          </p>

          <a
            href="#tools"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Explore Free Tools
          </a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-2xl font-bold">Free</p>
            <p className="text-sm text-slate-500">No subscriptions</p>
          </div>

          <div>
            <p className="text-2xl font-bold">Instant</p>
            <p className="text-sm text-slate-500">Browser-based calculators</p>
          </div>

          <div>
            <p className="text-2xl font-bold">No Signup</p>
            <p className="text-sm text-slate-500">Use tools immediately</p>
          </div>
        </div>
      </section>

      <section id="tools" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-blue-600">FREE CALCULATORS</p>
          <h2 className="mt-2 text-3xl font-bold">
            Tools for independent professionals
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600">
                  {tool.symbol}
                </div>

                <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  AVAILABLE NOW
                </p>

                <h3 className="text-xl font-bold">{tool.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {tool.description}
                </p>

                <p className="mt-5 font-semibold text-blue-600">
                  Use Calculator →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-blue-600">
            FREELANCE GUIDES
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Learn the numbers behind freelancing
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Practical guides explaining pricing, billable time and freelance
            business decisions.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <a
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-400 hover:shadow-sm"
              >
                <p className="text-sm font-semibold text-blue-600">
                  GUIDE
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  {guide.title}
                </h3>

                <p className="mt-5 font-semibold text-blue-600">
                  Read Guide →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold">
            Built for freelancers who want clearer numbers
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            SoloTools combines simple calculators with practical explanations
            so you can understand how rates, expenses, billable time and
            project pricing affect your freelance business.
          </p>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5">
          <p>© 2026 SoloTools.</p>

          <div className="flex flex-wrap gap-5">
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
            <a href="/privacy-policy/">Privacy Policy</a>
            <a href="/terms/">Terms</a>
          </div>
        </div>
      </footer>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            New calculator
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Salary to Hourly Calculator
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Convert annual salary to hourly pay or calculate an estimated
            annual salary from an hourly rate.
          </p>
          <a
            href="/salary-to-hourly-calculator/"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
          >
            Open Salary to Hourly Calculator
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Browse all tools
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Free Online Calculators
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Explore salary, freelance pricing, project cost, and income
            calculators in one place.
          </p>
          <a
            href="/calculators/"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
          >
            Browse all calculators →
          </a>
        </div>
      </section>
</main>
  );
}
