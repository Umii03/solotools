import WebToolkitPage from "../components/WebToolkitPage";

export const metadata = {
  title: "Open Graph Meta Generator",
  description: "Generate Open Graph metadata for website and social sharing previews.",
  alternates: {
    canonical: "/open-graph-generator/",
  },
  openGraph: {
    title: "Open Graph Meta Generator | SoloTools",
    description: "Generate Open Graph metadata for website and social sharing previews.",
    url: "https://solotools-1ou.pages.dev/open-graph-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <WebToolkitPage
      title={"Open Graph Meta Generator"}
      description={"Generate Open Graph metadata for website and social sharing previews."}
      canonicalPath={"/open-graph-generator/"}
      mode={"open-graph"}
    />
  );
}
