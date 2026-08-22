import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "Character Counter Online Free",
  description: "Count characters with and without spaces, words, lines, sentences, and paragraphs.",
  alternates: {
    canonical: "/character-counter/",
  },
  openGraph: {
    title: "Character Counter Online Free | SoloTools",
    description: "Count characters with and without spaces, words, lines, sentences, and paragraphs.",
    url:
      "https://solotools-1ou.pages.dev/character-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="Character Counter"
      description="Count characters with and without spaces, words, lines, sentences, and paragraphs."
      canonicalPath="/character-counter/"
      mode="character"
      section="Free text tool"
      infoTitle="Check text length instantly"
      infoText="Use the character counter for social posts, forms, metadata, writing limits, and other text-length checks."
    />
  );
}
