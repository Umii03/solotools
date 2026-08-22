import PdfPowerToolPage from "../components/PdfPowerToolPage";

export const metadata = {
  title: "PDF Metadata Editor Online Free",
  description: "View and edit PDF title, author, subject, creator, and keyword metadata.",
  alternates: {
    canonical: "/pdf-metadata-editor/",
  },
  openGraph: {
    title: "PDF Metadata Editor Online Free | SoloTools",
    description: "View and edit PDF title, author, subject, creator, and keyword metadata.",
    url: "https://solotools-1ou.pages.dev/pdf-metadata-editor/",
    type: "website",
  },
};

export default function Page() {
  return (
    <PdfPowerToolPage
      title="PDF Metadata Editor"
      description="View and edit PDF title, author, subject, creator, and keyword metadata."
      canonicalPath="/pdf-metadata-editor/"
      mode="metadata"
      group="edit"
      infoTitle="Edit PDF document information"
      infoText="Update common metadata fields without uploading the document to a SoloTools conversion server."
      note=""
    />
  );
}