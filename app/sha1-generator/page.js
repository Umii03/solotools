import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "SHA-1 Hash Generator Online",
  description: "Generate a SHA-1 hash from text using your browser.",
  alternates: {
    canonical: "/sha1-generator/",
  },
  openGraph: {
    title: "SHA-1 Hash Generator Online | SoloTools",
    description: "Generate a SHA-1 hash from text using your browser.",
    url:
      "https://solotools-1ou.pages.dev/sha1-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="SHA-1 Generator"
      description="Generate a SHA-1 hash from text using your browser."
      canonicalPath="/sha1-generator/"
      mode="sha1"
      category="Developer tool"
      infoTitle="Generate a SHA-1 digest"
      infoText="SoloTools uses the Web Crypto API to hash UTF-8 text and display the hexadecimal digest."
    />
  );
}