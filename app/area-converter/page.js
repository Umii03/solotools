import UnitConverterPage from "../components/UnitConverterPage";

export const metadata = {
  title: "Area Converter",
  description: "Convert square meters, square feet, acres, hectares, square miles, and other area units.",
  alternates: {
    canonical: "/area-converter/",
  },
  openGraph: {
    title: "Area Converter | SoloTools",
    description: "Convert square meters, square feet, acres, hectares, square miles, and other area units.",
    url: "https://solotools-1ou.pages.dev/area-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <UnitConverterPage
      title={"Area Converter"}
      description={"Convert square meters, square feet, acres, hectares, square miles, and other area units."}
      canonicalPath={"/area-converter/"}
      mode={"area"}
    />
  );
}
