import {
  categoryInfo,
  toolsByCategory,
} from "../lib/toolRegistry";

export default function ToolCategoryHub({
  category,
  eyebrow,
  title,
  description,
  privacyText,
}) {
  const tools =
    toolsByCategory(category);

  const categoryData =
    categoryInfo[category];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url:
      `https://solotools-1ou.pages.dev${categoryData.href}`,
    description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems:
        tools.length,
      itemListElement:
        tools.map(
          (tool, index) => ({
            "@type": "ListItem",
            position:
              index + 1,
            name:
              tool.title,
            url:
              `https://solotools-1ou.pages.dev${tool.href}`,
          })
        ),
    },
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
            <a href="/tools/">
              All Tools
            </a>

            <a href="/calculators/">
              Calculators
            </a>

            <a href="/image-tools/">
              Images
            </a>

            <a href="/pdf-tools/">
              PDF
            </a>

            <a href="/text-tools/">
              Text
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {eyebrow}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {description}
          </p>

          {privacyText && (
            <p className="mt-3 text-sm font-semibold text-green-700">
              {privacyText}
            </p>
          )}

          <p className="mt-3 text-sm text-slate-500">
            {tools.length} tools available.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-400 hover:bg-white"
            >
              <h2 className="text-xl font-bold">
                {tool.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-5 inline-flex font-semibold text-blue-700">
                Open tool -&gt;
              </span>
            </a>
          ))}
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