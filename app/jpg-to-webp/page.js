import FormatConverterLanding from "../components/FormatConverterLanding";

export const metadata = {
  title: "JPG to WebP Converter",
  description: "Convert JPG images to WebP online for free. Adjust output quality and create a web-friendly image directly in your browser.",
  keywords: [
    "jpg to webp", "jpg to webp converter", "convert jpg to webp", "jpeg to webp", "webp converter"
  ],
  alternates: {
    canonical: "/jpg-to-webp/",
  },
  openGraph: {
    title: "JPG to WebP Converter | SoloTools",
    description: "Convert JPG images to WebP online for free. Adjust output quality and create a web-friendly image directly in your browser.",
    url: "https://solotools-1ou.pages.dev/jpg-to-webp/",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <FormatConverterLanding
      title="JPG to WebP Converter"
      description="Convert JPG images to WebP online for free. Adjust output quality and create a web-friendly image directly in your browser."
      sourceLabel="JPG"
      sourceMime="image/jpeg"
      outputLabel="WebP"
      outputMime="image/webp"
      outputExtension="webp"
      qualityEnabled={true}
      canonicalPath="/jpg-to-webp/"
      whyText="WebP is commonly used for websites because it can provide useful visual quality with smaller file sizes than many traditional JPG files."
      specialNote="Changing JPG to WebP is a new compression step. Use the quality control to balance image clarity and output file size."
    />
  );
}
