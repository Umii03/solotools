import ToolCategoryHub from "../components/ToolCategoryHub";

export const metadata = {
  title: "Free Online Developer Tools",
  description:
    "Free developer utilities for JSON, CSV, XML, hashes, timestamps, passwords, random numbers, Base64, URLs, UUIDs, and QR codes.",
  alternates: {
    canonical: "/developer-tools/",
  },
};

export default function DeveloperToolsPage() {
  return (
    <ToolCategoryHub
      category="developer"
      eyebrow="Free browser developer utilities"
      title="Developer Tools"
      description="Format, convert, encode, decode, hash, and generate common development data."
      privacyText="Supported processing happens locally in your browser."
    />
  );
}