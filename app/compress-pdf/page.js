import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Compress PDF Online Free",
  description: "Reduce PDF file size directly in your browser using adjustable image quality and resolution.",
  alternates: {
    canonical: "/compress-pdf/",
  },
  openGraph: {
    title: "Compress PDF Online Free | SoloTools",
    description: "Reduce PDF file size directly in your browser using adjustable image quality and resolution.",
    url: "https://solotools-1ou.pages.dev/compress-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Compress PDF"
      description="Reduce PDF file size directly in your browser using adjustable image quality and resolution."
      canonicalPath="/compress-pdf/"
      mode="compress"
      group="raster"
      infoTitle="Reduce PDF size without uploading it"
      infoText="SoloTools renders each PDF page locally, optimizes it as an image, and rebuilds a smaller PDF using your selected quality settings."
      note="Compression rebuilds pages as images. Searchable text, selectable text, hyperlinks, forms, and other interactive PDF features may be lost."
    />
  );
}