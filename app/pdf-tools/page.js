export const metadata = {
  title: "Free Online PDF Tools",
  description:
    "Free browser PDF tools to merge, split, compress, convert, organize, rotate, crop, watermark, sign, inspect, and edit PDF files.",
  alternates: {
    canonical: "/pdf-tools/",
  },
  openGraph: {
    title: "Free Online PDF Tools | SoloTools",
    description:
      "Browser-based PDF utilities for everyday document work.",
    url:
      "https://solotools-1ou.pages.dev/pdf-tools/",
    type: "website",
  },
};

const tools = [
  ["Merge PDF", "/merge-pdf/", "Combine PDFs into one file.", "Organize"],
  ["Split PDF", "/split-pdf/", "Split one PDF into two files.", "Organize"],
  ["Extract PDF Pages", "/extract-pdf-pages/", "Create a PDF from selected pages.", "Organize"],
  ["Remove PDF Pages", "/remove-pdf-pages/", "Delete unwanted PDF pages.", "Organize"],
  ["Organize PDF", "/organize-pdf/", "Reorder, rotate, and delete pages visually.", "Organize"],
  ["Rotate PDF", "/rotate-pdf/", "Rotate all or selected pages.", "Organize"],
  ["Reorder PDF Pages", "/reorder-pdf-pages/", "Change page sequence by entering an order.", "Organize"],

  ["Compress PDF", "/compress-pdf/", "Reduce PDF file size in your browser.", "Optimize"],
  ["Crop PDF", "/crop-pdf/", "Adjust the visible crop area of PDF pages.", "Optimize"],
  ["Add Page Numbers", "/add-page-numbers/", "Add configurable page numbers.", "Edit"],
  ["Watermark PDF", "/watermark-pdf/", "Add text watermarks to every page.", "Edit"],
  ["Sign PDF", "/sign-pdf/", "Place a signature image onto a PDF page.", "Edit"],
  ["PDF Metadata Editor", "/pdf-metadata-editor/", "Edit title, author, subject, and keywords.", "Edit"],

  ["PDF to JPG", "/pdf-to-jpg/", "Convert PDF pages into JPG images.", "Convert"],
  ["PDF to PNG", "/pdf-to-png/", "Convert PDF pages into PNG images.", "Convert"],
  ["Images to PDF", "/images-to-pdf/", "Turn JPG and PNG images into a PDF.", "Convert"],
  ["JPG to PDF", "/jpg-to-pdf/", "Convert JPG images into a PDF.", "Convert"],
  ["PNG to PDF", "/png-to-pdf/", "Convert PNG images into a PDF.", "Convert"],

  ["PDF Page Counter & Info", "/pdf-page-counter/", "Check PDF page count and metadata.", "Inspect"],
];

export default function PdfToolsPage() {
  const schema = {
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
            position: index + 1,
            name: tool[0],
            url:
              `https://solotools-1ou.pages.dev${tool[1]}`,
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
              href="/pdf-tools/"
              className="text-slate-950"
            >
              PDF Tools
            </a>

            <a href="/image-tools/">
              Image Tools
            </a>

            <a href="/tools/">
              All Tools
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
            Merge, split, compress, convert, organize, edit, and inspect
            PDFs directly in your browser.
          </p>

          <p className="mt-3 text-sm font-semibold text-green-700">
            Supported operations process files locally on your device.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map(
            ([title, href, description, category]) => (
              <a
                key={href}
                href={href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-400 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {category}
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {title}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {description}
                </p>

                <span className="mt-5 inline-flex font-semibold text-blue-700">
                  Open tool -&gt;
                </span>
              </a>
            )
          )}
        </div>
      </section>
    </main>
  );
}