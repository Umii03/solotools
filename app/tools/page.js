import {
  categoryInfo,
  toolCategories,
  toolRegistry,
  toolsByCategory,
} from "../lib/toolRegistry";

export default function ToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      "SoloTools - All Tools",
    url:
      "https://solotools-1ou.pages.dev/tools/",
    description:
      "A directory of free calculators and browser-based utilities.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems:
        toolRegistry.length,
      itemListElement:
        toolRegistry.map(
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
            JSON.stringify(
              schema
            ),
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
            <a
              href="/tools/"
              className="text-slate-950"
            >
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

            <a href="/guides/">
              Guides
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            SoloTools directory
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            All Free Online Tools
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Browse {toolRegistry.length} working calculators and browser-based utilities.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {toolCategories.map(
            (category) => {
              const info =
                categoryInfo[
                  category
                ];

              const tools =
                toolsByCategory(
                  category
                );

              return (
                <section
                  key={category}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {info.name}
                      </h2>

                      <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                        {info.description}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {tools.length} tools
                      </p>
                    </div>

                    <a
                      href={info.href}
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      Category page -&gt;
                    </a>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map(
                      (tool) => (
                        <a
                          key={tool.href}
                          href={tool.href}
                          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold hover:border-slate-400 hover:text-blue-700"
                        >
                          {tool.title}
                        </a>
                      )
                    )}
                  </div>
                </section>
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}