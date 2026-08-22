export const metadata = {
  title: "Salary to Hourly Calculator | Hourly to Salary Calculator",
  description:
    "Free salary to hourly calculator. Convert annual salary to hourly pay or convert an hourly rate into an estimated annual salary.",
  keywords: [
    "salary to hourly calculator",
    "hourly to salary calculator",
    "hourly rate calculator",
    "hourly pay calculator",
    "hourly wage calculator",
  ],
  alternates: {
    canonical: "/salary-to-hourly-calculator/",
  },
  openGraph: {
    title: "Salary to Hourly Calculator | SoloTools",
    description:
      "Convert annual salary to hourly pay or hourly pay to annual salary for free.",
    url: "https://solotools-1ou.pages.dev/salary-to-hourly-calculator/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Salary to Hourly Calculator",
  url: "https://solotools-1ou.pages.dev/salary-to-hourly-calculator/",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Convert annual salary to hourly pay or hourly pay to an estimated annual salary.",
};

export default function SalaryToHourlyLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
}
