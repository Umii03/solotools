import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "HTML Encoder and Decoder Online",
  description: "Encode HTML special characters or decode HTML entities.",
  alternates: {
    canonical: "/html-encoder-decoder/",
  },
  openGraph: {
    title: "HTML Encoder and Decoder Online | SoloTools",
    description: "Encode HTML special characters or decode HTML entities.",
    url:
      "https://solotools-1ou.pages.dev/html-encoder-decoder/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="HTML Encoder & Decoder"
      description="Encode HTML special characters or decode HTML entities."
      canonicalPath="/html-encoder-decoder/"
      mode="html"
      category="Developer tool"
      infoTitle="Encode and decode HTML entities"
      infoText="Convert characters such as angle brackets, quotes, and ampersands into HTML entities or decode entities back into text."
    />
  );
}