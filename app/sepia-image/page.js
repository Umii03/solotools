import ImageFilterPage from "../components/ImageFilterPage";

export const metadata = {
  title: "Sepia Image Filter Online Free",
  description: "Apply a sepia-tone effect to JPG, PNG, or WebP images.",
  alternates: {
    canonical: "/sepia-image/",
  },
  openGraph: {
    title: "Sepia Image Filter Online Free | SoloTools",
    description: "Apply a sepia-tone effect to JPG, PNG, or WebP images.",
    url:
      "https://solotools-1ou.pages.dev/sepia-image/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageFilterPage
      title="Sepia Image"
      description="Apply a sepia-tone effect to JPG, PNG, or WebP images."
      canonicalPath="/sepia-image/"
      mode="sepia"
      infoTitle="Create a sepia image"
      infoText="SoloTools applies a browser-based sepia filter while preserving the original image dimensions."
    />
  );
}