import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Find and Replace Text Online",
  description: "Find literal text and replace every occurrence.",
  alternates: {
    canonical: "/find-and-replace/",
  },
  openGraph: {
    title: "Find and Replace Text Online | SoloTools",
    description: "Find literal text and replace every occurrence.",
    url:
      "https://solotools-1ou.pages.dev/find-and-replace/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Find and Replace"
      description="Find literal text and replace every occurrence."
      canonicalPath="/find-and-replace/"
      mode="findReplace"
      category="Text tool"
      infoTitle="Replace repeated text quickly"
      infoText="Enter the exact text to find and its replacement. SoloTools replaces every literal occurrence."
    />
  );
}