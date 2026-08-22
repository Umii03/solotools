import GrowthUtilityPage from "../components/GrowthUtilityPage";

export const metadata = {
  title: "URL Slug Generator Online Free",
  description: "Convert titles and text into lowercase URL-friendly slugs.",
  alternates: {
    canonical: "/slug-generator/",
  },
  openGraph: {
    title: "URL Slug Generator Online Free | SoloTools",
    description: "Convert titles and text into lowercase URL-friendly slugs.",
    url:
      "https://solotools-1ou.pages.dev/slug-generator/",
    type: "website",
  },
};

export default function Page() {
  return (
    <GrowthUtilityPage
      title="Slug Generator"
      description="Convert titles and text into lowercase URL-friendly slugs."
      canonicalPath="/slug-generator/"
      mode="slug"
      category="Text tool"
      infoTitle="Create clean URL slugs"
      infoText="The generator removes accents, converts text to lowercase, replaces separators with hyphens, and trims extra hyphens."
    />
  );
}