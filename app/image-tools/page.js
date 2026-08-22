export default function ImageToolsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a
            href="/"
            aria-label="SoloTools home"
            className="inline-flex items-center"
          >
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
            Free browser-based tools for converting and working with images.
            Designed to keep common image processing simple and fast.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <a
            href="/image-converter/"
            className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-400 hover:bg-white"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Converter
            </p>

            <h2 className="mt-2 text-xl font-bold group-hover:text-blue-700">
              JPG, PNG & WebP Image Converter
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Convert between JPG, PNG, and WebP directly in your browser.
              Adjust JPG and WebP quality and download the converted file.
            </p>

            <span className="mt-5 inline-flex font-semibold text-blue-700">
              Open Image Converter -&gt;
            </span>
          </a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            Privacy-friendly image processing
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Where practical, SoloTools image utilities are designed to process
            files locally in the browser. This reduces the need to upload
            personal images to a remote conversion server.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            More image utilities can be added here over time, including image
            resizing, compression, cropping, and other practical tools.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-2xl font-bold">
          Looking for calculators?
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          SoloTools also includes free salary, freelance pricing, project cost,
          and income calculators.
        </p>

        <a
          href="/calculators/"
          className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
        >
          Browse all calculators -&gt;
        </a>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            SoloTools - free practical online tools.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/about/" className="hover:text-slate-900">
              About
            </a>
            <a href="/contact/" className="hover:text-slate-900">
              Contact
            </a>
            <a href="/privacy-policy/" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="/terms/" className="hover:text-slate-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
