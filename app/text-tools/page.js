export const metadata = {
  title: "Free Online Text Tools",
  description:
    "Free online tools for counting words and characters and converting text case directly in your browser.",
  alternates: {
    canonical: "/text-tools/",
  },
  openGraph: {
    title: "Free Online Text Tools | SoloTools",
    description:
      "Word counter, character counter, and case converter tools.",
    url:
      "https://solotools-1ou.pages.dev/text-tools/",
    type: "website",
  },
};

const tools = [
  {
    title: "Word Counter",
    href: "/word-counter/",
    description:
      "Count words, sentences, paragraphs, and reading time.",
  },
  {
    title: "Character Counter",
    href: "/character-counter/",
    description:
      "Count characters with or without spaces and check line totals.",
  },
  {
    title: "Case Converter",
    href: "/case-converter/",
    description:
      "Convert text between writing and programming case styles.",
  },
];

export default function TextToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SoloTools Text Tools",
    url:
      "https://solotools-1ou.pages.dev/text-tools/",
    mainEntity: {
      "@type": "ItemList",
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
            JSON.stringify(
              structuredData
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
              href="/text-tools/"
              className="text-slate-950"
            >
              Text Tools
            </a>

            <a href="/developer-tools/">
              Developer Tools
            </a>

            <a href="/pdf-tools/">
              PDF Tools
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free writing utilities
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Text Tools
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Count, inspect, and convert text directly in your browser.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 hover:border-slate-400 hover:bg-white"
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
    </main>
  );
}
