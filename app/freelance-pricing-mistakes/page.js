export const metadata = {
  title: "Common Freelance Pricing Mistakes",
  description:
    "Learn common freelance pricing mistakes and how to avoid undercharging, scope creep and unrealistic project estimates.",
  alternates: {
    canonical: "/freelance-pricing-mistakes/",
  },
};

export default function Page() {
  return (
    <Article
      label="FREELANCE PRICING"
      title="Common Freelance Pricing Mistakes"
    >
      <Intro>
        Pricing mistakes can make a busy freelance business surprisingly
        unprofitable. A rate that looks reasonable at first may not cover
        expenses, non-billable work or unexpected project changes.
      </Intro>

      <Section title="1. Copying someone else's rate">
        Another freelancer may have different expenses, experience, workload,
        tax situation and clients. Competitor prices can provide context, but
        your own numbers should still be part of the decision.
      </Section>

      <Section title="2. Treating every working hour as billable">
        Freelancers also spend time on proposals, marketing, bookkeeping,
        communication and administration. If your rate assumes every working
        hour will be invoiced, your yearly revenue estimate can be too high.
      </Section>

      <Section title="3. Forgetting business expenses">
        Software, equipment, payment fees, contractors and other operating
        expenses reduce the amount of revenue that becomes personal income.
      </Section>

      <Section title="4. Quoting projects without a contingency">
        A small amount of unexpected work can erase the profit from a project.
        A reasonable contingency buffer helps account for uncertainty.
      </Section>

      <Section title="5. Allowing unlimited revisions">
        Fixed project pricing works best when the scope is clear. Define what
        is included and explain how additional work will be priced.
      </Section>

      <Section title="6. Never reviewing your rates">
        Your skills, demand and expenses change over time. Review your pricing
        periodically instead of using the same rate indefinitely.
      </Section>

      <Cta
        href="/freelance-hourly-rate-calculator/"
        title="Check your hourly rate"
        text="Use the free SoloTools calculator to estimate a rate based on your own income goal and billable time."
      />
    </Article>
  );
}

function Intro({ children }) {
  return <p className="mt-6 text-lg leading-8 text-slate-600">{children}</p>;
}

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 leading-8 text-slate-600">{children}</p>
    </section>
  );
}

function Cta({ href, title, text }) {
  return (
    <div className="mt-12 rounded-2xl bg-blue-50 p-7">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
      <a
        href={href}
        className="mt-5 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Open Calculator
      </a>
    </div>
  );
}

function Article({ label, title, children }) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">{label}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {children}
        <Back />
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
        <a href="/guides/" className="text-sm text-slate-600">
          All Guides
        </a>
      </div>
    </nav>
  );
}

function Back() {
  return (
    <div className="mt-12 border-t border-slate-200 pt-8">
      <a href="/guides/" className="font-semibold text-blue-600">
        ← View all freelance guides
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto max-w-6xl">© 2026 SoloTools.</div>
    </footer>
  );
}
