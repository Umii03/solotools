import GeneralImageBatchTool from "../components/GeneralImageBatchTool";

export default function ImageConverterPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

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
            <a href="/image-tools/">
              Image Tools
            </a>

            <a href="/tools/">
              All Tools
            </a>

            <a href="/guides/">
              Guides
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free batch image converter
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            JPG, PNG & WebP Image Converter
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Convert multiple JPG, PNG, or WebP images at once. Choose one output format, process the complete batch locally in your browser, then download individual files or one ZIP.
          </p>

          <p className="mt-3 text-sm font-semibold text-green-700">
            Your images are processed locally in your browser.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <GeneralImageBatchTool />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-12">

          <h2 className="text-3xl font-bold">
            Convert multiple images at once
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-600">
                Step 1
              </p>

              <h3 className="mt-2 font-bold">
                Add your images
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select or drag and drop multiple JPG, PNG, and WebP files.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-600">
                Step 2
              </p>

              <h3 className="mt-2 font-bold">
                Choose an output format
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Convert the full queue to JPG, PNG, or WebP using the same settings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-blue-600">
                Step 3
              </p>

              <h3 className="mt-2 font-bold">
                Download individually or ZIP
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Save any result separately or download the complete processed batch as one ZIP file.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-3xl font-bold">
          Supported image formats
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          SoloTools supports JPG/JPEG, PNG, and WebP input. JPG is useful for photographs and smaller lossy files, PNG is useful when transparency is important, and WebP can provide efficient modern image compression.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="font-bold">
            Transparency note
          </h3>

          <p className="mt-2 leading-7 text-slate-600">
            JPG does not support transparency. Transparent areas are placed on a white background when a PNG or WebP image is converted to JPG.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">

          <h2 className="text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-7 space-y-6">

            <div>
              <h3 className="text-lg font-bold">
                Can I convert multiple images at once?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. You can add up to 30 supported images to one batch, apply the same output settings, and process the queue sequentially.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Are my images uploaded?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Supported conversion is performed locally in your browser rather than sending the image files to a SoloTools conversion server.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Can I download all converted images together?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. After processing, use Download All as ZIP to save every successful result in one archive.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                Will conversion resize my images?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                No. The converter keeps each image's original pixel dimensions. Use the Image Resizer when you also need to change dimensions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-2xl font-bold">
          More Image Tools
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <a
            href="/image-compressor/"
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h3 className="font-bold">
              Image Compressor
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Compress multiple images with shared quality settings.
            </p>
          </a>

          <a
            href="/image-resizer/"
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h3 className="font-bold">
              Image Resizer
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Resize multiple images in one batch.
            </p>
          </a>

          <a
            href="/image-tools/"
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h3 className="font-bold">
              All Image Tools
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Browse all SoloTools image utilities.
            </p>
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