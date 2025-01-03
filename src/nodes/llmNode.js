import React from "react";
import BaseNode from "./basenode";
import { Position } from "reactflow";
import { Card } from "@components/ui/card";

export const LLMNode = ({ id, data }) => {
  const handles=[
    {
      type: "target",
      data: { targetHandleText: "system" }, 
      position: Position.Left,
      id: "system",
      style: { top: "11%" },
    },
    {
      type: "target",
      position: Position.Left,
      data: { targetHandleText: "prompt" }, 
      id: "prompt",
      style: { top: "22%" },
    },
    { type: "source", position: Position.Right, id: "response", data: { sourceHandleText: "output" },  },
  ]
  console.log("llmhandles",handles)
  return (
    <BaseNode
      id={id}
      type="LLM Node"
      data={data}
      handles={handles}
    >
      <Card className="p-3 bg-blue-50/50 dark:bg-slate-300">
        <p className="text-sm text-blue-700 font-medium">
          Natural Language Processing
        </p>
      </Card>
    </BaseNode>
  );
};
