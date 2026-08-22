import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Online PDF Tools",
  description:
    "Free browser PDF tools to merge, split, compress, convert, organize, rotate, crop, watermark, sign, inspect, and edit PDF files.",
  alternates: {
    canonical: "/pdf-tools/",
  },
};

export default function PdfToolsPage() {
  return (
    <ToolCategoryHub
      category="pdf"
      eyebrow="Free browser PDF utilities"
      title="PDF Tools"
      description="Merge, split, compress, convert, organize, edit, inspect, and create PDFs directly in your browser."
      privacyText="Supported PDF operations process files locally on your device."
    />
  );
}