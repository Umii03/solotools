export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the SoloTools Privacy Policy and learn how website usage and analytics information may be processed.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold">
            Solo<span className="text-blue-600">Tools</span>
          </a>

          <a href="/" className="text-sm text-slate-600">
            Back to Tools
          </a>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: August 21, 2026
        </p>

        <p className="mt-8 leading-8 text-slate-600">
          SoloTools provides free online calculators, guides and business
          tools. This Privacy Policy explains how information may be processed
          when you use the website.
        </p>

        <Section title="Calculator data">
          Our calculators currently perform calculations directly in your
          browser. You do not need to create an account to use these tools.
        </Section>

        <Section title="Google Analytics">
          SoloTools uses Google Analytics to understand website usage, such as
          page visits, general engagement and which tools are being used.
          Google Analytics may process device, browser, approximate location,
          interaction and similar technical information according to Google's
          applicable policies and settings.
        </Section>

        <Section title="Cookies and similar technologies">
          Analytics and future advertising services may use cookies or similar
          technologies where applicable. Browser settings can be used to
          control or remove cookies. Additional consent mechanisms may also be
          displayed where required.
        </Section>

        <Section title="Hosting and security">
          SoloTools is hosted using Cloudflare services. Cloudflare may process
          technical request and security information necessary to deliver,
          protect and operate the website.
        </Section>

        <Section title="Advertising">
          SoloTools may display advertising in the future, including ads
          provided through Google services. If advertising is enabled, this
          policy may be updated with additional information about advertising
          data and consent choices.
        </Section>

        <Section title="Third-party websites">
          SoloTools may link to external websites. We are not responsible for
          the content or privacy practices of third-party websites.
        </Section>

        <Section title="Changes to this policy">
          We may update this Privacy Policy when the website, analytics,
          advertising or other services change. The date shown above will be
          updated when material changes are made.
        </Section>

        <Section title="Contact">
          Questions or feedback about this Privacy Policy can be submitted
          through the SoloTools Contact page.
        </Section>

        <div className="mt-10">
          <a
            href="/contact/"
            className="font-semibold text-blue-600 hover:underline"
          >
            Contact SoloTools →
          </a>
        </div>
      </article>

      <footer className="bg-slate-950 px-6 py-10 text-sm text-slate-400">
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
