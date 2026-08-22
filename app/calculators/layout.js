import {
  toolsByCategory,
} from "../lib/toolRegistry";

export const metadata = {
  title: "Free Online Calculators",
  description:
    "Free calculators for percentages, discounts, loans, mortgages, interest, salary, dates, business, freelance work, and everyday calculations.",
  alternates: {
    canonical: "/calculators/",
  },
  openGraph: {
    title:
      "Free Online Calculators | SoloTools",
    description:
      "Practical free online calculators for everyday tasks.",
    url:
      "https://solotools-1ou.pages.dev/calculators/",
    type: "website",
  },
};

export default function CalculatorsLayout({
  children,
}) {
  const tools =
    toolsByCategory(
      "calculator"
    );

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      "SoloTools Calculators",
    url:
      "https://solotools-1ou.pages.dev/calculators/",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems:
        tools.length,
      itemListElement:
        tools.map(
          (tool, index) => ({
            "@type": "ListItem",
            position:
              index + 1,
            name:
              tool.title,
            url:
              `https://solotools-1ou.pages.dev${tool.href}`,
          })
        ),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema
            ),
        }}
      />

      {children}
    </>
  );
}