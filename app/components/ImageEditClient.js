import ImageBatchWorkbench from "./ImageBatchWorkbench";

export default function ImageEditClient({
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