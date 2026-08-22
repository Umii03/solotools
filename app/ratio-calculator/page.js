import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Ratio Calculator Online Free",
  description: "Simplify integer ratios and calculate the relationship between two values.",
  alternates: {
    canonical: "/ratio-calculator/",
  },
  openGraph: {
    title: "Ratio Calculator Online Free | SoloTools",
    description: "Simplify integer ratios and calculate the relationship between two values.",
    url:
      "https://solotools-1ou.pages.dev/ratio-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Ratio Calculator"
      description="Simplify integer ratios and calculate the relationship between two values."
      canonicalPath="/ratio-calculator/"
      mode="ratio"
      infoTitle="Simplify a ratio"
      infoText="SoloTools finds the greatest common divisor and reduces both whole-number values to their simplest ratio."
      note=""
    />
  );
}