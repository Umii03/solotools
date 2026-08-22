import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "Case Converter Online Free",
  description: "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, or kebab-case.",
  alternates: {
    canonical: "/case-converter/",
  },
  openGraph: {
    title: "Case Converter Online Free | SoloTools",
    description: "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, or kebab-case.",
    url:
      "https://solotools-1ou.pages.dev/case-converter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="Case Converter"
      description="Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, or kebab-case."
      canonicalPath="/case-converter/"
      mode="case"
      section="Free text tool"
      infoTitle="Change text capitalization quickly"
      infoText="Convert existing text into common writing and programming case styles without manually rewriting it."
    />
  );
}
