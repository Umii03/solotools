import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Line Counter Online Free",
  description: "Count total, non-empty, and empty lines in text.",
  alternates: {
    canonical: "/line-counter/",
  },
  openGraph: {
    title: "Line Counter Online Free | SoloTools",
    description: "Count total, non-empty, and empty lines in text.",
    url:
      "https://solotools-1ou.pages.dev/line-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Line Counter"
      description="Count total, non-empty, and empty lines in text."
      canonicalPath="/line-counter/"
      mode="line"
      category="Text tool"
      infoTitle="Count lines instantly"
      infoText="Paste text to calculate total lines, lines containing content, and blank lines."
    />
  );
}