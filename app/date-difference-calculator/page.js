import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "Date Difference Calculator Online",
  description: "Calculate the number of days, weeks, extra days, and hours between two calendar dates.",
  alternates: {
    canonical: "/date-difference-calculator/",
  },
  openGraph: {
    title: "Date Difference Calculator Online | SoloTools",
    description: "Calculate the number of days, weeks, extra days, and hours between two calendar dates.",
    url:
      "https://solotools-1ou.pages.dev/date-difference-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="Date Difference Calculator"
      description="Calculate the number of days, weeks, extra days, and hours between two calendar dates."
      canonicalPath="/date-difference-calculator/"
      mode="date"
      infoTitle="Find the time between two dates"
      infoText="Choose a start date and end date to calculate the elapsed number of calendar days and its equivalent in complete weeks and hours."
    />
  );
}
