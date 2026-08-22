const categories = [
  {
    name: "Calculators",
    href: "/calculators/",
    description:
      "Everyday, finance, business, salary, date, and freelance calculators.",
    tools: [
      ["Salary to Hourly Calculator", "/salary-to-hourly-calculator/"],
      ["Percentage Calculator", "/percentage-calculator/"],
      ["Discount Calculator", "/discount-calculator/"],
      ["Profit Margin Calculator", "/profit-margin-calculator/"],
      ["Loan Calculator", "/loan-calculator/"],
      ["Age Calculator", "/age-calculator/"],
      ["Date Difference Calculator", "/date-difference-calculator/"],
      ["VAT Calculator", "/vat-calculator/"],
      ["Freelance Hourly Rate Calculator", "/freelance-hourly-rate-calculator/"],
      ["Project Price Calculator", "/project-price-calculator/"],
      ["Freelance Income Calculator", "/freelance-income-calculator/"],
    ],
  },
  {
    name: "Image Tools",
    href: "/image-tools/",
    description:
      "Convert, compress, and resize JPG, PNG, and WebP images.",
    tools: [
      ["Image Converter", "/image-converter/"],
      ["JPG to PNG", "/jpg-to-png/"],
      ["PNG to JPG", "/png-to-jpg/"],
      ["JPG to WebP", "/jpg-to-webp/"],
      ["PNG to WebP", "/png-to-webp/"],
      ["WebP to JPG", "/webp-to-jpg/"],
      ["WebP to PNG", "/webp-to-png/"],
      ["Image Compressor", "/image-compressor/"],
      ["Image Resizer", "/image-resizer/"],
    ],
  },
  {
    name: "PDF Tools",
    href: "/pdf-tools/",
    description:
      "Merge, split, rotate, reorder, inspect, and create PDFs.",
    tools: [
      ["Merge PDF", "/merge-pdf/"],
      ["Split PDF", "/split-pdf/"],
      ["Extract PDF Pages", "/extract-pdf-pages/"],
      ["Rotate PDF", "/rotate-pdf/"],
      ["Reorder PDF Pages", "/reorder-pdf-pages/"],
      ["PDF Page Counter & Info", "/pdf-page-counter/"],
      ["Images to PDF", "/images-to-pdf/"],
      ["JPG to PDF", "/jpg-to-pdf/"],
      ["PNG to PDF", "/png-to-pdf/"],
    ],
  },
  {
    name: "Text Tools",
    href: "/text-tools/",
    description:
      "Count and transform text directly in your browser.",
    tools: [
      ["Word Counter", "/word-counter/"],
      ["Character Counter", "/character-counter/"],
      ["Case Converter", "/case-converter/"],
    ],
  },
  {
    name: "Developer Tools",
    href: "/developer-tools/",
    description:
      "Format, encode, decode, generate, and validate common development data.",
    tools: [
      ["JSON Formatter & Validator", "/json-formatter/"],
      ["URL Encoder & Decoder", "/url-encoder-decoder/"],
      ["Base64 Encoder & Decoder", "/base64-encoder-decoder/"],
      ["UUID Generator", "/uuid-generator/"],
      ["QR Code Generator", "/qr-code-generator/"],
    ],
  },
];

const allTools =
  categories.flatMap(
    (category) =>
      category.tools.map(
        ([name, href]) => ({
          name,
          href,
        })
      )
  );

export default function ToolsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SoloTools - All Tools",
    url:
      "https://solotools-1ou.pages.dev/tools/",
    description:
      "A directory of free calculators and browser-based utilities.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems:
        allTools.length,
      itemListElement:
        allTools.map(
          (tool, index) => ({
            "@type": "ListItem",
            position:
              index + 1,
            name:
              tool.name,
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
            Browse {allTools.length} free calculators and browser-based
            utilities for images, PDFs, text, development, finance,
            business, and freelance work.
          </p>

          <p className="mt-3 text-sm font-medium text-slate-500">
            No account required.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {categories.map(
            (category) => (
              <section
                key={category.name}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {category.name}
                    </h2>

                    <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                      {category.description}
                    </p>
                  </div>

                  <a
                    href={category.href}
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    Category page -&gt;
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map(
                    ([name, href]) => (
                      <a
                        key={href}
                        href={href}
                        className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold transition hover:border-slate-400 hover:text-blue-700"
                      >
                        {name}
                      </a>
                    )
                  )}
                </div>
              </section>
            )
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            One directory for every SoloTools utility
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            This page links directly to every current SoloTools tool,
            making it easier for visitors and search engines to discover
            related calculators and browser utilities.
          </p>

          <a
            href="/guides/"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
          >
            Browse practical guides -&gt;
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