import ImageBatchWorkbench from "./ImageBatchWorkbench";

export default function ImageFilterClient({
  mode,
}) {
  return (
    <ImageBatchWorkbench
      mode={mode}
      sourceLabel="JPG, PNG or WebP"
      selectableOutput
      allowSameOutput
      defaultOutput="same"
      qualityEnabled
    />
  );
}