import GrowthCalculatorPage from "../components/GrowthCalculatorPage";

export const metadata = {
  title: "Simple Interest Calculator",
  description: "Calculate simple interest and the final balance from principal, rate, and time.",
  alternates: {
    canonical: "/simple-interest-calculator/",
  },
  openGraph: {
    title: "Simple Interest Calculator | SoloTools",
    description: "Calculate simple interest and the final balance from principal, rate, and time.",
    url:
      "https://solotools-1ou.pages.dev/simple-interest-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthCalculatorPage
      title="Simple Interest Calculator"
      description="Calculate simple interest and the final balance from principal, rate, and time."
      canonicalPath="/simple-interest-calculator/"
      mode="simple"
      infoTitle="Calculate simple interest"
      infoText="Simple interest is calculated only on the original principal using principal multiplied by annual rate multiplied by time."
      note=""
    />
  );
}