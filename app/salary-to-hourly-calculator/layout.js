export const metadata = {
  title: "Salary to Hourly Calculator | Hourly to Salary Converter",
  description:
    "Convert annual salary to hourly pay or hourly wages to yearly salary. Adjust hours per week and weeks per year, with weekly and monthly pay estimates.",
  keywords: [
    "salary to hourly calculator",
    "hourly to salary calculator",
    "hourly rate calculator",
    "hourly pay calculator",
    "hourly wage calculator",
    "salary to hourly",
    "hourly to salary",
    "annual salary calculator",
    "salary calculator hourly",
    "how to calculate hourly rate from salary",
  ],
  alternates: {
    canonical: "/salary-to-hourly-calculator/",
  },
  openGraph: {
    title:
      "Salary to Hourly Calculator | Hourly to Salary Converter",
    description:
      "Convert annual salary to hourly pay or hourly wages to annual salary. Adjust weekly hours and working weeks for a personalized estimate.",
    url:
      "https://solotools-1ou.pages.dev/salary-to-hourly-calculator/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name:
    "Salary to Hourly Calculator and Hourly to Salary Converter",
  url:
    "https://solotools-1ou.pages.dev/salary-to-hourly-calculator/",
  applicationCategory:
    "FinanceApplication",
  operatingSystem:
    "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Convert annual salary to hourly pay or convert an hourly wage to estimated weekly, monthly, and annual salary.",
};

export default function SalaryToHourlyLayout({
  children,
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {children}
    </>
  );
}