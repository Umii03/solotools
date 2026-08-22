import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Countdown Timer",
  description: "Count down to a selected date and time in days, hours, minutes, and seconds.",
  alternates: {
    canonical: "/countdown-timer/",
  },
  openGraph: {
    title: "Countdown Timer | SoloTools",
    description: "Count down to a selected date and time in days, hours, minutes, and seconds.",
    url: "https://solotools-1ou.pages.dev/countdown-timer/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Countdown Timer"}
      description={"Count down to a selected date and time in days, hours, minutes, and seconds."}
      canonicalPath={"/countdown-timer/"}
      categoryName={"Time Tools"}
      categoryHref={"/time-tools/"}
      mode={"countdown"}
    />
  );
}
