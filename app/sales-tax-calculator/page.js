import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Sales Tax Calculator Online Free",
  description: "Calculate sales tax, tax amount, and total purchase price.",
  alternates: {
    canonical: "/sales-tax-calculator/",
  },
  openGraph: {
    title: "Sales Tax Calculator Online Free | SoloTools",
    description: "Calculate sales tax, tax amount, and total purchase price.",
    url:
      "https://solotools-1ou.pages.dev/sales-tax-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Sales Tax Calculator"
      description="Calculate sales tax, tax amount, and total purchase price."
      canonicalPath="/sales-tax-calculator/"
      mode="salesTax"
      infoTitle="Calculate sales tax quickly"
      infoText="Enter the price before tax and the applicable sales-tax percentage to calculate the tax amount and final total."
      note="Tax rules and taxable items vary by location. This calculator performs the mathematical calculation only."
    />
  );
}