export const metadata = {
  title: "Contact SoloTools",
  description:
    "Contact SoloTools with feedback, bug reports or suggestions for new freelancer tools.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Nav />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-semibold text-blue-600">CONTACT</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Contact SoloTools
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Found a bug, have feedback, or want to suggest a useful calculator?
          We would like to hear from you.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            GitHub
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            You can contact us through the SoloTools GitHub repository by
            opening an issue.
          </p>

          <a
            href="https://github.com/Umii03/solotools/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Open a GitHub Issue
          </a>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Please do not post passwords, financial account information or
            other sensitive personal information in a public GitHub issue.
          </p>
        </div>
      </section>

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
