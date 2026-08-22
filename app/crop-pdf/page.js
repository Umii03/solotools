import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Crop PDF Pages Online Free",
  description: "Change the visible crop area of every page in a PDF using top, right, bottom, and left margins.",
  alternates: {
    canonical: "/crop-pdf/",
  },
  openGraph: {
    title: "Crop PDF Pages Online Free | SoloTools",
    description: "Change the visible crop area of every page in a PDF using top, right, bottom, and left margins.",
    url: "https://solotools-1ou.pages.dev/crop-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Crop PDF Pages"
      description="Change the visible crop area of every page in a PDF using top, right, bottom, and left margins."
      canonicalPath="/crop-pdf/"
      mode="crop"
      group="edit"
      infoTitle="Adjust the visible PDF page area"
      infoText="Crop margins are entered in PDF points. The crop box changes what PDF viewers display."
      note="Cropping does not securely delete or redact hidden content outside the visible crop area."
    />
  );
}