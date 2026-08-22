import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "JSON to CSV Converter Online",
  description: "Convert JSON objects or arrays of objects into CSV directly in your browser.",
  alternates: {
    canonical: "/json-to-csv/",
  },
  openGraph: {
    title: "JSON to CSV Converter Online | SoloTools",
    description: "Convert JSON objects or arrays of objects into CSV directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/json-to-csv/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="JSON to CSV Converter"
      description="Convert JSON objects or arrays of objects into CSV directly in your browser."
      canonicalPath="/json-to-csv/"
      mode="jsoncsv"
      category="Developer tool"
      infoTitle="Convert structured JSON into CSV"
      infoText="The converter collects object keys as CSV columns and correctly quotes cells containing commas, quotes, or line breaks."
    />
  );
}