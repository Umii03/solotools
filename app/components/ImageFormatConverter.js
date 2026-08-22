import ImageBatchWorkbench from "./ImageBatchWorkbench";

export default function ImageFormatConverter({
  sourceLabel,
  sourceMime,
  outputLabel,
  outputMime,
  outputExtension,
  qualityEnabled,
}) {
  return (
    <ImageBatchWorkbench
      mode="convert"
      sourceMimes={[sourceMime]}
      sourceLabel={sourceLabel}
      fixedOutputMime={outputMime}
      fixedOutputExtension={outputExtension}
      fixedOutputLabel={outputLabel}
      qualityEnabled={qualityEnabled}
      selectableOutput={false}
      allowSameOutput={false}
      defaultOutput={outputMime}
    />
  );
}