import FormatConverterLanding from "../components/FormatConverterLanding";

export const metadata = {
  title: "WebP to JPG Converter",
  description: "Convert WebP images to JPG online for free. Adjust JPG quality and download a widely compatible image file.",
  keywords: [
    "webp to jpg", "webp to jpeg", "webp to jpg converter", "convert webp to jpg", "image converter"
  ],
  alternates: {
    canonical: "/webp-to-jpg/",
  },
  openGraph: {
    title: "WebP to JPG Converter | SoloTools",
    description: "Convert WebP images to JPG online for free. Adjust JPG quality and download a widely compatible image file.",
    url: "https://solotools-1ou.pages.dev/webp-to-jpg/",
    type: "website",
  },
};

export default function ConverterPage() {
  return (
    <FormatConverterLanding
      title="WebP to JPG Converter"
      description="Convert WebP images to JPG online for free. Adjust JPG quality and download a widely compatible image file."
      sourceLabel="WebP"
      sourceMime="image/webp"
      outputLabel="JPG"
      outputMime="image/jpeg"
      outputExtension="jpg"
      qualityEnabled={true}
      canonicalPath="/webp-to-jpg/"
      whyText="JPG can be useful when an application, device, editor, or older workflow does not accept WebP files."
      specialNote="JPG does not support transparency. Transparent WebP areas are placed on a white background during conversion."
    />
  );
}
