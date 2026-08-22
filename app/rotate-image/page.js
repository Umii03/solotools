import ImageEditPage from "../components/ImageEditPage";

export const metadata = {
  title: "Rotate Image Online Free",
  description: "Rotate JPG, PNG, or WebP images by 90, 180, or 270 degrees.",
  alternates: {
    canonical: "/rotate-image/",
  },
  openGraph: {
    title: "Rotate Image Online Free | SoloTools",
    description: "Rotate JPG, PNG, or WebP images by 90, 180, or 270 degrees.",
    url:
      "https://solotools-1ou.pages.dev/rotate-image/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageEditPage
      title="Rotate Image"
      description="Rotate JPG, PNG, or WebP images by 90, 180, or 270 degrees."
      canonicalPath="/rotate-image/"
      mode="rotate"
      infoTitle="Rotate photos and graphics"
      infoText="Choose the rotation angle, preview the result, and download the rotated image in JPG, PNG, or WebP format."
    />
  );
}