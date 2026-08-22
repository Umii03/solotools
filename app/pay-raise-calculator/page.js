import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Pay Raise Calculator Online Free",
  description: "Calculate a pay increase, new annual pay, and monthly increase.",
  alternates: {
    canonical: "/pay-raise-calculator/",
  },
  openGraph: {
    title: "Pay Raise Calculator Online Free | SoloTools",
    description: "Calculate a pay increase, new annual pay, and monthly increase.",
    url:
      "https://solotools-1ou.pages.dev/pay-raise-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Pay Raise Calculator"
      description="Calculate a pay increase, new annual pay, and monthly increase."
      canonicalPath="/pay-raise-calculator/"
      mode="raise"
      infoTitle="See the value of a pay raise"
      infoText="Enter current annual pay and the percentage increase to calculate the annual and monthly change."
      note=""
    />
  );
}