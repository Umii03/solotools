import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "Discount Calculator Online Free",
  description: "Calculate a discount amount and final sale price from the original price and discount percentage.",
  alternates: {
    canonical: "/discount-calculator/",
  },
  openGraph: {
    title: "Discount Calculator Online Free | SoloTools",
    description: "Calculate a discount amount and final sale price from the original price and discount percentage.",
    url:
      "https://solotools-1ou.pages.dev/discount-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="Discount Calculator"
      description="Calculate a discount amount and final sale price from the original price and discount percentage."
      canonicalPath="/discount-calculator/"
      mode="discount"
      infoTitle="Calculate sale prices quickly"
      infoText="Enter an original price and discount percentage to see how much you save and the final price after the discount."
    />
  );
}
