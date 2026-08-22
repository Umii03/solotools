import FormatConverterLanding from "../components/FormatConverterLanding";

export const metadata = {
  title: "PNG to JPG Converter",
  description: "Convert PNG images to JPG online for free. Choose JPG quality and download the converted image directly from your browser.",
  keywords: [
    "png to jpg", "png to jpeg", "png to jpg converter", "convert png to jpg", "image converter"
  ],
  alternates: {
    canonical: "/png-to-jpg/",
  },
  openGraph: {
    title: "PNG to JPG Converter | SoloTools",
    description: "Convert PNG images to JPG online for free. Choose JPG quality and download the converted image directly from your browser.",
    url: "https://solotools-1ou.pages.dev/png-to-jpg/",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <FormatConverterLanding
      title="PNG to JPG Converter"
      description="Convert PNG images to JPG online for free. Choose JPG quality and download the converted image directly from your browser."
      sourceLabel="PNG"
      sourceMime="image/png"
      outputLabel="JPG"
      outputMime="image/jpeg"
      outputExtension="jpg"
      qualityEnabled={true}
      canonicalPath="/png-to-jpg/"
      whyText="JPG is widely supported and can be useful for photographs or situations where a smaller lossy image is more practical than a lossless PNG."
      specialNote="JPG does not support transparent pixels. Transparent areas in the original PNG are placed on a white background during conversion."
    />
  );
}
