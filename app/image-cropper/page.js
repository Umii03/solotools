import ImageEditPage from "../components/ImageEditPage";

export const metadata = {
  title: "Image Cropper Online Free",
  description: "Crop JPG, PNG, or WebP images to custom coordinates and dimensions.",
  alternates: {
    canonical: "/image-cropper/",
  },
  openGraph: {
    title: "Image Cropper Online Free | SoloTools",
    description: "Crop JPG, PNG, or WebP images to custom coordinates and dimensions.",
    url:
      "https://solotools-1ou.pages.dev/image-cropper/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageEditPage
      title="Image Cropper"
      description="Crop JPG, PNG, or WebP images to custom coordinates and dimensions."
      canonicalPath="/image-cropper/"
      mode="crop"
      infoTitle="Crop an image precisely"
      infoText="Enter the X and Y starting position plus the crop width and height, then export the selected image area."
    />
  );
}