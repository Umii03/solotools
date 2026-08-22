import PdfExpansionPage from "../components/PdfExpansionPage";

export const metadata = {
  title: "Reverse PDF Pages Online Free",
  description: "Reverse the complete page order of a PDF directly in your browser.",
  alternates: {
    canonical: "/reverse-pdf-pages/",
  },
  openGraph: {
    title: "Reverse PDF Pages Online Free | SoloTools",
    description: "Reverse the complete page order of a PDF directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/reverse-pdf-pages/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfExpansionPage
      title="Reverse PDF Pages"
      description="Reverse the complete page order of a PDF directly in your browser."
      canonicalPath="/reverse-pdf-pages/"
      mode="reverse"
      infoTitle="Reverse a PDF page sequence"
      infoText="A document ordered 1, 2, 3, 4 becomes 4, 3, 2, 1 without uploading the file to a SoloTools server."
    />
  );
}