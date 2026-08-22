import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Text Repeater Online Free",
  description: "Repeat a block of text multiple times.",
  alternates: {
    canonical: "/text-repeater/",
  },
  openGraph: {
    title: "Text Repeater Online Free | SoloTools",
    description: "Repeat a block of text multiple times.",
    url:
      "https://solotools-1ou.pages.dev/text-repeater/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Text Repeater"
      description="Repeat a block of text multiple times."
      canonicalPath="/text-repeater/"
      mode="repeat"
      category="Text tool"
      infoTitle="Repeat text automatically"
      infoText="Choose a repeat count up to 100 and create repeated copies separated by new lines."
    />
  );
}