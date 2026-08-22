import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Color Converter",
  description: "Convert HEX colors into RGB and HSL color values.",
  alternates: {
    canonical: "/color-converter/",
  },
  openGraph: {
    title: "Color Converter | SoloTools",
    description: "Convert HEX colors into RGB and HSL color values.",
    url: "https://solotools-1ou.pages.dev/color-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Color Converter"}
      description={"Convert HEX colors into RGB and HSL color values."}
      canonicalPath={"/color-converter/"}
      categoryName={"Color Tools"}
      categoryHref={"/color-tools/"}
      mode={"color-converter"}
    />
  );
}
