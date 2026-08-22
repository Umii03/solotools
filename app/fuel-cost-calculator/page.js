import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Fuel Cost Calculator Online Free",
  description: "Estimate fuel usage and trip cost using metric or US units.",
  alternates: {
    canonical: "/fuel-cost-calculator/",
  },
  openGraph: {
    title: "Fuel Cost Calculator Online Free | SoloTools",
    description: "Estimate fuel usage and trip cost using metric or US units.",
    url:
      "https://solotools-1ou.pages.dev/fuel-cost-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Fuel Cost Calculator"
      description="Estimate fuel usage and trip cost using metric or US units."
      canonicalPath="/fuel-cost-calculator/"
      mode="fuel"
      infoTitle="Estimate trip fuel cost"
      infoText="Enter distance, vehicle efficiency, fuel price, and trip count to estimate the amount of fuel used and total cost."
      note=""
    />
  );
}