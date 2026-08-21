export const metadata = {
  title: "What Are Billable Hours for Freelancers?",
  description:
    "Learn what billable hours are, which freelance tasks are usually non-billable and how billable utilization affects your hourly rate.",
  alternates: {
    canonical: "/billable-hours-for-freelancers/",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">FREELANCE BUSINESS GUIDE</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          What Are Billable Hours for Freelancers?
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Billable hours are the hours you can directly charge to a client.
          Understanding the difference between billable and non-billable time
          is important when setting freelance rates.
        </p>

        <Section title="Examples of billable work">
          Depending on your agreement, billable work might include design,
          development, writing, consulting, research, client meetings or other
          tasks directly connected to delivering the client's project.
        </Section>

        <Section title="Examples of non-billable work">
          Marketing your services, preparing proposals, bookkeeping, updating
          your portfolio, professional development and general administration
          are often non-billable.
        </Section>

        <Section title="Why this matters for your hourly rate">
          If you work 40 hours per week, that does not necessarily mean you can
          invoice clients for 40 hours. If only 24 hours are billable, those 24
          hours must generate enough revenue to support the entire business.
        </Section>

        <Section title="Billable utilization">
          Billable utilization is the percentage of your available working time
          that is actually billable to clients.
        </Section>

        <div className="mt-6 rounded-2xl bg-blue-50 p-6 text-blue-900">
          <p className="font-semibold">Example</p>
          <p className="mt-3 leading-7">
            If you work 40 hours in a week and bill clients for 24 hours, your
            billable utilization is 60%.
          </p>
        </div>

        <Section title="Higher utilization is not always better">
          Trying to bill every working hour can leave no time for sales,
          administration or improving your business. The goal is to use a
          realistic estimate when planning your rates.
        </Section>

        <Section title="Use billable hours when calculating your rate">
          Your minimum freelance rate should generally be based on the hours
          you realistically expect to bill, not every hour that you are
          available for work.
        </Section>

        <div className="mt-12 rounded-2xl border border-blue-200 p-8">
          <h2 className="text-2xl font-bold">
            See how billable time changes your rate
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Our hourly rate calculator lets you change your billable percentage
            and instantly see how it affects the rate your business needs.
          </p>

          <a
            href="/freelance-hourly-rate-calculator/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Open Hourly Rate Calculator
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
        <a href="/" aria-label="SoloTools home" className="inline-flex items-center">
  <img
    src="/solotools-logo.png"
    alt="SoloTools"
    className="h-9 w-auto sm:h-10"
  />
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

