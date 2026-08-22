import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Paragraph Counter Online",
  description: "Count paragraphs separated by blank lines.",
  alternates: {
    canonical: "/paragraph-counter/",
  },
  openGraph: {
    title: "Paragraph Counter Online | SoloTools",
    description: "Count paragraphs separated by blank lines.",
    url:
      "https://solotools-1ou.pages.dev/paragraph-counter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Paragraph Counter"
      description="Count paragraphs separated by blank lines."
      canonicalPath="/paragraph-counter/"
      mode="paragraph"
      category="Text tool"
      infoTitle="Count text paragraphs"
      infoText="Paragraphs are detected as blocks of text separated by one or more blank lines."
    />
  );
}