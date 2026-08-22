export const metadata = {
  title: "Free Online Image Tools",
  description:
    "Free browser-based image tools for converting JPG, PNG, and WebP images with more practical image utilities coming over time.",
  keywords: [
    "image tools",
    "free image tools",
    "image converter",
    "jpg converter",
    "png converter",
    "webp converter",
  ],
  alternates: {
    canonical: "/image-tools/",
  },
  openGraph: {
    title: "Free Online Image Tools | SoloTools",
    description:
      "Free browser-based utilities for converting and working with images.",
    url: "https://solotools-1ou.pages.dev/image-tools/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SoloTools Image Tools",
  url: "https://solotools-1ou.pages.dev/image-tools/",
  description:
    "A collection of free browser-based image utilities.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "JPG, PNG & WebP Image Converter",
        url: "https://solotools-1ou.pages.dev/image-converter/",
      },
    ],
  },
};

export default function ImageToolsLayout({ children }) {
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
