import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Online Image Tools",
  description:
    "Free browser image tools to convert, compress, resize, crop, rotate, flip, grayscale, and adjust JPG, PNG, and WebP images.",
  alternates: {
    canonical: "/image-tools/",
  },
};

export default function ImageToolsPage() {
  return (
    <ToolCategoryHub
      category="image"
      eyebrow="Free browser image utilities"
      title="Image Tools"
      description="Convert, compress, resize, crop, rotate, flip, and adjust JPG, PNG, and WebP images."
      privacyText="Supported image processing happens locally in your browser."
    />
  );
}