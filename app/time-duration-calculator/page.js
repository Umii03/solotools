import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Time Duration Calculator Online",
  description: "Calculate the duration between two clock times.",
  alternates: {
    canonical: "/time-duration-calculator/",
  },
  openGraph: {
    title: "Time Duration Calculator Online | SoloTools",
    description: "Calculate the duration between two clock times.",
    url:
      "https://solotools-1ou.pages.dev/time-duration-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Time Duration Calculator"
      description="Calculate the duration between two clock times."
      canonicalPath="/time-duration-calculator/"
      mode="duration"
      infoTitle="Calculate elapsed clock time"
      infoText="Choose a start time and end time. If the end time is earlier, SoloTools treats it as the following day."
      note=""
    />
  );
}