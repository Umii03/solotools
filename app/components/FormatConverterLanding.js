import ImageFormatConverter from "./ImageFormatConverter";

export default function FormatConverterLanding({
  title,
  description,
  sourceLabel,
  sourceMime,
  outputLabel,
  outputMime,
  outputExtension,
  qualityEnabled,
  canonicalPath,
  whyText,
  specialNote,
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: `https://solotools-1ou.pages.dev${canonicalPath}`,
    applicationCategory: "MultimediaApplication",
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
          __html: JSON.stringify(structuredData),
        }}
      />

      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a
            href="/"
            aria-label="SoloTools home"
            className="inline-flex items-center"
          >
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <a href="/image-tools/" className="text-slate-950">
              Image Tools
            </a>

            <a href="/calculators/" className="hover:text-slate-950">
              Calculators
            </a>

            <a href="/guides/" className="hover:text-slate-950">
              Guides
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free browser image converter
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>

          <p className="mt-3 text-sm font-medium text-green-700">
            Your image is processed locally in your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ImageFormatConverter
            sourceLabel={sourceLabel}
            sourceMime={sourceMime}
            outputLabel={outputLabel}
            outputMime={outputMime}
            outputExtension={outputExtension}
            qualityEnabled={qualityEnabled}
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            How to convert {sourceLabel} to {outputLabel}
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-600">
                Step 1
              </p>
              <h3 className="mt-2 font-bold">
                Choose your {sourceLabel}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select the image from your device.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-600">
                Step 2
              </p>
              <h3 className="mt-2 font-bold">
                Convert in your browser
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                SoloTools creates the {outputLabel} locally on your device.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-600">
                Step 3
              </p>
              <h3 className="mt-2 font-bold">
                Download the result
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Save the converted {outputLabel} immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold">
          Why convert {sourceLabel} to {outputLabel}?
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          {whyText}
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="font-bold">
            Important format note
          </h3>

          <p className="mt-2 leading-7 text-slate-600">
            {specialNote}
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-7 space-y-6">
            <div>
              <h3 className="text-lg font-bold">
                Is this {sourceLabel} to {outputLabel} converter free?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. The converter is free to use and does not require an account.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Is my image uploaded to SoloTools?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                The supported conversion is performed locally by your browser
                rather than sending the image to SoloTools for conversion.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Will the image dimensions change?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                No. This format converter keeps the original pixel dimensions.
                Use the Image Resizer if you also want to change width or height.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-2xl font-bold">
          More Image Tools
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <a
            href="/image-converter/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Image Converter
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Convert between JPG, PNG, and WebP.
            </p>
          </a>

          <a
            href="/image-compressor/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Image Compressor
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reduce image file size in your browser.
            </p>
          </a>

          <a
            href="/image-resizer/"
            className="rounded-2xl border border-slate-200 p-5 hover:border-slate-400"
          >
            <h3 className="font-bold">
              Image Resizer
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Change image width and height.
            </p>
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>SoloTools - free practical online tools.</p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/" className="hover:text-slate-900">
              About
            </a>
            <a href="/contact/" className="hover:text-slate-900">
              Contact
            </a>
            <a href="/privacy-policy/" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms/" className="hover:text-slate-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
