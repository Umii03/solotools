import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "BMI Calculator Online Free",
  description: "Calculate body mass index using metric or US units.",
  alternates: {
    canonical: "/bmi-calculator/",
  },
  openGraph: {
    title: "BMI Calculator Online Free | SoloTools",
    description: "Calculate body mass index using metric or US units.",
    url:
      "https://solotools-1ou.pages.dev/bmi-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="BMI Calculator"
      description="Calculate body mass index using metric or US units."
      canonicalPath="/bmi-calculator/"
      mode="bmi"
      infoTitle="Calculate BMI from height and weight"
      infoText="BMI divides body weight by the square of height and is commonly used as a general adult screening measure."
      note="BMI is a general screening calculation and is not a medical diagnosis. Individual health assessment can require additional information."
    />
  );
}