import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Hex to Text Converter Online",
  description: "Convert UTF-8 text to hexadecimal or hexadecimal bytes back into text.",
  alternates: {
    canonical: "/hex-text-converter/",
  },
  openGraph: {
    title: "Hex to Text Converter Online | SoloTools",
    description: "Convert UTF-8 text to hexadecimal or hexadecimal bytes back into text.",
    url:
      "https://solotools-1ou.pages.dev/hex-text-converter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Hex Text Converter"
      description="Convert UTF-8 text to hexadecimal or hexadecimal bytes back into text."
      canonicalPath="/hex-text-converter/"
      mode="hex"
      category="Developer tool"
      infoTitle="Convert text and hexadecimal bytes"
      infoText="Text is encoded as UTF-8 before hexadecimal conversion, and valid UTF-8 hex bytes can be decoded back to text."
    />
  );
}