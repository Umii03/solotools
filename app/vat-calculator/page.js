import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "VAT Calculator Online Free",
  description: "Add VAT to a net amount or extract VAT from a VAT-inclusive gross amount using any VAT percentage.",
  alternates: {
    canonical: "/vat-calculator/",
  },
  openGraph: {
    title: "VAT Calculator Online Free | SoloTools",
    description: "Add VAT to a net amount or extract VAT from a VAT-inclusive gross amount using any VAT percentage.",
    url:
      "https://solotools-1ou.pages.dev/vat-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="VAT Calculator"
      description="Add VAT to a net amount or extract VAT from a VAT-inclusive gross amount using any VAT percentage."
      canonicalPath="/vat-calculator/"
      mode="vat"
      infoTitle="Add or remove VAT"
      infoText="Select whether your amount excludes or includes VAT, enter the VAT rate, and see the net amount, VAT amount, and gross total."
    />
  );
}
