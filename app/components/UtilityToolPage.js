import UtilityToolkitClient from "./UtilityToolkitClient";

export default function UtilityToolPage({
  title,
  description,
  canonicalPath,
  mode,
  section,
  infoTitle,
  infoText,
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url:
      `https://solotools-1ou.pages.dev${canonicalPath}`,
    applicationCategory:
      "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a
            href="/"
            aria-label="SoloTools home"
          >
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <a href="/text-tools/">
              Text Tools
            </a>

            <a href="/developer-tools/">
              Developer Tools
            </a>

            <a href="/pdf-tools/">
              PDF Tools
            </a>

            <a href="/image-tools/">
              Image Tools
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {section}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>

          <p className="mt-3 text-sm font-semibold text-green-700">
            Processing happens locally in your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <UtilityToolkitClient
            mode={mode}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            {infoTitle}
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            {infoText}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-2xl font-bold">
          More SoloTools
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="/text-tools/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Text Tools
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Counters and text conversion utilities.
            </p>
          </a>

          <a
            href="/developer-tools/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Developer Tools
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              JSON, Base64, URL, UUID, and QR utilities.
            </p>
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>
            SoloTools - free practical online tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/">
              About
            </a>

            <a href="/contact/">
              Contact
            </a>

            <a href="/privacy-policy/">
              Privacy
            </a>

            <a href="/terms/">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
