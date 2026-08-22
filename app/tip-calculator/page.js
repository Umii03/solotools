import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Tip Calculator Online Free",
  description: "Calculate tip amount, total bill, and cost per person.",
  alternates: {
    canonical: "/tip-calculator/",
  },
  openGraph: {
    title: "Tip Calculator Online Free | SoloTools",
    description: "Calculate tip amount, total bill, and cost per person.",
    url:
      "https://solotools-1ou.pages.dev/tip-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Tip Calculator"
      description="Calculate tip amount, total bill, and cost per person."
      canonicalPath="/tip-calculator/"
      mode="tip"
      infoTitle="Split bills and tips quickly"
      infoText="Enter the bill, tip percentage, and number of people to calculate the total tip, final bill, and each person's share."
      note=""
    />
  );
}