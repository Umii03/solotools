export const metadata = {
  title: "Freelance Guides",
  description:
    "Practical guides about freelance pricing, billable hours, project estimates and income planning.",
  alternates: {
    canonical: "/guides/",
  },
};

const guides = [
  {
    title: "How Much Should I Charge as a Freelancer?",
    description:
      "Learn how income goals, expenses, taxes and billable time affect your freelance rate.",
    href: "/how-much-should-i-charge-as-a-freelancer/",
  },
  {
    title: "Hourly Rate vs Fixed Project Pricing",
    description:
      "Compare hourly and fixed-fee pricing and learn when each approach makes sense.",
    href: "/hourly-vs-fixed-project-pricing/",
  },
  {
    title: "What Are Billable Hours for Freelancers?",
    description:
      "Understand billable utilization and why not every working hour can be charged to clients.",
    href: "/billable-hours-for-freelancers/",
  },
  {
    title: "Common Freelance Pricing Mistakes",
    description:
      "Avoid common pricing problems that can reduce your profit and make projects harder to manage.",
    href: "/freelance-pricing-mistakes/",
  },
  {
    title: "How Many Billable Hours Are in a Year?",
    description:
      "Estimate realistic yearly billable hours after vacation, admin work and non-billable tasks.",
    href: "/how-many-billable-hours-per-year/",
  },
  {
    title: "How to Estimate a Freelance Project",
    description:
      "Create a more realistic project estimate using scope, time, expenses and contingency.",
    href: "/how-to-estimate-a-freelance-project/",
  },
  {
    title: "Freelance Income Planning Guide",
    description:
      "Turn your hourly rate and workload into realistic monthly and yearly income targets.",
    href: "/freelance-income-planning/",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="inline-flex items-center">
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Back to Tools
          </a>
        </div>
      </nav>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-blue-600">FREELANCE GUIDES</p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Practical guides for running a freelance business
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Learn how to price your work, estimate projects, understand
            billable time and plan freelance income using practical examples.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <a
                key={guide.href}
                href={guide.href}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-blue-600">GUIDE</p>

                <h2 className="mt-3 text-2xl font-bold">
                  {guide.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {guide.description}
                </p>

                <p className="mt-5 font-semibold text-blue-600">
                  Read Guide →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5">
          <p>© 2026 SoloTools.</p>

          <div className="flex flex-wrap gap-5">
            <a href="/guides/">Guides</a>
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
            <a href="/privacy-policy/">Privacy</a>
            <a href="/terms/">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
