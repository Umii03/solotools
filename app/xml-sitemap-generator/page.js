import WebToolkitPage from "../components/WebToolkitPage";

export const metadata = {
  title: "XML Sitemap Generator",
  description: "Generate a basic XML sitemap from a list of absolute website URLs.",
  alternates: {
    canonical: "/xml-sitemap-generator/",
  },
  openGraph: {
    title: "XML Sitemap Generator | SoloTools",
    description: "Generate a basic XML sitemap from a list of absolute website URLs.",
    url: "https://solotools-1ou.pages.dev/xml-sitemap-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <WebToolkitPage
      title={"XML Sitemap Generator"}
      description={"Generate a basic XML sitemap from a list of absolute website URLs."}
      canonicalPath={"/xml-sitemap-generator/"}
      mode={"sitemap"}
    />
  );
}
