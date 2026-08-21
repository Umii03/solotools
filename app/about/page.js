export const metadata = {
  title: "About SoloTools",
  description:
    "Learn why SoloTools provides free calculators and practical tools for freelancers and independent professionals.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">ABOUT SOLOTOOLS</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Free tools built for independent work
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          SoloTools is a collection of simple calculators and business tools
          designed for freelancers, consultants, creators and independent
          professionals.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Why we built SoloTools
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Important freelance decisions often require surprisingly simple
          calculations: how much to charge, whether a project is profitable,
          how many billable hours are needed, and how much income a particular
          workload can generate.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          SoloTools makes those calculations easier without requiring an
          account, subscription or complicated software.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          How our calculators work
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Our current calculators run directly in your browser. The numbers
          you enter are used to calculate results instantly. The tools are
          designed for planning and educational purposes and should not replace
          professional financial, legal or tax advice.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Our goal
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          We want SoloTools to become a useful library of free tools covering
          freelance pricing, income planning, project management and everyday
          business calculations.
        </p>
      </article>

      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-bold">
          Solo<span className="text-blue-600">Tools</span>
        </a>
        <a href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
          ← Back to Tools
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
        <p>© 2026 SoloTools.</p>
        <div className="flex flex-wrap gap-5">
          <a href="/about/" className="hover:text-white">About</a>
          <a href="/contact/" className="hover:text-white">Contact</a>
          <a href="/privacy-policy/" className="hover:text-white">Privacy</a>
          <a href="/terms/" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
