import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "Unix Timestamp Converter Online",
  description: "Convert dates to Unix timestamps or timestamps back into readable dates.",
  alternates: {
    canonical: "/unix-timestamp-converter/",
  },
  openGraph: {
    title: "Unix Timestamp Converter Online | SoloTools",
    description: "Convert dates to Unix timestamps or timestamps back into readable dates.",
    url:
      "https://solotools-1ou.pages.dev/unix-timestamp-converter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="Unix Timestamp Converter"
      description="Convert dates to Unix timestamps or timestamps back into readable dates."
      canonicalPath="/unix-timestamp-converter/"
      mode="timestamp"
      category="Developer tool"
      infoTitle="Convert Unix time and dates"
      infoText="Convert local date-time input to Unix seconds and milliseconds, or enter an existing timestamp to view UTC, ISO, and local time."
    />
  );
}