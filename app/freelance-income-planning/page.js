export const metadata = {
  title: "Freelance Income Planning Guide",
  description:
    "Learn how to plan freelance income using rates, billable workload, expenses, taxes and time off.",
  alternates: {
    canonical: "/freelance-income-planning/",
  },
};

export default function Page() {
  return (
    <Article title="Freelance Income Planning Guide">
      <p className="mt-6 text-lg leading-8 text-slate-600">
        Freelance income can vary from month to month. A simple yearly plan can
        help you understand how much client work you need to support your goals.
      </p>

      <Section title="Estimate yearly client revenue">
        Multiply your expected billable workload by your average rate. If you
        use project pricing, estimate an average monthly or yearly project
        total instead.
      </Section>

      <Section title="Subtract business expenses">
        Revenue is not the same as personal income. Include recurring and
        occasional business costs in your plan.
      </Section>

      <Section title="Plan for taxes">
        Tax rules vary, but setting aside an estimated percentage can make your
        take-home projection more realistic.
      </Section>

      <Section title="Account for inconsistent months">
        Some months may be busy while others are slower. Yearly planning helps
        avoid assuming that every month will generate identical revenue.
      </Section>

      <Section title="Create a minimum income target">
        Knowing the minimum revenue your business needs each month can help you
        decide whether your current workload and prices are sustainable.
      </Section>

      <a
        href="/freelance-income-calculator/"
        className="mt-10 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Open Income Calculator
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
        <p className="font-semibold text-blue-600">INCOME PLANNING</p>
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
