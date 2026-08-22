import WebToolkitPage from "../components/WebToolkitPage";

export const metadata = {
  title: "Favicon Generator",
  description: "Generate common PNG favicon sizes from an image and download them individually or as a ZIP.",
  alternates: {
    canonical: "/favicon-generator/",
  },
  openGraph: {
    title: "Favicon Generator | SoloTools",
    description: "Generate common PNG favicon sizes from an image and download them individually or as a ZIP.",
    url: "https://solotools-1ou.pages.dev/favicon-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <WebToolkitPage
      title={"Favicon Generator"}
      description={"Generate common PNG favicon sizes from an image and download them individually or as a ZIP."}
      canonicalPath={"/favicon-generator/"}
      mode={"favicon"}
    />
  );
}
