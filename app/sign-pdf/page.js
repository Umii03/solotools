import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Sign PDF with Image Online Free",
  description: "Place a PNG or JPG signature image onto a selected PDF page directly in your browser.",
  alternates: {
    canonical: "/sign-pdf/",
  },
  openGraph: {
    title: "Sign PDF with Image Online Free | SoloTools",
    description: "Place a PNG or JPG signature image onto a selected PDF page directly in your browser.",
    url: "https://solotools-1ou.pages.dev/sign-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Sign PDF"
      description="Place a PNG or JPG signature image onto a selected PDF page directly in your browser."
      canonicalPath="/sign-pdf/"
      mode="sign"
      group="edit"
      infoTitle="Place a signature image on a PDF"
      infoText="Choose a signature image, page, placement, and size. SoloTools embeds the image into the PDF."
      note="This tool places a visual signature image. It does not create a cryptographic digital signature or certificate-based signature."
    />
  );
}