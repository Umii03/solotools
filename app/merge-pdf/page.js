import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "Merge PDF Online Free",
  description: "Combine multiple PDF files into one document directly in your browser.",
  alternates: {
    canonical: "/merge-pdf/",
  },
  openGraph: {
    title: "Merge PDF Online Free | SoloTools",
    description: "Combine multiple PDF files into one document directly in your browser.",
    url: "https://solotools-1ou.pages.dev/merge-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="Merge PDF"
      description="Combine multiple PDF files into one document directly in your browser."
      canonicalPath="/merge-pdf/"
      mode="merge"
      imageType="all"
      infoTitle="Combine PDFs without uploading them"
      infoText="Select two or more PDF documents and SoloTools copies their pages into one new PDF locally in your browser."
    />
  );
}
