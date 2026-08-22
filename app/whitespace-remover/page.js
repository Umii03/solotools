import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Whitespace Remover Online Free",
  description: "Clean repeated spaces, tabs, and excessive blank lines.",
  alternates: {
    canonical: "/whitespace-remover/",
  },
  openGraph: {
    title: "Whitespace Remover Online Free | SoloTools",
    description: "Clean repeated spaces, tabs, and excessive blank lines.",
    url:
      "https://solotools-1ou.pages.dev/whitespace-remover/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Whitespace Remover"
      description="Clean repeated spaces, tabs, and excessive blank lines."
      canonicalPath="/whitespace-remover/"
      mode="whitespace"
      category="Text tool"
      infoTitle="Clean unnecessary whitespace"
      infoText="SoloTools trims each line, collapses repeated spaces and tabs, and reduces excessive blank lines."
    />
  );
}