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
      "Convert, compress, organize, edit, inspect, and create PDFs.",
    tools: [
      ["Merge PDF", "/merge-pdf/"],
      ["Split PDF", "/split-pdf/"],
      ["Extract PDF Pages", "/extract-pdf-pages/"],
      ["Remove PDF Pages", "/remove-pdf-pages/"],
      ["Organize PDF", "/organize-pdf/"],
      ["Rotate PDF", "/rotate-pdf/"],
      ["Reorder PDF Pages", "/reorder-pdf-pages/"],
      ["Compress PDF", "/compress-pdf/"],
      ["Crop PDF", "/crop-pdf/"],
      ["Add Page Numbers", "/add-page-numbers/"],
      ["Watermark PDF", "/watermark-pdf/"],
      ["Sign PDF", "/sign-pdf/"],
      ["PDF Metadata Editor", "/pdf-metadata-editor/"],
      ["PDF to JPG", "/pdf-to-jpg/"],
      ["PDF to PNG", "/pdf-to-png/"],
      ["Images to PDF", "/images-to-pdf/"],
      ["JPG to PDF", "/jpg-to-pdf/"],
      ["PNG to PDF", "/png-to-pdf/"],
      ["PDF Page Counter & Info", "/pdf-page-counter/"],
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
      "Format, encode, decode, generate, and validate development data.",
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SoloTools - All Tools",
    url:
      "https://solotools-1ou.pages.dev/tools/",
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
            Browse {allTools.length} free calculators and browser-based utilities.
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
                        className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold hover:border-slate-400 hover:text-blue-700"
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
    </main>
  );
}