import UnitConverterPage from "../components/UnitConverterPage";

export const metadata = {
  title: "Volume Converter",
  description: "Convert liters, milliliters, gallons, cups, tablespoons, teaspoons, and other volume units.",
  alternates: {
    canonical: "/volume-converter/",
  },
  openGraph: {
    title: "Volume Converter | SoloTools",
    description: "Convert liters, milliliters, gallons, cups, tablespoons, teaspoons, and other volume units.",
    url: "https://solotools-1ou.pages.dev/volume-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <UnitConverterPage
      title={"Volume Converter"}
      description={"Convert liters, milliliters, gallons, cups, tablespoons, teaspoons, and other volume units."}
      canonicalPath={"/volume-converter/"}
      mode={"volume"}
    />
  );
}
