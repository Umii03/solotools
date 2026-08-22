import UnitConverterPage from "../components/UnitConverterPage";

export const metadata = {
  title: "Length Converter",
  description: "Convert meters, kilometers, centimeters, millimeters, inches, feet, yards, and miles.",
  alternates: {
    canonical: "/length-converter/",
  },
  openGraph: {
    title: "Length Converter | SoloTools",
    description: "Convert meters, kilometers, centimeters, millimeters, inches, feet, yards, and miles.",
    url: "https://solotools-1ou.pages.dev/length-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <UnitConverterPage
      title={"Length Converter"}
      description={"Convert meters, kilometers, centimeters, millimeters, inches, feet, yards, and miles."}
      canonicalPath={"/length-converter/"}
      mode={"length"}
    />
  );
}
