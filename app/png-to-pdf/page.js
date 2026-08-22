import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "PNG to PDF Converter Online Free",
  description: "Convert one or multiple PNG images into a PDF document directly in your browser.",
  alternates: {
    canonical: "/png-to-pdf/",
  },
  openGraph: {
    title: "PNG to PDF Converter Online Free | SoloTools",
    description: "Convert one or multiple PNG images into a PDF document directly in your browser.",
    url: "https://solotools-1ou.pages.dev/png-to-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="PNG to PDF Converter"
      description="Convert one or multiple PNG images into a PDF document directly in your browser."
      canonicalPath="/png-to-pdf/"
      mode="images"
      imageType="png"
      infoTitle="Create a PDF from PNG images"
      infoText="Select one or more PNG images and combine them into a single PDF document."
    />
  );
}
