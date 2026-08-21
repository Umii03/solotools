export const metadata = {
  title: "Terms of Use",
  description:
    "Read the terms governing use of the free calculators and information provided by SoloTools.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Terms of Use
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: August 21, 2026
        </p>

        <p className="mt-8 leading-8 text-slate-600">
          By using SoloTools, you agree to these Terms of Use. If you do not
          agree with these terms, please discontinue use of the website.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Informational purposes
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          SoloTools calculators and content are provided for general
          informational and planning purposes. They do not constitute
          financial, accounting, tax, legal or other professional advice.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Accuracy of calculations
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          We aim to provide useful calculations, but results depend on the
          information entered and simplified assumptions. We do not guarantee
          that every result will be accurate or appropriate for every
          situation.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Your decisions
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          You are responsible for reviewing calculator results and deciding
          whether they are suitable for your circumstances before making
          business or financial decisions.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Availability
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          We may modify, improve, remove or discontinue tools or website
          features at any time. We do not guarantee uninterrupted availability.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Acceptable use
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          You may use SoloTools for lawful personal and business purposes. You
          may not intentionally interfere with the website, attempt to bypass
          security controls or use the service for unlawful activity.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Changes
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          These Terms may be updated as the website changes. Continued use of
          SoloTools after an update means you accept the revised Terms.
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
