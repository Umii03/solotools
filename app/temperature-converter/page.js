import UnitConverterPage from "../components/UnitConverterPage";

export const metadata = {
  title: "Temperature Converter",
  description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin.",
  alternates: {
    canonical: "/temperature-converter/",
  },
  openGraph: {
    title: "Temperature Converter | SoloTools",
    description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin.",
    url: "https://solotools-1ou.pages.dev/temperature-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <UnitConverterPage
      title={"Temperature Converter"}
      description={"Convert temperatures between Celsius, Fahrenheit, and Kelvin."}
      canonicalPath={"/temperature-converter/"}
      mode={"temperature"}
    />
  );
}
