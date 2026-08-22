import UtilityToolPage from "../components/UtilityToolPage";

export const metadata = {
  title: "URL Encoder and Decoder Online",
  description: "Encode or decode URL components directly in your browser.",
  alternates: {
    canonical: "/url-encoder-decoder/",
  },
  openGraph: {
    title: "URL Encoder and Decoder Online | SoloTools",
    description: "Encode or decode URL components directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/url-encoder-decoder/",
    type: "website",
  },
};

export default function Page() {
  return (
    <UtilityToolPage
      title="URL Encoder & Decoder"
      description="Encode or decode URL components directly in your browser."
      canonicalPath="/url-encoder-decoder/"
      mode="url"
      section="Developer tool"
      infoTitle="Encode special URL characters"
      infoText="Convert text into URL-safe encoded values or decode percent-encoded URL components back into readable text."
    />
  );
}
