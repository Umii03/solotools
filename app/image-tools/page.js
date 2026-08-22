export default function ImageToolsPage() {
  const tools = [
    {
      title: "Image Converter",
      description:
        "Convert JPG, PNG, and WebP using one flexible converter.",
      href: "/image-converter/",
      label: "All formats",
    },
    {
      title: "JPG to PNG Converter",
      description:
        "Convert JPG images into lossless PNG files.",
      href: "/jpg-to-png/",
      label: "Converter",
    },
    {
      title: "PNG to JPG Converter",
      description:
        "Convert PNG files to widely compatible JPG images.",
      href: "/png-to-jpg/",
      label: "Converter",
    },
    {
      title: "JPG to WebP Converter",
      description:
        "Create web-friendly WebP images from JPG files.",
      href: "/jpg-to-webp/",
      label: "Converter",
    },
    {
      title: "PNG to WebP Converter",
      description:
        "Convert PNG images to WebP with adjustable quality.",
      href: "/png-to-webp/",
      label: "Converter",
    },
    {
      title: "WebP to JPG Converter",
      description:
        "Convert WebP files to widely supported JPG images.",
      href: "/webp-to-jpg/",
      label: "Converter",
    },
    {
      title: "WebP to PNG Converter",
      description:
        "Convert WebP files into lossless PNG images.",
      href: "/webp-to-png/",
      label: "Converter",
    },
    {
      title: "Image Compressor",
      description:
        "Reduce JPG, PNG, and WebP file size with adjustable output quality.",
      href: "/image-compressor/",
      label: "Optimize",
    },
    {
      title: "Image Resizer",
      description:
        "Change image width and height while optionally preserving aspect ratio.",
      href: "/image-resizer/",
      label: "Resize",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/" aria-label="SoloTools home">
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

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free browser utilities
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Image Tools
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Convert, compress, and resize JPG, PNG, and WebP images directly
            in your browser. No account required.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-400 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {tool.label}
              </p>

              <h2 className="mt-2 text-xl font-bold group-hover:text-blue-700">
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

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            Private browser-based image processing
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            These tools are designed to perform supported image operations
            locally in your browser. Images do not need to be uploaded to a
            SoloTools conversion server.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>SoloTools - free practical online tools.</p>

          <div className="flex gap-4">
            <a href="/about/">About</a>
            <a href="/privacy-policy/">Privacy</a>
            <a href="/terms/">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
