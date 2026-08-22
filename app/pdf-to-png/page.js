import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "PDF to PNG Converter Online Free",
  description: "Convert PDF pages into lossless PNG images directly in your browser.",
  alternates: {
    canonical: "/pdf-to-png/",
  },
  openGraph: {
    title: "PDF to PNG Converter Online Free | SoloTools",
    description: "Convert PDF pages into lossless PNG images directly in your browser.",
    url: "https://solotools-1ou.pages.dev/pdf-to-png/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="PDF to PNG Converter"
      description="Convert PDF pages into lossless PNG images directly in your browser."
      canonicalPath="/pdf-to-png/"
      mode="png"
      group="raster"
      infoTitle="Create PNG images from a PDF"
      infoText="Each PDF page is rendered locally into a separate PNG image and packaged into a ZIP file."
      note=""
    />
  );
}