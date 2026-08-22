export const metadata = {
  title: "Free Online Calculators",
  description:
    "Free online calculators for percentages, discounts, loans, salary, dates, VAT, profit margins, freelance rates, project pricing, and income planning.",
  alternates: {
    canonical: "/calculators/",
  },
  openGraph: {
    title:
      "Free Online Calculators | SoloTools",
    description:
      "Practical free calculators for everyday finance, dates, business, salary, and freelance work.",
    url:
      "https://solotools-1ou.pages.dev/calculators/",
    type: "website",
  },
};

const calculators = [
  [
    "Salary to Hourly Calculator",
    "/salary-to-hourly-calculator/",
  ],
  [
    "Percentage Calculator",
    "/percentage-calculator/",
  ],
  [
    "Discount Calculator",
    "/discount-calculator/",
  ],
  [
    "Profit Margin Calculator",
    "/profit-margin-calculator/",
  ],
  [
    "Loan Calculator",
    "/loan-calculator/",
  ],
  [
    "Age Calculator",
    "/age-calculator/",
  ],
  [
    "Date Difference Calculator",
    "/date-difference-calculator/",
  ],
  [
    "VAT Calculator",
    "/vat-calculator/",
  ],
  [
    "Freelance Hourly Rate Calculator",
    "/freelance-hourly-rate-calculator/",
  ],
  [
    "Project Price Calculator",
    "/project-price-calculator/",
  ],
  [
    "Freelance Income Calculator",
    "/freelance-income-calculator/",
  ],
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SoloTools Calculators",
  url:
    "https://solotools-1ou.pages.dev/calculators/",
  description:
    "A collection of free practical online calculators.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement:
      calculators.map(
        (
          [name, path],
          index
        ) => ({
          "@type": "ListItem",
          position:
            index + 1,
          name,
          url:
            `https://solotools-1ou.pages.dev${path}`,
        })
      ),
  },
};

export default function CalculatorsLayout({
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
