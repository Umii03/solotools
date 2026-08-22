export const metadata = {
  title: "Free Online Developer Tools",
  description:
    "Free browser-based developer utilities for JSON, Base64, URL encoding, UUID generation, and QR codes.",
  alternates: {
    canonical: "/developer-tools/",
  },
  openGraph: {
    title: "Free Online Developer Tools | SoloTools",
    description:
      "JSON, URL, Base64, UUID, and QR code utilities.",
    url:
      "https://solotools-1ou.pages.dev/developer-tools/",
    type: "website",
  },
};

const tools = [
  {
    title: "JSON Formatter & Validator",
    href: "/json-formatter/",
    description:
      "Format, minify, and validate JSON.",
  },
  {
    title: "URL Encoder & Decoder",
    href: "/url-encoder-decoder/",
    description:
      "Encode and decode URL components.",
  },
  {
    title: "Base64 Encoder & Decoder",
    href: "/base64-encoder-decoder/",
    description:
      "Encode text to Base64 or decode Base64 text.",
  },
  {
    title: "UUID Generator",
    href: "/uuid-generator/",
    description:
      "Generate random UUID version 4 identifiers.",
  },
  {
    title: "QR Code Generator",
    href: "/qr-code-generator/",
    description:
      "Create downloadable QR codes from URLs or text.",
  },
];

export default function DeveloperToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      "SoloTools Developer Tools",
    url:
      "https://solotools-1ou.pages.dev/developer-tools/",
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
            <a href="/text-tools/">
              Text Tools
            </a>

            <a
              href="/developer-tools/"
              className="text-slate-950"
            >
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
            Free browser utilities
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Developer Tools
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Format, encode, decode, generate, and inspect common development data directly in your browser.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
