import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "BMR Calculator Online Free",
  description: "Estimate basal metabolic rate using the Mifflin-St Jeor equation.",
  alternates: {
    canonical: "/bmr-calculator/",
  },
  openGraph: {
    title: "BMR Calculator Online Free | SoloTools",
    description: "Estimate basal metabolic rate using the Mifflin-St Jeor equation.",
    url:
      "https://solotools-1ou.pages.dev/bmr-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="BMR Calculator"
      description="Estimate basal metabolic rate using the Mifflin-St Jeor equation."
      canonicalPath="/bmr-calculator/"
      mode="bmr"
      infoTitle="Estimate resting energy needs"
      infoText="The calculator estimates the calories your body may use at rest from weight, height, age, and the sex-specific constants used by the Mifflin-St Jeor equation."
      note="This is an estimate for general information, not individualized medical or nutrition advice."
    />
  );
}