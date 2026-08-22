import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Web Tools",
  description:
    "Free website utilities including an image downloader, meta tag generator, robots.txt generator, XML sitemap generator, Open Graph generator, and favicon generator.",
  alternates: {
    canonical:
      "/web-tools/",
  },
  openGraph: {
    title:
      "Free Web Tools | SoloTools",
    description:
      "Free browser-based website utilities for common web tasks.",
    url:
      "https://solotools-1ou.pages.dev/web-tools/",
    type:
      "website",
  },
};

export default function WebToolsPage() {
  return (
    <ToolCategoryHub
      category="web"
      eyebrow="Free online web tools"
      title="Web Tools"
      description="Generate metadata, robots files, XML sitemaps, social sharing tags and favicons, or work with direct image URLs."
      privacyText="Generators run in your browser. Remote image downloads depend on the source website allowing browser access."
    />
  );
}
