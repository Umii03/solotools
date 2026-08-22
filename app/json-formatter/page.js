import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "JSON Formatter and Validator Online",
  description: "Format, minify, and validate JSON directly in your browser.",
  alternates: {
    canonical: "/json-formatter/",
  },
  openGraph: {
    title: "JSON Formatter and Validator Online | SoloTools",
    description: "Format, minify, and validate JSON directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/json-formatter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="JSON Formatter & Validator"
      description="Format, minify, and validate JSON directly in your browser."
      canonicalPath="/json-formatter/"
      mode="json"
      section="Developer tool"
      infoTitle="Format and validate JSON"
      infoText="Paste JSON to pretty-print it, minify it, or check whether the JSON syntax is valid."
    />
  );
}
