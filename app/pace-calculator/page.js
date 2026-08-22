import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Running Pace Calculator Online",
  description: "Calculate pace per kilometer or mile from distance and elapsed time.",
  alternates: {
    canonical: "/pace-calculator/",
  },
  openGraph: {
    title: "Running Pace Calculator Online | SoloTools",
    description: "Calculate pace per kilometer or mile from distance and elapsed time.",
    url:
      "https://solotools-1ou.pages.dev/pace-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Pace Calculator"
      description="Calculate pace per kilometer or mile from distance and elapsed time."
      canonicalPath="/pace-calculator/"
      mode="pace"
      infoTitle="Calculate pace from distance and time"
      infoText="Enter distance plus hours and minutes to calculate pace per selected distance unit and average speed."
      note=""
    />
  );
}