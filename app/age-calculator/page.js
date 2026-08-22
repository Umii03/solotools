import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "Age Calculator Online Free",
  description: "Calculate age in years, months, days, and total days between a date of birth and another date.",
  alternates: {
    canonical: "/age-calculator/",
  },
  openGraph: {
    title: "Age Calculator Online Free | SoloTools",
    description: "Calculate age in years, months, days, and total days between a date of birth and another date.",
    url:
      "https://solotools-1ou.pages.dev/age-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="Age Calculator"
      description="Calculate age in years, months, days, and total days between a date of birth and another date."
      canonicalPath="/age-calculator/"
      mode="age"
      infoTitle="Calculate age between two dates"
      infoText="Choose a date of birth and an age-on date to calculate completed years, remaining months, days, and total elapsed days."
    />
  );
}
