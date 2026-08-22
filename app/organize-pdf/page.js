import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "Organize PDF Pages Online Free",
  description: "Visually reorder, rotate, and delete PDF pages from one browser-based workspace.",
  alternates: {
    canonical: "/organize-pdf/",
  },
  openGraph: {
    title: "Organize PDF Pages Online Free | SoloTools",
    description: "Visually reorder, rotate, and delete PDF pages from one browser-based workspace.",
    url: "https://solotools-1ou.pages.dev/organize-pdf/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="Organize PDF Pages"
      description="Visually reorder, rotate, and delete PDF pages from one browser-based workspace."
      canonicalPath="/organize-pdf/"
      mode="organize"
      group="organize"
      infoTitle="Rearrange PDF pages visually"
      infoText="Drag page thumbnails into a new order or use the arrow buttons, rotate individual pages, and remove pages you no longer need."
      note=""
    />
  );
}