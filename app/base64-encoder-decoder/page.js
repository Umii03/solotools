import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "Base64 Encoder and Decoder Online",
  description: "Encode UTF-8 text to Base64 or decode Base64 back into readable text.",
  alternates: {
    canonical: "/base64-encoder-decoder/",
  },
  openGraph: {
    title: "Base64 Encoder and Decoder Online | SoloTools",
    description: "Encode UTF-8 text to Base64 or decode Base64 back into readable text.",
    url:
      "https://solotools-1ou.pages.dev/base64-encoder-decoder/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="Base64 Encoder & Decoder"
      description="Encode UTF-8 text to Base64 or decode Base64 back into readable text."
      canonicalPath="/base64-encoder-decoder/"
      mode="base64"
      section="Developer tool"
      infoTitle="Convert text to and from Base64"
      infoText="Base64 is commonly used to represent binary or text data using printable characters. This tool supports Unicode text through UTF-8."
    />
  );
}
