import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "CSV to JSON Converter Online",
  description: "Convert CSV data with a header row into formatted JSON.",
  alternates: {
    canonical: "/csv-to-json/",
  },
  openGraph: {
    title: "CSV to JSON Converter Online | SoloTools",
    description: "Convert CSV data with a header row into formatted JSON.",
    url:
      "https://solotools-1ou.pages.dev/csv-to-json/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="CSV to JSON Converter"
      description="Convert CSV data with a header row into formatted JSON."
      canonicalPath="/csv-to-json/"
      mode="csvjson"
      category="Developer tool"
      infoTitle="Turn CSV rows into JSON objects"
      infoText="The first CSV row is used as object property names and each later row becomes one JSON object."
    />
  );
}