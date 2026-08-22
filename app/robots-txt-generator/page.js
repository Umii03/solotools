import WebToolkitPage from "../components/WebToolkitPage";

export const metadata = {
  title: "Robots.txt Generator",
  description: "Generate a robots.txt file with allow, disallow, and sitemap directives.",
  alternates: {
    canonical: "/robots-txt-generator/",
  },
  openGraph: {
    title: "Robots.txt Generator | SoloTools",
    description: "Generate a robots.txt file with allow, disallow, and sitemap directives.",
    url: "https://solotools-1ou.pages.dev/robots-txt-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <WebToolkitPage
      title={"Robots.txt Generator"}
      description={"Generate a robots.txt file with allow, disallow, and sitemap directives."}
      canonicalPath={"/robots-txt-generator/"}
      mode={"robots"}
    />
  );
}
