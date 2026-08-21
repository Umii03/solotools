export const metadata = {
  title: "How to Estimate a Freelance Project",
  description:
    "Learn how to estimate freelance project time, costs, revisions, contingency and profit before sending a client quote.",
  alternates: {
    canonical: "/how-to-estimate-a-freelance-project/",
  },
};

export default function Page() {
  return (
    <Article title="How to Estimate a Freelance Project">
      <p className="mt-6 text-lg leading-8 text-slate-600">
        A useful project estimate combines scope, expected time, direct costs,
        uncertainty and profit instead of relying on a quick guess.
      </p>

      <Section title="Define the deliverables">
        Write down exactly what the client will receive. Clear deliverables
        make it easier to estimate the work and reduce disagreements later.
      </Section>

      <Section title="Break the project into tasks">
        Estimate major activities separately, such as research, production,
        meetings, testing and revisions.
      </Section>

      <Section title="Add direct expenses">
        Include project-specific costs such as licensed assets, contractors,
        travel or specialist software.
      </Section>

      <Section title="Include revisions and communication">
        Client communication and feedback rounds require time. Include a
        realistic allowance instead of estimating only production work.
      </Section>

      <Section title="Add contingency">
        Projects rarely go exactly as planned. A contingency percentage gives
        your estimate room for reasonable uncertainty.
      </Section>

      <Section title="Check profitability">
        Your final quote should cover the estimated cost of delivering the work
        while leaving enough profit for the project to make business sense.
      </Section>

      <a
        href="/project-price-calculator/"
        className="mt-10 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
      >
        Open Project Price Calculator
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
        <p className="font-semibold text-blue-600">PROJECT PRICING GUIDE</p>
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
