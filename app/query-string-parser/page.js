import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Query String Parser Online",
  description: "Parse a URL or query string into formatted JSON.",
  alternates: {
    canonical: "/query-string-parser/",
  },
  openGraph: {
    title: "Query String Parser Online | SoloTools",
    description: "Parse a URL or query string into formatted JSON.",
    url:
      "https://solotools-1ou.pages.dev/query-string-parser/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Query String Parser"
      description="Parse a URL or query string into formatted JSON."
      canonicalPath="/query-string-parser/"
      mode="query"
      category="Developer tool"
      infoTitle="Inspect URL query parameters"
      infoText="Paste a full URL or only the query string. Repeated parameter names are preserved as arrays."
    />
  );
}