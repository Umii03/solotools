import FormatConverterLanding from "../components/FormatConverterLanding";

export const metadata = {
  title: "PNG to WebP Converter",
  description: "Convert PNG images to WebP online for free. Preserve transparency where supported and adjust WebP quality in your browser.",
  keywords: [
    "png to webp", "png to webp converter", "convert png to webp", "webp converter", "image optimizer"
  ],
  alternates: {
    canonical: "/png-to-webp/",
  },
  openGraph: {
    title: "PNG to WebP Converter | SoloTools",
    description: "Convert PNG images to WebP online for free. Preserve transparency where supported and adjust WebP quality in your browser.",
    url: "https://solotools-1ou.pages.dev/png-to-webp/",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <FormatConverterLanding
      title="PNG to WebP Converter"
      description="Convert PNG images to WebP online for free. Preserve transparency where supported and adjust WebP quality in your browser."
      sourceLabel="PNG"
      sourceMime="image/png"
      outputLabel="WebP"
      outputMime="image/webp"
      outputExtension="webp"
      qualityEnabled={true}
      canonicalPath="/png-to-webp/"
      whyText="WebP can be useful when a PNG is too large for web delivery. WebP supports transparency while often producing a smaller file."
      specialNote="WebP supports transparency, but lowering quality may change visual detail. Compare the result before replacing an important source image."
    />
  );
}
