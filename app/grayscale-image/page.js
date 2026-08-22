import ImageEditPage from "../components/ImageEditPage";

export const metadata = {
  title: "Convert Image to Grayscale Online",
  description: "Convert JPG, PNG, or WebP images to grayscale directly in your browser.",
  alternates: {
    canonical: "/grayscale-image/",
  },
  openGraph: {
    title: "Convert Image to Grayscale Online | SoloTools",
    description: "Convert JPG, PNG, or WebP images to grayscale directly in your browser.",
    url:
      "https://solotools-1ou.pages.dev/grayscale-image/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageEditPage
      title="Grayscale Image"
      description="Convert JPG, PNG, or WebP images to grayscale directly in your browser."
      canonicalPath="/grayscale-image/"
      mode="grayscale"
      infoTitle="Create a grayscale image"
      infoText="SoloTools converts each pixel to a luminance-based grayscale value while preserving the original image dimensions."
    />
  );
}