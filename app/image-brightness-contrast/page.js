import ImageEditPage from "../components/ImageEditPage";

export const metadata = {
  title: "Image Brightness and Contrast Tool",
  description: "Adjust image brightness and contrast with live controls and export the result.",
  alternates: {
    canonical: "/image-brightness-contrast/",
  },
  openGraph: {
    title: "Image Brightness and Contrast Tool | SoloTools",
    description: "Adjust image brightness and contrast with live controls and export the result.",
    url:
      "https://solotools-1ou.pages.dev/image-brightness-contrast/",
    type: "website",
  },
};

export default function Page() {
  return (
    <ImageEditPage
      title="Image Brightness & Contrast"
      description="Adjust image brightness and contrast with live controls and export the result."
      canonicalPath="/image-brightness-contrast/"
      mode="adjust"
      infoTitle="Adjust image brightness and contrast"
      infoText="Use the sliders to brighten, darken, increase contrast, or soften contrast before exporting the edited image."
    />
  );
}