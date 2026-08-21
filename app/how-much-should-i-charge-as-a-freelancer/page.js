export const metadata = {
  title: "How Much Should I Charge as a Freelancer?",
  description:
    "Learn how to calculate a freelance rate using income goals, expenses, taxes, billable hours and experience.",
  alternates: {
    canonical: "/how-much-should-i-charge-as-a-freelancer/",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">FREELANCE PRICING GUIDE</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          How Much Should I Charge as a Freelancer?
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          A good freelance rate needs to cover more than the salary you want to
          earn. It also needs to account for business expenses, taxes,
          non-billable work and time away from work.
        </p>

        <Section title="Start with your income goal">
          Decide how much money you would like to keep after normal business
          costs and estimated taxes. This gives you a realistic target instead
          of choosing an hourly rate randomly.
        </Section>

        <Section title="Add your business expenses">
          Freelancers may need to pay for software, equipment, internet,
          accounting, marketing, payment processing and other operating costs.
          These expenses need to be covered by client revenue.
        </Section>

        <Section title="Remember that not every hour is billable">
          A freelancer may spend time answering emails, finding clients,
          preparing proposals, doing bookkeeping and managing projects. Those
          hours are real work, but they are often not directly billed to a
          client.
        </Section>

        <Section title="Account for time off">
          Employees may receive paid vacation, holidays and sick leave.
          Freelancers usually need to build the cost of unpaid time off into
          their rates.
        </Section>

        <Section title="A simple freelance rate formula">
          A practical starting point is to estimate the yearly revenue your
          business needs and divide it by the number of billable hours you
          expect to sell during the year.
        </Section>

        <div className="mt-6 rounded-2xl bg-blue-50 p-6">
          <p className="font-semibold text-blue-900">
            Basic formula
          </p>
          <p className="mt-3 text-lg text-blue-900">
            Required yearly revenue / yearly billable hours = minimum hourly rate
          </p>
        </div>

        <Section title="Example">
          Suppose you need $75,000 in yearly business revenue and expect to
          have 1,200 billable hours. Dividing $75,000 by 1,200 gives a minimum
          rate of $62.50 per billable hour.
        </Section>

        <Section title="Your market still matters">
          A calculated minimum rate is only one part of pricing. Your skills,
          portfolio, experience, demand, specialization, client type and the
          value of the work can justify charging more.
        </Section>

        <Section title="Hourly pricing is not always the best choice">
          Some projects are easier to price as a fixed fee. When you become
          faster or more experienced, hourly pricing can sometimes punish
          efficiency. Project pricing lets you focus more on the value and
          scope of the work.
        </Section>

        <div className="mt-12 rounded-2xl border border-blue-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-bold">
            Calculate your own rate
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Use the SoloTools calculator to estimate your minimum freelance
            hourly rate based on your income goal, expenses, taxes and
            available billable time.
          </p>

          <a
            href="/freelance-hourly-rate-calculator/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Open Hourly Rate Calculator
          </a>
        </div>

        <Related />
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

function Related() {
  return (
    <section className="mt-14 border-t border-slate-200 pt-10">
      <h2 className="text-2xl font-bold">Related resources</h2>

      <div className="mt-5 grid gap-4">
        <a
          href="/hourly-vs-fixed-project-pricing/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          Hourly Rate vs Fixed Project Pricing
        </a>

        <a
          href="/billable-hours-for-freelancers/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          What Are Billable Hours for Freelancers?
        </a>

        <a
          href="/project-price-calculator/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          Project Price Calculator
        </a>
      </div>
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
        <a href="/" className="text-sm font-medium text-slate-600">
          Back to Tools
        </a>
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
