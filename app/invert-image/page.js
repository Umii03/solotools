import ImageFilterPage from "../components/ImageFilterPage";

export const metadata = {
  title: "Invert Image Colors Online Free",
  description: "Invert the colors of JPG, PNG, or WebP images.",
  alternates: {
    canonical: "/invert-image/",
  },
  openGraph: {
    title: "Invert Image Colors Online Free | SoloTools",
    description: "Invert the colors of JPG, PNG, or WebP images.",
    url:
      "https://solotools-1ou.pages.dev/invert-image/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageFilterPage
      title="Invert Image"
      description="Invert the colors of JPG, PNG, or WebP images."
      canonicalPath="/invert-image/"
      mode="invert"
      infoTitle="Invert image colors"
      infoText="Every image color is transformed to its inverse using your browser canvas."
    />
  );
}