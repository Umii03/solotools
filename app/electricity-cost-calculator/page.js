import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Electricity Cost Calculator Online",
  description: "Estimate appliance electricity usage in kWh and operating cost.",
  alternates: {
    canonical: "/electricity-cost-calculator/",
  },
  openGraph: {
    title: "Electricity Cost Calculator Online | SoloTools",
    description: "Estimate appliance electricity usage in kWh and operating cost.",
    url:
      "https://solotools-1ou.pages.dev/electricity-cost-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Electricity Cost Calculator"
      description="Estimate appliance electricity usage in kWh and operating cost."
      canonicalPath="/electricity-cost-calculator/"
      mode="electricity"
      infoTitle="Estimate appliance energy cost"
      infoText="Energy usage is estimated from appliance wattage, daily usage time, number of days, and your electricity price per kilowatt-hour."
      note=""
    />
  );
}