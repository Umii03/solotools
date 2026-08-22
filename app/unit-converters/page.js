import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Unit Converters",
  description:
    "Convert length, weight, temperature, area, volume, and digital storage units for free.",
  alternates: {
    canonical:
      "/unit-converters/",
  },
  openGraph: {
    title:
      "Free Unit Converters | SoloTools",
    description:
      "Free browser-based measurement and digital storage converters.",
    url:
      "https://solotools-1ou.pages.dev/unit-converters/",
    type:
      "website",
  },
};

export default function UnitConvertersPage() {
  return (
    <ToolCategoryHub
      category="unit"
      eyebrow="Free online unit converters"
      title="Unit Converters"
      description="Convert common measurements including length, weight, temperature, area, volume, and digital storage units."
      privacyText="Conversions run directly in your browser."
    />
  );
}
