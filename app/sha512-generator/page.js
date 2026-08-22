import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "SHA-512 Hash Generator Online",
  description: "Generate a SHA-512 hash from text using Web Crypto.",
  alternates: {
    canonical: "/sha512-generator/",
  },
  openGraph: {
    title: "SHA-512 Hash Generator Online | SoloTools",
    description: "Generate a SHA-512 hash from text using Web Crypto.",
    url:
      "https://solotools-1ou.pages.dev/sha512-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="SHA-512 Generator"
      description="Generate a SHA-512 hash from text using Web Crypto."
      canonicalPath="/sha512-generator/"
      mode="sha512"
      category="Developer tool"
      infoTitle="Generate a SHA-512 digest"
      infoText="Text is converted to UTF-8 bytes and hashed locally using your browser Web Crypto implementation."
    />
  );
}