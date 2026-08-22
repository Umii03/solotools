export const metadata = {
  title: "Free Online Calculators",
  description:
    "Free online calculators for salary conversions, freelance hourly rates, project pricing, and income planning. No signup required.",
  keywords: [
    "free online calculators",
    "salary calculator",
    "hourly rate calculator",
    "freelance calculator",
    "project price calculator",
    "income calculator",
  ],
  alternates: {
    canonical: "/calculators/",
  },
  openGraph: {
    title: "Free Online Calculators | SoloTools",
    description:
      "Free practical calculators for salary, freelance pricing, project estimates, and income planning.",
    url: "https://solotools-1ou.pages.dev/calculators/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SoloTools Calculators",
  url: "https://solotools-1ou.pages.dev/calculators/",
  description:
    "A collection of free online calculators for salary, freelance pricing, project estimates, and income planning.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Salary to Hourly Calculator",
        url: "https://solotools-1ou.pages.dev/salary-to-hourly-calculator/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Freelance Hourly Rate Calculator",
        url: "https://solotools-1ou.pages.dev/freelance-hourly-rate-calculator/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Project Price Calculator",
        url: "https://solotools-1ou.pages.dev/project-price-calculator/",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Freelance Income Calculator",
        url: "https://solotools-1ou.pages.dev/freelance-income-calculator/",
      },
    ],
  },
};

export default function CalculatorsLayout({ children }) {
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
