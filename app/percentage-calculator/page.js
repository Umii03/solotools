import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "Percentage Calculator Online Free",
  description: "Calculate percentages, find what percent one number is of another, or calculate percentage change.",
  alternates: {
    canonical: "/percentage-calculator/",
  },
  openGraph: {
    title: "Percentage Calculator Online Free | SoloTools",
    description: "Calculate percentages, find what percent one number is of another, or calculate percentage change.",
    url:
      "https://solotools-1ou.pages.dev/percentage-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="Percentage Calculator"
      description="Calculate percentages, find what percent one number is of another, or calculate percentage change."
      canonicalPath="/percentage-calculator/"
      mode="percentage"
      infoTitle="Calculate common percentages"
      infoText="Use SoloTools to find a percentage of a number, determine what percentage one value represents of another, or measure percentage increase and decrease."
    />
  );
}
