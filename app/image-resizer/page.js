import ImageResizerTool from "../components/ImageResizerTool";

export const metadata = {
  title: "Free Image Resizer - Resize JPG, PNG & WebP",
  description:
    "Resize JPG, PNG, and WebP images online for free. Change width and height while optionally keeping the original aspect ratio.",
  keywords: [
    "image resizer",
    "resize image",
    "resize jpg",
    "resize png",
    "resize webp",
    "change image dimensions",
  ],
  alternates: {
    canonical: "/image-resizer/",
  },
  openGraph: {
    title: "Free Image Resizer | SoloTools",
    description:
      "Resize JPG, PNG, and WebP images directly in your browser.",
    url: "https://solotools-1ou.pages.dev/image-resizer/",
    type: "website",
  },
};

export default function ImageResizerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SoloTools Image Resizer",
    url: "https://solotools-1ou.pages.dev/image-resizer/",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/" aria-label="SoloTools home">
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            <a href="/image-tools/" className="text-slate-950">
              Image Tools
            </a>

            <a href="/calculators/" className="hover:text-slate-950">
              Calculators
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Browser-based image resizing
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Free Image Resizer
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Change image width and height directly in your browser.
            Keep the original aspect ratio or enter custom dimensions.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ImageResizerTool />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-3xl font-bold">
            Resize images without uploading them
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            The resize operation runs locally in your browser. Enter the
            dimensions you need, optionally lock the aspect ratio, and download
            the resized image.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="text-2xl font-bold">
          Related Image Tools
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <a
            href="/image-compressor/"
            className="rounded-2xl border border-slate-200 p-5"
          >
            <h3 className="font-bold">Image Compressor</h3>
          </a>

          <a
            href="/image-converter/"
            className="rounded-2xl border border-slate-200 p-5"
          >
            <h3 className="font-bold">Image Converter</h3>
          </a>

          <a
            href="/image-tools/"
            className="rounded-2xl border border-slate-200 p-5"
          >
            <h3 className="font-bold">All Image Tools</h3>
          </a>
        </div>
      </section>
    </main>
  );
}
