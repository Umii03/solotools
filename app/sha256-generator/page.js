import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "SHA-256 Hash Generator Online",
  description: "Generate a SHA-256 hash from text directly in your browser.",
  alternates: {
    canonical: "/sha256-generator/",
  },
  openGraph: {
    title: "SHA-256 Hash Generator Online | SoloTools",
    description: "Generate a SHA-256 hash from text directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/sha256-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="SHA-256 Generator"
      description="Generate a SHA-256 hash from text directly in your browser."
      canonicalPath="/sha256-generator/"
      mode="sha256"
      category="Developer tool"
      infoTitle="Hash text with SHA-256"
      infoText="SoloTools uses the browser Web Crypto API to calculate the SHA-256 digest of UTF-8 text."
    />
  );
}