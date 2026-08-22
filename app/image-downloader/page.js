import WebToolkitPage from "../components/WebToolkitPage";

export const metadata = {
  title: "Online Image Downloader",
  description: "Download images from direct image URLs individually or save successful downloads together as a ZIP.",
  alternates: {
    canonical: "/image-downloader/",
  },
  openGraph: {
    title: "Online Image Downloader | SoloTools",
    description: "Download images from direct image URLs individually or save successful downloads together as a ZIP.",
    url: "https://solotools-1ou.pages.dev/image-downloader/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <WebToolkitPage
      title={"Online Image Downloader"}
      description={"Download images from direct image URLs individually or save successful downloads together as a ZIP."}
      canonicalPath={"/image-downloader/"}
      mode={"image-downloader"}
    />
  );
}
