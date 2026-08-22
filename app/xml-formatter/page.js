import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "XML Formatter and Validator Online",
  description: "Validate and pretty-print XML directly in your browser.",
  alternates: {
    canonical: "/xml-formatter/",
  },
  openGraph: {
    title: "XML Formatter and Validator Online | SoloTools",
    description: "Validate and pretty-print XML directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/xml-formatter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="XML Formatter"
      description="Validate and pretty-print XML directly in your browser."
      canonicalPath="/xml-formatter/"
      mode="xml"
      category="Developer tool"
      infoTitle="Format readable XML"
      infoText="Paste XML to validate its structure and generate an indented version that is easier to inspect."
    />
  );
}