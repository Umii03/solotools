export const metadata = {
  title: "Hourly Rate vs Fixed Project Pricing",
  description:
    "Compare hourly freelance pricing with fixed project pricing and learn when each model may make more sense.",
  alternates: {
    canonical: "/hourly-vs-fixed-project-pricing/",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">FREELANCE PRICING GUIDE</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Hourly Rate vs Fixed Project Pricing
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Freelancers commonly charge clients either by the hour or by the
          project. Neither approach is automatically better. The right choice
          depends on the scope, risk and predictability of the work.
        </p>

        <Section title="What is hourly pricing?">
          With hourly pricing, the client pays for the amount of billable time
          spent on the work. It is simple to understand and can protect a
          freelancer when the project scope is uncertain.
        </Section>

        <Section title="Advantages of hourly pricing">
          Hourly billing can work well when requirements may change, the client
          wants ongoing help, or it is difficult to estimate the total amount
          of work in advance.
        </Section>

        <Section title="Disadvantages of hourly pricing">
          A fixed hourly rate can limit earning potential. As you become faster
          and more experienced, you may finish the same work in fewer hours and
          therefore earn less unless your hourly rate increases.
        </Section>

        <Section title="What is fixed project pricing?">
          Fixed project pricing means agreeing on a total fee for a defined
          scope of work. The price is based on the project rather than the
          exact number of hours used.
        </Section>

        <Section title="Advantages of project pricing">
          Clients know the expected cost in advance, while freelancers can
          benefit from working efficiently. Project pricing also makes it
          easier to include risk, revisions, expenses and desired profit in one
          quote.
        </Section>

        <Section title="The biggest risk with project pricing">
          Scope creep can make a profitable project unprofitable. A clear
          written scope, revision limits and a process for additional work are
          important when using fixed pricing.
        </Section>

        <Section title="When hourly pricing may be better">
          Consider hourly billing for consulting, maintenance, uncertain
          projects, troubleshooting or open-ended work where the final scope is
          difficult to predict.
        </Section>

        <Section title="When project pricing may be better">
          Fixed pricing can work well when deliverables are clear, you have
          completed similar projects before and you can estimate the effort
          with reasonable confidence.
        </Section>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <a
            href="/freelance-hourly-rate-calculator/"
            className="rounded-2xl border border-blue-200 bg-blue-50 p-6"
          >
            <h2 className="text-xl font-bold">Calculate your hourly rate</h2>
            <p className="mt-3 text-slate-600">
              Estimate the minimum hourly rate your freelance business needs.
            </p>
          </a>

          <a
            href="/project-price-calculator/"
            className="rounded-2xl border border-blue-200 bg-blue-50 p-6"
          >
            <h2 className="text-xl font-bold">Calculate a project price</h2>
            <p className="mt-3 text-slate-600">
              Build a quote using hours, expenses, contingency and profit.
            </p>
          </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 leading-8 text-slate-600">{children}</p>
    </section>
  );
}

function Nav() {
  return (
    <nav className="border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-bold">
          Solo<span className="text-blue-600">Tools</span>
        </a>
        <a href="/" className="text-sm text-slate-600">Back to Tools</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5">
        <p>© 2026 SoloTools.</p>
        <div className="flex flex-wrap gap-5">
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy-policy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </div>
      </div>
    </footer>
  );
}
