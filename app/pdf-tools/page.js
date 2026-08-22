export const metadata = {
  title: "Free Online PDF Tools",
  description:
    "Free browser-based PDF tools to merge, split, rotate, reorder, extract pages, inspect PDFs, and convert JPG or PNG images to PDF.",
  alternates: {
    canonical: "/pdf-tools/",
  },
  openGraph: {
    title: "Free Online PDF Tools | SoloTools",
    description:
      "Merge, split, rotate, reorder, inspect, and create PDFs directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/pdf-tools/",
    type: "website",
  },
};

const tools = [
  {
    title: "Merge PDF",
    href: "/merge-pdf/",
    description:
      "Combine multiple PDFs into one document.",
  },
  {
    title: "Split PDF",
    href: "/split-pdf/",
    description:
      "Split one PDF into two separate files.",
  },
  {
    title: "Extract PDF Pages",
    href: "/extract-pdf-pages/",
    description:
      "Create a new PDF from selected pages.",
  },
  {
    title: "Rotate PDF",
    href: "/rotate-pdf/",
    description:
      "Rotate all or selected PDF pages.",
  },
  {
    title: "Reorder PDF Pages",
    href: "/reorder-pdf-pages/",
    description:
      "Change the page sequence of a PDF.",
  },
  {
    title: "PDF Page Counter & Info",
    href: "/pdf-page-counter/",
    description:
      "Check page count and document metadata.",
  },
  {
    title: "Images to PDF",
    href: "/images-to-pdf/",
    description:
      "Turn JPG and PNG images into one PDF.",
  },
  {
    title: "JPG to PDF",
    href: "/jpg-to-pdf/",
    description:
      "Convert JPG images into a PDF document.",
  },
  {
    title: "PNG to PDF",
    href: "/png-to-pdf/",
    description:
      "Convert PNG images into a PDF document.",
  },
];

export default function PdfToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SoloTools PDF Tools",
    url:
      "https://solotools-1ou.pages.dev/pdf-tools/",
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

            <a href="/image-tools/">
              Image Tools
            </a>

            <a href="/calculators/">
              Calculators
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free browser PDF utilities
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            PDF Tools
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Merge, split, rotate, reorder,
            inspect, and create PDFs directly
            in your browser. No account
            required.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {tools.map(
            (tool) => (
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
            )
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            PDF processing in your browser
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Supported PDF operations run
            locally on your device. Selected
            documents and images do not need
            to be uploaded to a SoloTools
            conversion server.
          </p>
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
