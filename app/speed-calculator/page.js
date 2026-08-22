import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Speed Calculator Online Free",
  description: "Calculate average speed from distance and travel time.",
  alternates: {
    canonical: "/speed-calculator/",
  },
  openGraph: {
    title: "Speed Calculator Online Free | SoloTools",
    description: "Calculate average speed from distance and travel time.",
    url:
      "https://solotools-1ou.pages.dev/speed-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Speed Calculator"
      description="Calculate average speed from distance and travel time."
      canonicalPath="/speed-calculator/"
      mode="speed"
      infoTitle="Calculate average travel speed"
      infoText="Average speed equals total distance divided by total travel time."
      note=""
    />
  );
}