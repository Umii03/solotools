import PdfToolkitClient from "./PdfToolkitClient";

export default function PdfToolPage({
  title,
  description,
  canonicalPath,
  mode,
  imageType = "all",
  infoTitle,
  infoText,
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `https://solotools-1ou.pages.dev${canonicalPath}`,
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
            <a
              href="/pdf-tools/"
              className="text-slate-950"
            >
              PDF Tools
            </a>

            <a
              href="/image-tools/"
              className="hover:text-slate-950"
            >
              Image Tools
            </a>

            <a
              href="/calculators/"
              className="hover:text-slate-950"
            >
              Calculators
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free browser PDF tool
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>

          <p className="mt-3 text-sm font-semibold text-green-700">
            Files are processed locally in your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <PdfToolkitClient
            mode={mode}
            imageType={imageType}
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
          Related PDF Tools
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <a
            href="/merge-pdf/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Merge PDF
            </h3>
          </a>

          <a
            href="/split-pdf/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Split PDF
            </h3>
          </a>

          <a
            href="/images-to-pdf/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Images to PDF
            </h3>
          </a>
        </div>

        <a
          href="/pdf-tools/"
          className="mt-6 inline-flex font-semibold text-blue-700 hover:underline"
        >
          Browse all PDF Tools -&gt;
        </a>
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
