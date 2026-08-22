import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Remove PDF Pages Online Free",
  description: "Delete selected pages from a PDF and download a new document containing the pages you want to keep.",
  alternates: {
    canonical: "/remove-pdf-pages/",
  },
  openGraph: {
    title: "Remove PDF Pages Online Free | SoloTools",
    description: "Delete selected pages from a PDF and download a new document containing the pages you want to keep.",
    url: "https://solotools-1ou.pages.dev/remove-pdf-pages/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Remove PDF Pages"
      description="Delete selected pages from a PDF and download a new document containing the pages you want to keep."
      canonicalPath="/remove-pdf-pages/"
      mode="remove"
      group="edit"
      infoTitle="Delete unwanted PDF pages"
      infoText="Enter pages such as 2,4-6. SoloTools creates a new PDF without those pages."
      note=""
    />
  );
}