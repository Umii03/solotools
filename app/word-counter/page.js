import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "Word Counter Online Free",
  description: "Count words, characters, sentences, paragraphs, and estimated reading time instantly.",
  alternates: {
    canonical: "/word-counter/",
  },
  openGraph: {
    title: "Word Counter Online Free | SoloTools",
    description: "Count words, characters, sentences, paragraphs, and estimated reading time instantly.",
    url:
      "https://solotools-1ou.pages.dev/word-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and estimated reading time instantly."
      canonicalPath="/word-counter/"
      mode="word"
      section="Free text tool"
      infoTitle="Count words as you type"
      infoText="Paste or type text to see live word and character statistics without sending your writing to a SoloTools server."
    />
  );
}
