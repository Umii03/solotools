import UnitConverterPage from "../components/UnitConverterPage";

export const metadata = {
  title: "Data Storage Converter",
  description: "Convert bytes, KB, MB, GB, TB and binary KiB, MiB, GiB, and TiB units.",
  alternates: {
    canonical: "/data-storage-converter/",
  },
  openGraph: {
    title: "Data Storage Converter | SoloTools",
    description: "Convert bytes, KB, MB, GB, TB and binary KiB, MiB, GiB, and TiB units.",
    url: "https://solotools-1ou.pages.dev/data-storage-converter/",
    type: "website",
  },
};

export default function ToolPage() {
  return (
    <UnitConverterPage
      title={"Data Storage Converter"}
      description={"Convert bytes, KB, MB, GB, TB and binary KiB, MiB, GiB, and TiB units."}
      canonicalPath={"/data-storage-converter/"}
      mode={"data"}
    />
  );
}
