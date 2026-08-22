import GeneralCalculatorPage from "../components/GeneralCalculatorPage";

export const metadata = {
  title: "Loan Payment Calculator Online",
  description: "Estimate monthly loan payments, total repayment, and total interest from loan amount, interest rate, and term.",
  alternates: {
    canonical: "/loan-calculator/",
  },
  openGraph: {
    title: "Loan Payment Calculator Online | SoloTools",
    description: "Estimate monthly loan payments, total repayment, and total interest from loan amount, interest rate, and term.",
    url:
      "https://solotools-1ou.pages.dev/loan-calculator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GeneralCalculatorPage
      title="Loan Calculator"
      description="Estimate monthly loan payments, total repayment, and total interest from loan amount, interest rate, and term."
      canonicalPath="/loan-calculator/"
      mode="loan"
      infoTitle="Estimate fixed monthly loan payments"
      infoText="This calculator uses the standard fixed-payment amortization formula. Results are estimates and do not include lender fees, insurance, taxes, or other charges."
    />
  );
}
