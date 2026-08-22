export const metadata = {
  title: "JPG, PNG & WebP Image Converter",
  description:
    "Free online image converter for JPG, PNG, and WebP. Convert images directly in your browser without uploading them to a server.",
  keywords: [
    "image converter",
    "jpg to png",
    "png to jpg",
    "jpg to webp",
    "png to webp",
    "webp to jpg",
    "webp to png",
    "free image converter",
  ],
  alternates: {
    canonical: "/image-converter/",
  },
  openGraph: {
    title: "JPG, PNG & WebP Image Converter | SoloTools",
    description:
      "Convert JPG, PNG, and WebP images directly in your browser for free.",
    url: "https://solotools-1ou.pages.dev/image-converter/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SoloTools Image Converter",
  url: "https://solotools-1ou.pages.dev/image-converter/",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Convert JPG, PNG, and WebP images directly in a web browser.",
};

export default function ImageConverterLayout({ children }) {
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
