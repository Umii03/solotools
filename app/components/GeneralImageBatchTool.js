import ImageBatchWorkbench from "./ImageBatchWorkbench";

export default function GeneralImageBatchTool() {
  return (
    <ImageBatchWorkbench
      mode="convert"
      sourceMimes={[
        "image/jpeg",
        "image/png",
        "image/webp",
      ]}
      sourceLabel="JPG, PNG or WebP"
      selectableOutput
      allowSameOutput={false}
      defaultOutput="image/webp"
      qualityEnabled
    />
  );
}