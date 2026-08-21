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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Solo<span className="text-blue-600">Tools</span>
          </a>

          <div className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#tools" className="hover:text-blue-600">
              Tools
            </a>
            <a href="/about/" className="hover:text-blue-600">
              About
            </a>
            <a href="/contact/" className="hover:text-blue-600">
              Contact
            </a>
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
            Free calculators and business tools for freelancers, consultants,
            creators and independent professionals. No signup. No subscriptions.
          </p>

          <a
            href="#tools"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Free Tools
          </a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-2xl font-bold">100% Free</p>
            <p className="mt-1 text-sm text-slate-500">
              No subscriptions
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">Instant</p>
            <p className="mt-1 text-sm text-slate-500">
              Results in your browser
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">No Signup</p>
            <p className="mt-1 text-sm text-slate-500">
              Start using tools immediately
            </p>
          </div>
        </div>
      </section>

      <section id="tools" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="font-semibold text-blue-600">
              FREE TOOLS
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Tools for independent professionals
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Plan your rates, quote projects and estimate freelance income
              using simple calculators built for independent work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="block rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600">
                  {tool.symbol}
                </div>

                <div className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  AVAILABLE NOW
                </div>

                <h3 className="text-xl font-bold">
                  {tool.title}
                </h3>

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

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold text-blue-600">
            BUILT FOR FREELANCERS
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Make business decisions with clearer numbers
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Freelancing involves pricing, planning and trade-offs. SoloTools
            gives you quick estimates so you can understand the numbers behind
            your rates and projects before making a decision.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 SoloTools. Free tools for independent professionals.
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="/about/" className="hover:text-white">
              About
            </a>
            <a href="/contact/" className="hover:text-white">
              Contact
            </a>
            <a href="/privacy-policy/" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms/" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
