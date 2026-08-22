import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "Images to PDF Converter - JPG and PNG",
  description: "Turn multiple JPG or PNG images into one PDF document directly in your browser.",
  alternates: {
    canonical: "/images-to-pdf/",
  },
  openGraph: {
    title: "Images to PDF Converter - JPG and PNG | SoloTools",
    description: "Turn multiple JPG or PNG images into one PDF document directly in your browser.",
    url: "https://solotools-1ou.pages.dev/images-to-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="Images to PDF Converter"
      description="Turn multiple JPG or PNG images into one PDF document directly in your browser."
      canonicalPath="/images-to-pdf/"
      mode="images"
      imageType="all"
      infoTitle="Create one PDF from multiple images"
      infoText="Each selected JPG or PNG image becomes one PDF page in the order selected."
    />
  );
}
