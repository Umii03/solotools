import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Break-even Calculator Online",
  description: "Calculate break-even units and break-even revenue from fixed and variable costs.",
  alternates: {
    canonical: "/break-even-calculator/",
  },
  openGraph: {
    title: "Break-even Calculator Online | SoloTools",
    description: "Calculate break-even units and break-even revenue from fixed and variable costs.",
    url:
      "https://solotools-1ou.pages.dev/break-even-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Break-even Calculator"
      description="Calculate break-even units and break-even revenue from fixed and variable costs."
      canonicalPath="/break-even-calculator/"
      mode="breakeven"
      infoTitle="Find your break-even point"
      infoText="The break-even point estimates how many units must be sold for total contribution margin to cover fixed costs."
      note=""
    />
  );
}