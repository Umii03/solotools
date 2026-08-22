import ImageEditClient from "./ImageEditClient";

export default function ImageEditPage({
  title,
  description,
  canonicalPath,
  mode,
  infoTitle,
  infoText,
}) {
  const schema = {
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
            JSON.stringify(schema),
        }}
      />

      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/">
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
            <a href="/image-tools/">
              Image Tools
            </a>

            <a href="/tools/">
              All Tools
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free browser image tool
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>

          <p className="mt-3 text-sm font-semibold text-green-700">
            Your image is processed locally in your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <ImageEditClient
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
    </main>
  );
}