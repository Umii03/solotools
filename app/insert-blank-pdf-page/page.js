import PdfExpansionPage from "../components/PdfExpansionPage";

export const metadata = {
  title: "Insert Blank Page into PDF",
  description: "Insert a blank page at any position in a PDF.",
  alternates: {
    canonical: "/insert-blank-pdf-page/",
  },
  openGraph: {
    title: "Insert Blank Page into PDF | SoloTools",
    description: "Insert a blank page at any position in a PDF.",
    url:
      "https://solotools-1ou.pages.dev/insert-blank-pdf-page/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfExpansionPage
      title="Insert Blank PDF Page"
      description="Insert a blank page at any position in a PDF."
      canonicalPath="/insert-blank-pdf-page/"
      mode="blank"
      infoTitle="Add a blank PDF page"
      infoText="Choose a position from before the first page through after the final page. The blank page uses the document page size."
    />
  );
}