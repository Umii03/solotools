import WebToolkitPage from "../components/WebToolkitPage";

export const metadata = {
  title: "Meta Tag Generator",
  description: "Generate common HTML title, description, canonical, robots, and keyword metadata.",
  alternates: {
    canonical: "/meta-tag-generator/",
  },
  openGraph: {
    title: "Meta Tag Generator | SoloTools",
    description: "Generate common HTML title, description, canonical, robots, and keyword metadata.",
    url: "https://solotools-1ou.pages.dev/meta-tag-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <WebToolkitPage
      title={"Meta Tag Generator"}
      description={"Generate common HTML title, description, canonical, robots, and keyword metadata."}
      canonicalPath={"/meta-tag-generator/"}
      mode={"meta"}
    />
  );
}
