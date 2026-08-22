import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Sentence Counter Online Free",
  description: "Estimate the number of sentences in a block of text.",
  alternates: {
    canonical: "/sentence-counter/",
  },
  openGraph: {
    title: "Sentence Counter Online Free | SoloTools",
    description: "Estimate the number of sentences in a block of text.",
    url:
      "https://solotools-1ou.pages.dev/sentence-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Sentence Counter"
      description="Estimate the number of sentences in a block of text."
      canonicalPath="/sentence-counter/"
      mode="sentence"
      category="Text tool"
      infoTitle="Count sentences in text"
      infoText="The counter uses common sentence-ending punctuation to estimate the number of sentences."
    />
  );
}