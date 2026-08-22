import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Daily Calorie Calculator Online",
  description: "Estimate daily maintenance calories from BMR and activity level.",
  alternates: {
    canonical: "/calorie-calculator/",
  },
  openGraph: {
    title: "Daily Calorie Calculator Online | SoloTools",
    description: "Estimate daily maintenance calories from BMR and activity level.",
    url:
      "https://solotools-1ou.pages.dev/calorie-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Calorie Calculator"
      description="Estimate daily maintenance calories from BMR and activity level."
      canonicalPath="/calorie-calculator/"
      mode="calorie"
      infoTitle="Estimate maintenance calories"
      infoText="SoloTools estimates BMR and multiplies it by the selected activity factor to provide a general maintenance-calorie estimate."
      note="Calorie requirements vary between people. This result is an estimate and is not individualized medical or dietary advice."
    />
  );
}