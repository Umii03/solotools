import ImageBatchWorkbench from "./ImageBatchWorkbench";

export default function ImageCompressorTool() {
  return (
    <ImageBatchWorkbench
      mode="compress"
      sourceLabel="JPG, PNG or WebP"
      selectableOutput
      allowSameOutput
      defaultOutput="same"
      qualityEnabled
    />
  );
}