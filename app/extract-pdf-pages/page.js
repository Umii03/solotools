import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "Extract PDF Pages Online Free",
  description: "Choose specific pages or page ranges and save them into a new PDF.",
  alternates: {
    canonical: "/extract-pdf-pages/",
  },
  openGraph: {
    title: "Extract PDF Pages Online Free | SoloTools",
    description: "Choose specific pages or page ranges and save them into a new PDF.",
    url: "https://solotools-1ou.pages.dev/extract-pdf-pages/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="Extract PDF Pages"
      description="Choose specific pages or page ranges and save them into a new PDF."
      canonicalPath="/extract-pdf-pages/"
      mode="extract"
      imageType="all"
      infoTitle="Create a PDF from selected pages"
      infoText="Use page numbers such as 1,3-5,8. Only the selected pages are copied into the new document."
    />
  );
}
