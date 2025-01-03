import { DraggableNode } from "./draggableNode";
import { Alert, AlertDescription } from "../components/ui/alert"; 
import { AlertCircle } from "lucide-react";
const nodeTypes = [
  {
    type: "customInput",
    label: "Input",
    tooltipText: "Create user input fields for your pipeline"
  },
  {
    type: "llm",
    label: "LLM",
    tooltipText: "Language model processing node"
  },
  {
    type: "customOutput",
    label: "Output",
    tooltipText: "A field for outputting data from your pipeline"
  },
  {
    type: "text",
    label: "Text",
    tooltipText: "Text field that allows for variables"
  },
  {
    type: "timer",
    label: "Timer",
    tooltipText: "Delay the pipeline's execution for a set number of seconds."
  },
  {
    type: "comment",
    label: "Comment",
    tooltipText: "Used to make helpful comments or notes for your pipeline"
  }
];

export const PipelineToolbar = () => {
  return (
    <div className="p-4">
      <h2 className="text-sm font-medium text-purple-700 mb-3">
        Pipeline Components
      </h2>
      <div className="flex flex-wrap gap-3">
        {nodeTypes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            tooltipText={node.tooltipText}
          />
        ))}
      </div>

    
      <Alert variant="filled" className="bg-purple-100 dark:bg-purple-900 dark:text-white text-purple-600 mt-4 flex items-center">
        <AlertCircle className="h-4 w-4 text-purple-600 mr-2 " />
        <AlertDescription className="mt-1">
          To Remove the node, double-click on the "X" icon.
        </AlertDescription>
      </Alert>
    </div>
  );
};
