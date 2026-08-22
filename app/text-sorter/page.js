import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "Text Sorter Online Free",
  description: "Sort text lines alphabetically from A to Z or Z to A.",
  alternates: {
    canonical: "/text-sorter/",
  },
  openGraph: {
    title: "Text Sorter Online Free | SoloTools",
    description: "Sort text lines alphabetically from A to Z or Z to A.",
    url:
      "https://solotools-1ou.pages.dev/text-sorter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="Text Sorter"
      description="Sort text lines alphabetically from A to Z or Z to A."
      canonicalPath="/text-sorter/"
      mode="sort"
      category="Text tool"
      infoTitle="Sort lists and text lines"
      infoText="Paste one item per line and sort the list using case-insensitive, number-aware alphabetical ordering."
    />
  );
}