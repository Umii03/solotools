import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Time Tools",
  description:
    "Use free countdown, stopwatch, Pomodoro, and days-until tools directly in your browser.",
  alternates: {
    canonical:
      "/time-tools/",
  },
  openGraph: {
    title:
      "Free Time Tools | SoloTools",
    description:
      "Free browser-based timers and date countdown utilities.",
    url:
      "https://solotools-1ou.pages.dev/time-tools/",
    type:
      "website",
  },
};

export default function TimeToolsPage() {
  return (
    <ToolCategoryHub
      category="time"
      eyebrow="Free online time tools"
      title="Time Tools"
      description="Use countdowns, stopwatch controls, Pomodoro focus sessions, and days-until calculations."
      privacyText="Timers and date calculations run directly in your browser."
    />
  );
}
