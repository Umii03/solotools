import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "Duplicate Line Remover Online",
  description: "Remove repeated lines while preserving the first occurrence and original line order.",
  alternates: {
    canonical: "/duplicate-line-remover/",
  },
  openGraph: {
    title: "Duplicate Line Remover Online | SoloTools",
    description: "Remove repeated lines while preserving the first occurrence and original line order.",
    url:
      "https://solotools-1ou.pages.dev/duplicate-line-remover/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="Duplicate Line Remover"
      description="Remove repeated lines while preserving the first occurrence and original line order."
      canonicalPath="/duplicate-line-remover/"
      mode="duplicates"
      category="Text tool"
      infoTitle="Clean repeated lines"
      infoText="Paste a list or block of text and SoloTools removes exact duplicate lines while keeping the first occurrence."
    />
  );
}