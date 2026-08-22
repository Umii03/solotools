import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Online Text Tools",
  description:
    "Free browser text tools to count, clean, sort, and transform text.",
  alternates: {
    canonical: "/text-tools/",
  },
};

export default function TextToolsPage() {
  return (
    <ToolCategoryHub
      category="text"
      eyebrow="Free writing utilities"
      title="Text Tools"
      description="Count, clean, sort, and transform text directly in your browser."
      privacyText="Your text stays in your browser for supported tools."
    />
  );
}