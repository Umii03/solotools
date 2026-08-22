import ImageFilterPage from "../components/ImageFilterPage";

export const metadata = {
  title: "Blur Image Online Free",
  description: "Apply adjustable blur to JPG, PNG, or WebP images.",
  alternates: {
    canonical: "/blur-image/",
  },
  openGraph: {
    title: "Blur Image Online Free | SoloTools",
    description: "Apply adjustable blur to JPG, PNG, or WebP images.",
    url:
      "https://solotools-1ou.pages.dev/blur-image/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageFilterPage
      title="Blur Image"
      description="Apply adjustable blur to JPG, PNG, or WebP images."
      canonicalPath="/blur-image/"
      mode="blur"
      infoTitle="Blur an image in your browser"
      infoText="Use the blur-radius slider to control the strength of the visual blur before exporting the result."
    />
  );
}