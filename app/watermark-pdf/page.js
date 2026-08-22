import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Watermark PDF Online Free",
  description: "Add a customizable text watermark to every page of a PDF.",
  alternates: {
    canonical: "/watermark-pdf/",
  },
  openGraph: {
    title: "Watermark PDF Online Free | SoloTools",
    description: "Add a customizable text watermark to every page of a PDF.",
    url: "https://solotools-1ou.pages.dev/watermark-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Watermark PDF"
      description="Add a customizable text watermark to every page of a PDF."
      canonicalPath="/watermark-pdf/"
      mode="watermark"
      group="edit"
      infoTitle="Add text watermarks to PDFs"
      infoText="Set your watermark text, size, opacity, and rotation before downloading the updated document."
      note="A visible watermark discourages casual reuse but is not the same as encryption or access control."
    />
  );
}