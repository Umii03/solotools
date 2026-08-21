export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the SoloTools privacy policy and learn how information may be processed when using our website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Nav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: August 21, 2026
        </p>

        <p className="mt-8 leading-8 text-slate-600">
          SoloTools provides free online calculators and business tools. This
          Privacy Policy explains how information may be handled when you use
          this website.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Calculator data
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Our current calculators perform calculations directly in your
          browser. SoloTools does not require you to create an account to use
          these tools.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Hosting and technical information
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          SoloTools is hosted using Cloudflare services. Like most hosting
          providers, Cloudflare may process technical information such as IP
          addresses, request information and security-related data as necessary
          to deliver and protect the website.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Analytics and advertising
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          SoloTools may use analytics or advertising services in the future,
          including services provided by Google. If advertising is enabled,
          advertising providers may use cookies or similar technologies to
          deliver, measure and personalize ads where permitted.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Third-party links
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Our website may contain links to third-party websites. SoloTools is
          not responsible for the privacy practices or content of external
          websites.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Changes to this policy
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          This Privacy Policy may be updated as SoloTools adds new features,
          analytics, advertising or other services. The updated date shown on
          this page will be changed when material updates are made.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Contact
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Questions about this Privacy Policy can be submitted through our
          Contact page.
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
