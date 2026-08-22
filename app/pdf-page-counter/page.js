import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "PDF Page Counter and PDF Info",
  description: "Check PDF page count, file size, and available document metadata.",
  alternates: {
    canonical: "/pdf-page-counter/",
  },
  openGraph: {
    title: "PDF Page Counter and PDF Info | SoloTools",
    description: "Check PDF page count, file size, and available document metadata.",
    url: "https://solotools-1ou.pages.dev/pdf-page-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="PDF Page Counter & Info"
      description="Check PDF page count, file size, and available document metadata."
      canonicalPath="/pdf-page-counter/"
      mode="info"
      imageType="all"
      infoTitle="Quickly inspect a PDF"
      infoText="See total pages and available information such as title, author, creator, producer, and document dates."
    />
  );
}
