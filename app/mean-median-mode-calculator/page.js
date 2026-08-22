import ExpansionCalculatorPage from "../components/ExpansionCalculatorPage";

export const metadata = {
  title: "Mean Median Mode Calculator",
  description: "Calculate mean, median, mode, range, and count from a list of numbers.",
  alternates: {
    canonical: "/mean-median-mode-calculator/",
  },
  openGraph: {
    title: "Mean Median Mode Calculator | SoloTools",
    description: "Calculate mean, median, mode, range, and count from a list of numbers.",
    url:
      "https://solotools-1ou.pages.dev/mean-median-mode-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionCalculatorPage
      title="Mean Median Mode Calculator"
      description="Calculate mean, median, mode, range, and count from a list of numbers."
      canonicalPath="/mean-median-mode-calculator/"
      mode="statistics"
      infoTitle="Calculate common statistics"
      infoText="Paste numbers separated by spaces or commas to calculate common descriptive statistics instantly."
      note=""
    />
  );
}