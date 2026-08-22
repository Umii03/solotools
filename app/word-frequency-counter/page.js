import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Word Frequency Counter Online",
  description: "Count how frequently each word appears in text.",
  alternates: {
    canonical: "/word-frequency-counter/",
  },
  openGraph: {
    title: "Word Frequency Counter Online | SoloTools",
    description: "Count how frequently each word appears in text.",
    url:
      "https://solotools-1ou.pages.dev/word-frequency-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Word Frequency Counter"
      description="Count how frequently each word appears in text."
      canonicalPath="/word-frequency-counter/"
      mode="frequency"
      category="Text tool"
      infoTitle="Analyze repeated words"
      infoText="Words are normalized to lowercase, counted, and sorted from most frequent to least frequent."
    />
  );
}