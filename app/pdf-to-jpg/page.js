import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "PDF to JPG Converter Online Free",
  description: "Convert every PDF page into a JPG image and download the results as a ZIP file.",
  alternates: {
    canonical: "/pdf-to-jpg/",
  },
  openGraph: {
    title: "PDF to JPG Converter Online Free | SoloTools",
    description: "Convert every PDF page into a JPG image and download the results as a ZIP file.",
    url: "https://solotools-1ou.pages.dev/pdf-to-jpg/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="PDF to JPG Converter"
      description="Convert every PDF page into a JPG image and download the results as a ZIP file."
      canonicalPath="/pdf-to-jpg/"
      mode="jpg"
      group="raster"
      infoTitle="Turn PDF pages into JPG images"
      infoText="Choose the rendering resolution and JPEG quality. Each PDF page becomes a separate JPG image."
      note=""
    />
  );
}