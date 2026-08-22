import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "Secure Password Generator Online",
  description: "Generate secure random passwords with configurable length and character types.",
  alternates: {
    canonical: "/password-generator/",
  },
  openGraph: {
    title: "Secure Password Generator Online | SoloTools",
    description: "Generate secure random passwords with configurable length and character types.",
    url:
      "https://solotools-1ou.pages.dev/password-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="Password Generator"
      description="Generate secure random passwords with configurable length and character types."
      canonicalPath="/password-generator/"
      mode="password"
      category="Developer tool"
      infoTitle="Generate random passwords locally"
      infoText="The generator uses your browser's cryptographic random-number API and lets you choose uppercase letters, lowercase letters, numbers, and symbols."
    />
  );
}