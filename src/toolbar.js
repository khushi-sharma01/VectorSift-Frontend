import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="p-4">
      <h2 className="text-sm font-medium text-purple-700 mb-3">Pipeline Components</h2>
      <div className="flex flex-wrap gap-3">
        <DraggableNode type="customInput" label="Input" icon="Input" />
        <DraggableNode type="llm" label="LLM" icon="Brain" />
        <DraggableNode type="customOutput" label="Output" icon="Output" />
        <DraggableNode type="text" label="Text" icon="Type" />
      </div>
    </div>
  );
};