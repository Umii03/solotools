import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "Reorder PDF Pages Online Free",
  description: "Change the order of pages in a PDF by entering a new page sequence.",
  alternates: {
    canonical: "/reorder-pdf-pages/",
  },
  openGraph: {
    title: "Reorder PDF Pages Online Free | SoloTools",
    description: "Change the order of pages in a PDF by entering a new page sequence.",
    url: "https://solotools-1ou.pages.dev/reorder-pdf-pages/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="Reorder PDF Pages"
      description="Change the order of pages in a PDF by entering a new page sequence."
      canonicalPath="/reorder-pdf-pages/"
      mode="reorder"
      imageType="all"
      infoTitle="Change PDF page order"
      infoText="For a four-page document, an order such as 3,1,2,4 moves page 3 to the front while keeping every page."
    />
  );
}
