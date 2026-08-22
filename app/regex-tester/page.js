import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Regex Tester Online Free",
  description: "Test JavaScript regular expressions against text and inspect matches.",
  alternates: {
    canonical: "/regex-tester/",
  },
  openGraph: {
    title: "Regex Tester Online Free | SoloTools",
    description: "Test JavaScript regular expressions against text and inspect matches.",
    url:
      "https://solotools-1ou.pages.dev/regex-tester/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Regex Tester"
      description="Test JavaScript regular expressions against text and inspect matches."
      canonicalPath="/regex-tester/"
      mode="regex"
      category="Developer tool"
      infoTitle="Test JavaScript regular expressions"
      infoText="Enter a regular-expression pattern and flags to see matching values and their starting positions."
    />
  );
}