import PdfToolPage from "../components/PdfToolPage";

export const metadata = {
  title: "Rotate PDF Pages Online Free",
  description: "Rotate all PDF pages or selected pages by 90, 180, or 270 degrees.",
  alternates: {
    canonical: "/rotate-pdf/",
  },
  openGraph: {
    title: "Rotate PDF Pages Online Free | SoloTools",
    description: "Rotate all PDF pages or selected pages by 90, 180, or 270 degrees.",
    url: "https://solotools-1ou.pages.dev/rotate-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfToolPage
      title="Rotate PDF Pages"
      description="Rotate all PDF pages or selected pages by 90, 180, or 270 degrees."
      canonicalPath="/rotate-pdf/"
      mode="rotate"
      imageType="all"
      infoTitle="Fix incorrectly rotated PDF pages"
      infoText="Leave the page field blank to rotate every page, or enter individual pages and page ranges."
    />
  );
}
