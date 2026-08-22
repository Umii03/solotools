import FormatConverterLanding from "../components/FormatConverterLanding";

export const metadata = {
  title: "WebP to PNG Converter",
  description: "Convert WebP images to PNG online for free. Create a lossless PNG file directly in your browser without uploading the image.",
  keywords: [
    "webp to png", "webp to png converter", "convert webp to png", "webp converter", "png converter"
  ],
  alternates: {
    canonical: "/webp-to-png/",
  },
  openGraph: {
    title: "WebP to PNG Converter | SoloTools",
    description: "Convert WebP images to PNG online for free. Create a lossless PNG file directly in your browser without uploading the image.",
    url: "https://solotools-1ou.pages.dev/webp-to-png/",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <FormatConverterLanding
      title="WebP to PNG Converter"
      description="Convert WebP images to PNG online for free. Create a lossless PNG file directly in your browser without uploading the image."
      sourceLabel="WebP"
      sourceMime="image/webp"
      outputLabel="PNG"
      outputMime="image/png"
      outputExtension="png"
      qualityEnabled={false}
      canonicalPath="/webp-to-png/"
      whyText="PNG is useful for editing, screenshots, graphics, transparent images, and workflows that do not support the WebP format."
      specialNote="The PNG may be larger than the original WebP because PNG uses a different lossless storage method."
    />
  );
}
