import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Color Contrast Checker",
  description: "Check color contrast ratios and common WCAG AA and AAA thresholds.",
  alternates: {
    canonical: "/color-contrast-checker/",
  },
  openGraph: {
    title: "Color Contrast Checker | SoloTools",
    description: "Check color contrast ratios and common WCAG AA and AAA thresholds.",
    url: "https://solotools-1ou.pages.dev/color-contrast-checker/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Color Contrast Checker"}
      description={"Check color contrast ratios and common WCAG AA and AAA thresholds."}
      canonicalPath={"/color-contrast-checker/"}
      categoryName={"Color Tools"}
      categoryHref={"/color-tools/"}
      mode={"contrast"}
    />
  );
}
