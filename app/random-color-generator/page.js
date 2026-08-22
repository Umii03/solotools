import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Random Color Generator",
  description: "Generate random colors with HEX, RGB, and HSL values.",
  alternates: {
    canonical: "/random-color-generator/",
  },
  openGraph: {
    title: "Random Color Generator | SoloTools",
    description: "Generate random colors with HEX, RGB, and HSL values.",
    url: "https://solotools-1ou.pages.dev/random-color-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Random Color Generator"}
      description={"Generate random colors with HEX, RGB, and HSL values."}
      canonicalPath={"/random-color-generator/"}
      categoryName={"Color Tools"}
      categoryHref={"/color-tools/"}
      mode={"random-color"}
    />
  );
}
