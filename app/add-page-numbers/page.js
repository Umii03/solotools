import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Add Page Numbers to PDF Online",
  description: "Add customizable page numbers to every page of a PDF directly in your browser.",
  alternates: {
    canonical: "/add-page-numbers/",
  },
  openGraph: {
    title: "Add Page Numbers to PDF Online | SoloTools",
    description: "Add customizable page numbers to every page of a PDF directly in your browser.",
    url: "https://solotools-1ou.pages.dev/add-page-numbers/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Add Page Numbers to PDF"
      description="Add customizable page numbers to every page of a PDF directly in your browser."
      canonicalPath="/add-page-numbers/"
      mode="numbers"
      group="edit"
      infoTitle="Number PDF pages automatically"
      infoText="Choose the page-number position, starting value, font size, prefix, and suffix."
      note=""
    />
  );
}