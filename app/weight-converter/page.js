import UnitConverterPage from "../components/UnitConverterPage";

export const metadata = {
  title: "Weight Converter",
  description: "Convert kilograms, grams, milligrams, pounds, ounces, and stone.",
  alternates: {
    canonical: "/weight-converter/",
  },
  openGraph: {
    title: "Weight Converter | SoloTools",
    description: "Convert kilograms, grams, milligrams, pounds, ounces, and stone.",
    url: "https://solotools-1ou.pages.dev/weight-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <UnitConverterPage
      title={"Weight Converter"}
      description={"Convert kilograms, grams, milligrams, pounds, ounces, and stone."}
      canonicalPath={"/weight-converter/"}
      mode={"weight"}
    />
  );
}
