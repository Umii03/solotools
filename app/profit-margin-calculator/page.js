import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "Profit Margin Calculator Online",
  description: "Calculate profit, profit margin, and markup from revenue or selling price and cost.",
  alternates: {
    canonical: "/profit-margin-calculator/",
  },
  openGraph: {
    title: "Profit Margin Calculator Online | SoloTools",
    description: "Calculate profit, profit margin, and markup from revenue or selling price and cost.",
    url:
      "https://solotools-1ou.pages.dev/profit-margin-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="Profit Margin Calculator"
      description="Calculate profit, profit margin, and markup from revenue or selling price and cost."
      canonicalPath="/profit-margin-calculator/"
      mode="profit"
      infoTitle="Understand margin and markup"
      infoText="Profit is revenue minus cost. Profit margin compares profit with revenue, while markup compares profit with cost."
    />
  );
}
