import ImageEditPage from "../components/ImageEditPage";

export const metadata = {
  title: "Flip Image Online Free",
  description: "Flip JPG, PNG, or WebP images horizontally or vertically.",
  alternates: {
    canonical: "/flip-image/",
  },
  openGraph: {
    title: "Flip Image Online Free | SoloTools",
    description: "Flip JPG, PNG, or WebP images horizontally or vertically.",
    url:
      "https://solotools-1ou.pages.dev/flip-image/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageEditPage
      title="Flip Image"
      description="Flip JPG, PNG, or WebP images horizontally or vertically."
      canonicalPath="/flip-image/"
      mode="flip"
      infoTitle="Mirror images horizontally or vertically"
      infoText="Choose a horizontal or vertical flip and export the transformed image without uploading it to a SoloTools server."
    />
  );
}