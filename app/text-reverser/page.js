import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Text Reverser Online Free",
  description: "Reverse the character order of text directly in your browser.",
  alternates: {
    canonical: "/text-reverser/",
  },
  openGraph: {
    title: "Text Reverser Online Free | SoloTools",
    description: "Reverse the character order of text directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/text-reverser/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Text Reverser"
      description="Reverse the character order of text directly in your browser."
      canonicalPath="/text-reverser/"
      mode="reverse"
      category="Text tool"
      infoTitle="Reverse text characters"
      infoText="The tool reverses the displayed character sequence while leaving your original input untouched."
    />
  );
}