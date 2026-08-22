import PdfExpansionPage from "../components/PdfExpansionPage";

export const metadata = {
  title: "Duplicate PDF Pages Online Free",
  description: "Duplicate a selected page one or more times inside a PDF.",
  alternates: {
    canonical: "/duplicate-pdf-pages/",
  },
  openGraph: {
    title: "Duplicate PDF Pages Online Free | SoloTools",
    description: "Duplicate a selected page one or more times inside a PDF.",
    url:
      "https://solotools-1ou.pages.dev/duplicate-pdf-pages/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfExpansionPage
      title="Duplicate PDF Pages"
      description="Duplicate a selected page one or more times inside a PDF."
      canonicalPath="/duplicate-pdf-pages/"
      mode="duplicate"
      infoTitle="Copy a PDF page"
      infoText="Choose the page to duplicate and the number of extra copies. Copies are inserted immediately after the selected page."
    />
  );
}