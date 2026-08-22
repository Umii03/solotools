import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Online Stopwatch",
  description: "Start, pause, resume, and reset a browser-based stopwatch.",
  alternates: {
    canonical: "/stopwatch/",
  },
  openGraph: {
    title: "Online Stopwatch | SoloTools",
    description: "Start, pause, resume, and reset a browser-based stopwatch.",
    url: "https://solotools-1ou.pages.dev/stopwatch/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Online Stopwatch"}
      description={"Start, pause, resume, and reset a browser-based stopwatch."}
      canonicalPath={"/stopwatch/"}
      categoryName={"Time Tools"}
      categoryHref={"/time-tools/"}
      mode={"stopwatch"}
    />
  );
}
