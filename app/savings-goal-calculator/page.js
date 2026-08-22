import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Savings Goal Calculator Online",
  description: "Estimate the monthly amount needed to reach a savings goal.",
  alternates: {
    canonical: "/savings-goal-calculator/",
  },
  openGraph: {
    title: "Savings Goal Calculator Online | SoloTools",
    description: "Estimate the monthly amount needed to reach a savings goal.",
    url:
      "https://solotools-1ou.pages.dev/savings-goal-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Savings Goal Calculator"
      description="Estimate the monthly amount needed to reach a savings goal."
      canonicalPath="/savings-goal-calculator/"
      mode="savings"
      infoTitle="Plan monthly savings"
      infoText="The calculator projects current savings using the entered annual return and estimates the monthly end-of-month contribution required to reach your target."
      note="Investment returns are not guaranteed. The calculation is an estimate and excludes taxes, fees, and changing rates."
    />
  );
}