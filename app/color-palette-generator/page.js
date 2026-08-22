import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Color Palette Generator",
  description: "Generate light and dark color variations from a selected base color.",
  alternates: {
    canonical: "/color-palette-generator/",
  },
  openGraph: {
    title: "Color Palette Generator | SoloTools",
    description: "Generate light and dark color variations from a selected base color.",
    url: "https://solotools-1ou.pages.dev/color-palette-generator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Color Palette Generator"}
      description={"Generate light and dark color variations from a selected base color."}
      canonicalPath={"/color-palette-generator/"}
      categoryName={"Color Tools"}
      categoryHref={"/color-tools/"}
      mode={"palette"}
    />
  );
}
