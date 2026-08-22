import ExpansionUtilityPage from "../components/ExpansionUtilityPage";

export const metadata = {
  title: "Number Base Converter Online",
  description: "Convert whole numbers between binary, octal, decimal, and hexadecimal.",
  alternates: {
    canonical: "/number-base-converter/",
  },
  openGraph: {
    title: "Number Base Converter Online | SoloTools",
    description: "Convert whole numbers between binary, octal, decimal, and hexadecimal.",
    url:
      "https://solotools-1ou.pages.dev/number-base-converter/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ExpansionUtilityPage
      title="Number Base Converter"
      description="Convert whole numbers between binary, octal, decimal, and hexadecimal."
      canonicalPath="/number-base-converter/"
      mode="base"
      category="Developer tool"
      infoTitle="Convert between common number bases"
      infoText="The converter uses integer arithmetic to translate values between base 2, 8, 10, and 16."
    />
  );
}