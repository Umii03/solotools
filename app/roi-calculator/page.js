import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "ROI Calculator Online Free",
  description: "Calculate investment profit or loss and return on investment percentage.",
  alternates: {
    canonical: "/roi-calculator/",
  },
  openGraph: {
    title: "ROI Calculator Online Free | SoloTools",
    description: "Calculate investment profit or loss and return on investment percentage.",
    url:
      "https://solotools-1ou.pages.dev/roi-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="ROI Calculator"
      description="Calculate investment profit or loss and return on investment percentage."
      canonicalPath="/roi-calculator/"
      mode="roi"
      infoTitle="Measure return on investment"
      infoText="ROI compares investment profit or loss with the total amount invested."
      note=""
    />
  );
}