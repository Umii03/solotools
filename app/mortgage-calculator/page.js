import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Mortgage Calculator Online Free",
  description: "Estimate mortgage principal and monthly principal-and-interest payment.",
  alternates: {
    canonical: "/mortgage-calculator/",
  },
  openGraph: {
    title: "Mortgage Calculator Online Free | SoloTools",
    description: "Estimate mortgage principal and monthly principal-and-interest payment.",
    url:
      "https://solotools-1ou.pages.dev/mortgage-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Mortgage Calculator"
      description="Estimate mortgage principal and monthly principal-and-interest payment."
      canonicalPath="/mortgage-calculator/"
      mode="mortgage"
      infoTitle="Estimate mortgage payments"
      infoText="Enter the home price, down payment, annual interest rate, and loan term to estimate the monthly principal-and-interest payment."
      note="This estimate excludes property taxes, insurance, fees, HOA costs, and other lender charges."
    />
  );
}