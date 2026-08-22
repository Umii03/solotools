import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "JWT Decoder Online Free",
  description: "Decode JWT header and payload data without verifying the signature.",
  alternates: {
    canonical: "/jwt-decoder/",
  },
  openGraph: {
    title: "JWT Decoder Online Free | SoloTools",
    description: "Decode JWT header and payload data without verifying the signature.",
    url:
      "https://solotools-1ou.pages.dev/jwt-decoder/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="JWT Decoder"
      description="Decode JWT header and payload data without verifying the signature."
      canonicalPath="/jwt-decoder/"
      mode="jwt"
      category="Developer tool"
      infoTitle="Inspect JWT data"
      infoText="Paste a JSON Web Token to decode its Base64URL header and payload into readable formatted JSON."
    />
  );
}