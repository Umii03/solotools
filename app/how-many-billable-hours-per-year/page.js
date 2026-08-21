export const metadata = {
  title: "How Many Billable Hours Are in a Year?",
  description:
    "Estimate realistic yearly billable hours for freelancers after vacation, administration and non-billable business work.",
  alternates: {
    canonical: "/how-many-billable-hours-per-year/",
  },
};

export default function Page() {
  return (
    <Article title="How Many Billable Hours Are in a Year?">
      <p className="mt-6 text-lg leading-8 text-slate-600">
        A full-time schedule might contain around two thousand working hours in
        a year, but freelancers normally cannot invoice clients for all of
        them.
      </p>

      <Section title="Start with working weeks">
        A year has 52 weeks. Subtract vacation, holidays and other planned time
        away from work to estimate your available working weeks.
      </Section>

      <Section title="Then estimate weekly working hours">
        Multiply working weeks by your normal weekly schedule. This gives total
        available working hours before separating billable and non-billable
        work.
      </Section>

      <Section title="Apply a realistic billable percentage">
        If sixty percent of your time is directly billable to clients, multiply
        available working hours by 0.60.
      </Section>

      <div className="mt-8 rounded-2xl bg-blue-50 p-7">
        <p className="font-bold">Example</p>
        <p className="mt-3 leading-7 text-slate-700">
          48 working weeks × 40 hours = 1,920 available hours.
          At 60% billable utilization, that becomes approximately
          1,152 billable hours per year.
        </p>
      </div>

      <Section title="Why this number matters">
        Your billable-hour estimate affects pricing. If your business needs
        $90,000 in yearly revenue and you have 1,200 billable hours, those hours
        need to generate an average of $75 each.
      </Section>

      <a
        href="/freelance-hourly-rate-calculator/"
        className="mt-10 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Calculate Your Freelance Rate
      </a>
    </Article>
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

function Article({ title, children }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">BILLABLE HOURS GUIDE</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {children}
      </article>
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/">
          <img src="/solotools-logo.png" alt="SoloTools" className="h-9 w-auto" />
        </a>
        <a href="/guides/" className="text-sm text-slate-600">All Guides</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto max-w-6xl">© 2026 SoloTools.</div>
    </footer>
  );
}
