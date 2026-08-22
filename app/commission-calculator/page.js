import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Commission Calculator Online Free",
  description: "Calculate sales commission and total earnings from a commission rate.",
  alternates: {
    canonical: "/commission-calculator/",
  },
  openGraph: {
    title: "Commission Calculator Online Free | SoloTools",
    description: "Calculate sales commission and total earnings from a commission rate.",
    url:
      "https://solotools-1ou.pages.dev/commission-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Commission Calculator"
      description="Calculate sales commission and total earnings from a commission rate."
      canonicalPath="/commission-calculator/"
      mode="commission"
      infoTitle="Calculate commission earnings"
      infoText="Enter total sales, commission percentage, and optional base pay to estimate commission and combined earnings."
      note=""
    />
  );
}