export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold tracking-tight">
            Solo<span className="text-blue-600">Tools</span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#tools" className="hover:text-blue-600">Tools</a>
            <a href="#about" className="hover:text-blue-600">About</a>
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
            <p className="text-2xl font-bold">Free</p>
            <p className="mt-1 text-sm text-slate-500">No subscriptions</p>
          </div>

          <div>
            <p className="text-2xl font-bold">Instant</p>
            <p className="mt-1 text-sm text-slate-500">Results in your browser</p>
          </div>

          <div>
            <p className="text-2xl font-bold">Private</p>
            <p className="mt-1 text-sm text-slate-500">No account required</p>
          </div>
        </div>
      </section>

      <section id="tools" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="font-semibold text-blue-600">FREE TOOLS</p>

            <h2 className="mt-2 text-3xl font-bold">
              Tools for independent professionals
            </h2>

            <p className="mt-3 text-slate-600">
              Free tools to help freelancers price their work and manage their business.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="/freelance-hourly-rate-calculator/"
              className="block rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600">
                $
              </div>

              <div className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                AVAILABLE NOW
              </div>

              <h3 className="text-xl font-bold">
                Freelance Hourly Rate Calculator
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Calculate how much you should charge per hour based on your
                income goal, expenses, taxes and billable hours.
              </p>

              <p className="mt-5 font-semibold text-blue-600">
                Use Calculator →
              </p>
            </a>

            <a
              href="/project-price-calculator/"
              className="block rounded-2xl border border-blue-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-600">
                P
              </div>

              <div className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                AVAILABLE NOW
              </div>

              <h3 className="text-xl font-bold">
                Project Price Calculator
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Estimate a profitable project price using your hourly rate,
                project hours, expenses and desired profit margin.
              </p>

              <p className="mt-5 font-semibold text-blue-600">
                Use Calculator →
              </p>
            </a>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl font-bold">
                I
              </div>

              <div className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                COMING SOON
              </div>

              <h3 className="text-xl font-bold">
                Freelance Income Calculator
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Convert your hourly rate and billable workload into estimated
                monthly and yearly income.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Why SoloTools?</h2>

          <p className="mt-5 leading-8 text-slate-300">
            Freelancers should not need expensive software for simple business
            calculations. SoloTools provides fast, useful and completely free
            tools that help independent professionals make better financial
            decisions.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 SoloTools. Free tools for independent professionals.
      </footer>
    </main>
  );
}
