import ImageBatchWorkbench from "./ImageBatchWorkbench";

export default function ImageResizerTool() {
  return (
    <ImageBatchWorkbench
      mode="resize"
      sourceLabel="JPG, PNG or WebP"
      selectableOutput
      allowSameOutput
      defaultOutput="same"
      qualityEnabled
    />
  );
}