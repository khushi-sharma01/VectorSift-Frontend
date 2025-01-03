import { Brain, FileInput, FileOutput, Type, NotebookPen,Hourglass  } from "lucide-react";

import { Card, CardHeader } from "../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";

const icons = {
  customInput: FileInput,
  llm: Brain,
  customOutput: FileOutput,
  text: Type,
  comment: NotebookPen,
  timer: Hourglass
};

export const DraggableNode = ({ type, label, tooltipText }) => {
  const Icon = icons[type];

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Card
            className="cursor-grab hover:bg-purple-50/50 transition-colors"
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = "grab")}
            draggable
          >
            <CardHeader className="p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-purple-600" />}
                <span className="text-sm font-medium text-purple-700">{label}</span>
              </div>
            </CardHeader>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <p className="text-sm">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};