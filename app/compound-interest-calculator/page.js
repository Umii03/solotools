import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Compound Interest Calculator",
  description: "Calculate compound growth, final balance, and total interest.",
  alternates: {
    canonical: "/compound-interest-calculator/",
  },
  openGraph: {
    title: "Compound Interest Calculator | SoloTools",
    description: "Calculate compound growth, final balance, and total interest.",
    url:
      "https://solotools-1ou.pages.dev/compound-interest-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Compound Interest Calculator"
      description="Calculate compound growth, final balance, and total interest."
      canonicalPath="/compound-interest-calculator/"
      mode="compound"
      infoTitle="Calculate compound growth"
      infoText="Compound interest adds interest to the balance repeatedly according to the selected compounding frequency."
      note="Results are mathematical estimates and do not include taxes, fees, changing rates, or investment risk."
    />
  );
}