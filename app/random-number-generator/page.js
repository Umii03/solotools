import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "Random Number Generator Online",
  description: "Generate one or multiple random integers between a minimum and maximum value.",
  alternates: {
    canonical: "/random-number-generator/",
  },
  openGraph: {
    title: "Random Number Generator Online | SoloTools",
    description: "Generate one or multiple random integers between a minimum and maximum value.",
    url:
      "https://solotools-1ou.pages.dev/random-number-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="Random Number Generator"
      description="Generate one or multiple random integers between a minimum and maximum value."
      canonicalPath="/random-number-generator/"
      mode="random"
      category="Developer tool"
      infoTitle="Generate secure random integers"
      infoText="Choose the minimum, maximum, and number of results. Generation happens locally using browser cryptographic randomness."
    />
  );
}