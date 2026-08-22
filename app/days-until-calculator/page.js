import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Days Until Calculator",
  description: "Calculate how many calendar days remain until or have passed since a selected date.",
  alternates: {
    canonical: "/days-until-calculator/",
  },
  openGraph: {
    title: "Days Until Calculator | SoloTools",
    description: "Calculate how many calendar days remain until or have passed since a selected date.",
    url: "https://solotools-1ou.pages.dev/days-until-calculator/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Days Until Calculator"}
      description={"Calculate how many calendar days remain until or have passed since a selected date."}
      canonicalPath={"/days-until-calculator/"}
      categoryName={"Time Tools"}
      categoryHref={"/time-tools/"}
      mode={"days-until"}
    />
  );
}
