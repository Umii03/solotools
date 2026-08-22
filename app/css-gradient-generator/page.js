import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "CSS Gradient Generator",
  description: "Create a two-color CSS linear gradient and copy the generated CSS.",
  alternates: {
    canonical: "/css-gradient-generator/",
  },
  openGraph: {
    title: "CSS Gradient Generator | SoloTools",
    description: "Create a two-color CSS linear gradient and copy the generated CSS.",
    url: "https://solotools-1ou.pages.dev/css-gradient-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"CSS Gradient Generator"}
      description={"Create a two-color CSS linear gradient and copy the generated CSS."}
      canonicalPath={"/css-gradient-generator/"}
      categoryName={"Color Tools"}
      categoryHref={"/color-tools/"}
      mode={"gradient"}
    />
  );
}
