import WebToolkitClient from "./WebToolkitClient";

export default function WebToolkitPage({
  title,
  description,
  canonicalPath,
  mode,
}) {
  const schema = {
    "@context":
      "https://schema.org",
    "@type":
      "WebApplication",
    name:
      title,
    description,
    url:
      "https://solotools-1ou.pages.dev" +
      canonicalPath,
    applicationCategory:
      "UtilitiesApplication",
    operatingSystem:
      "Any",
    offers: {
      "@type":
        "Offer",
      price:
        "0",
      priceCurrency:
        "USD",
    },
  };

  const downloader =
    mode ===
    "image-downloader";

  return (
    <main className="min-h-screen bg-white text-slate-900">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema
            ),
        }}
      />

      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">

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

          <nav className="flex flex-wrap gap-4 pr-14 text-sm font-semibold text-slate-600">

            <a href="/web-tools/">
              Web Tools
            </a>

            <a href="/tools/">
              All Tools
            </a>

            <a href="/">
              Home
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Free Web Tool
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>

          {downloader ? (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-800">
              Direct image URLs only. Remote websites may block browser access through CORS or hotlink protection.
            </p>
          ) : (
            <p className="mt-3 text-sm font-semibold text-green-700">
              This utility runs directly in your browser.
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <WebToolkitClient
            mode={mode}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">

          <h2 className="text-3xl font-bold">
            Free website utility
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            SoloTools provides simple browser-based website utilities without requiring an account or software installation.
          </p>

          <a
            href="/web-tools/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
          >
            Browse Web Tools
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
