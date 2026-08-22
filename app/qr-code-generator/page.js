import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "QR Code Generator Online Free",
  description: "Create a downloadable QR code from text or a URL directly in your browser.",
  alternates: {
    canonical: "/qr-code-generator/",
  },
  openGraph: {
    title: "QR Code Generator Online Free | SoloTools",
    description: "Create a downloadable QR code from text or a URL directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/qr-code-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="QR Code Generator"
      description="Create a downloadable QR code from text or a URL directly in your browser."
      canonicalPath="/qr-code-generator/"
      mode="qr"
      section="Developer tool"
      infoTitle="Create QR codes locally"
      infoText="Enter a URL or text, choose the image size and error correction level, then generate and download a PNG QR code."
    />
  );
}
