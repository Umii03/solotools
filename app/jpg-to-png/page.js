import FormatConverterLanding from "../components/FormatConverterLanding";

export const metadata = {
  title: "JPG to PNG Converter",
  description: "Convert JPG images to PNG online for free. Keep the original dimensions and process the image directly in your browser.",
  keywords: [
    "jpg to png", "jpg to png converter", "convert jpg to png", "jpeg to png", "image converter"
  ],
  alternates: {
    canonical: "/jpg-to-png/",
  },
  openGraph: {
    title: "JPG to PNG Converter | SoloTools",
    description: "Convert JPG images to PNG online for free. Keep the original dimensions and process the image directly in your browser.",
    url: "https://solotools-1ou.pages.dev/jpg-to-png/",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <FormatConverterLanding
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG online for free. Keep the original dimensions and process the image directly in your browser."
      sourceLabel="JPG"
      sourceMime="image/jpeg"
      outputLabel="PNG"
      outputMime="image/png"
      outputExtension="png"
      qualityEnabled={false}
      canonicalPath="/jpg-to-png/"
      whyText="PNG is useful when you need a lossless format for graphics, editing workflows, screenshots, or applications that specifically require PNG files."
      specialNote="Converting a JPG to PNG does not restore image information that was previously removed by JPG compression. The converted PNG preserves the pixels available in the JPG."
    />
  );
}
