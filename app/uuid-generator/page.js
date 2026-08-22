import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "UUID Generator Online Free",
  description: "Generate one or multiple random UUID version 4 identifiers directly in your browser.",
  alternates: {
    canonical: "/uuid-generator/",
  },
  openGraph: {
    title: "UUID Generator Online Free | SoloTools",
    description: "Generate one or multiple random UUID version 4 identifiers directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/uuid-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="UUID Generator"
      description="Generate one or multiple random UUID version 4 identifiers directly in your browser."
      canonicalPath="/uuid-generator/"
      mode="uuid"
      section="Developer tool"
      infoTitle="Generate UUID v4 values"
      infoText="Create random version 4 UUIDs for development, testing, sample data, database records, and application identifiers."
    />
  );
}
