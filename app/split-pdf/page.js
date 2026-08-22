import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "Split PDF Online Free",
  description: "Split one PDF into two separate documents at the page you choose.",
  alternates: {
    canonical: "/split-pdf/",
  },
  openGraph: {
    title: "Split PDF Online Free | SoloTools",
    description: "Split one PDF into two separate documents at the page you choose.",
    url: "https://solotools-1ou.pages.dev/split-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="Split PDF"
      description="Split one PDF into two separate documents at the page you choose."
      canonicalPath="/split-pdf/"
      mode="split"
      imageType="all"
      infoTitle="Split a PDF at a specific page"
      infoText="Choose where Part 1 should end and SoloTools creates two separate PDF documents."
    />
  );
}
