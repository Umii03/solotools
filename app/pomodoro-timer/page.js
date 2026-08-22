import ColorTimeToolPage from "../components/ColorTimeToolPage";

export const metadata = {
  title: "Pomodoro Timer",
  description: "Use focus, short-break, and long-break Pomodoro timers.",
  alternates: {
    canonical: "/pomodoro-timer/",
  },
  openGraph: {
    title: "Pomodoro Timer | SoloTools",
    description: "Use focus, short-break, and long-break Pomodoro timers.",
    url: "https://solotools-1ou.pages.dev/pomodoro-timer/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <ColorTimeToolPage
      title={"Pomodoro Timer"}
      description={"Use focus, short-break, and long-break Pomodoro timers."}
      canonicalPath={"/pomodoro-timer/"}
      categoryName={"Time Tools"}
      categoryHref={"/time-tools/"}
      mode={"pomodoro"}
    />
  );
}
