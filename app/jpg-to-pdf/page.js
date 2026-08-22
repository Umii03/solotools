import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "JPG to PDF Converter Online Free",
  description: "Convert one or multiple JPG images into a PDF document directly in your browser.",
  alternates: {
    canonical: "/jpg-to-pdf/",
  },
  openGraph: {
    title: "JPG to PDF Converter Online Free | SoloTools",
    description: "Convert one or multiple JPG images into a PDF document directly in your browser.",
    url: "https://solotools-1ou.pages.dev/jpg-to-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="JPG to PDF Converter"
      description="Convert one or multiple JPG images into a PDF document directly in your browser."
      canonicalPath="/jpg-to-pdf/"
      mode="images"
      imageType="jpg"
      infoTitle="Create a PDF from JPG images"
      infoText="Select one or more JPG images and combine them into a single PDF document."
    />
  );
}
