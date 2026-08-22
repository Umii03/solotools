import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Color Tools",
  description:
    "Convert colors, check contrast, generate gradients, create palettes, and discover random colors.",
  alternates: {
    canonical:
      "/color-tools/",
  },
  openGraph: {
    title:
      "Free Color Tools | SoloTools",
    description:
      "Free browser-based color utilities for designers, developers, and everyday web work.",
    url:
      "https://solotools-1ou.pages.dev/color-tools/",
    type:
      "website",
  },
};

export default function ColorToolsPage() {
  return (
    <ToolCategoryHub
      category="color"
      eyebrow="Free online color tools"
      title="Color Tools"
      description="Convert colors, check accessibility contrast, generate CSS gradients, create palettes, and discover random colors."
      privacyText="Color calculations run directly in your browser."
    />
  );
}
