import React, { useEffect } from "react";
import BaseNode from "./basenode";
import { Position, useUpdateNodeInternals } from "reactflow";
import { AutosizeTextarea } from "../components/ui/autosize-textarea";
import { Label } from "../components/ui/label";
import { useStore } from "../store";

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals(); 
  const text = data?.text || "{{Input}}";

  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const uniqueVars = [...new Set([...text.matchAll(regex)].map((match) => match[1]))];
    updateNodeField(id, "variables", uniqueVars);
  }, [text, id, updateNodeField]);

  // Dynamically create handles based on variables
  const handles = [
    ...(data?.variables || []).map((variable, index) => ({
      type: "target",
      position: Position.Left,
      id: `variable-target-${variable}`,
      data: { targetHandleText: variable }, 
      isConnectable: true,
      style: {
        top: `${(index + 1) * 11}%`,
      },
    })),
    { type: "source", position: Position.Right, id: "output" , data: { sourceHandleText: "output" }, },
  ];

  // Trigger React Flow to update node internals when handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, id, updateNodeInternals]);

  return (
    <BaseNode id={id} type="Text Node" data={data} handles={handles}>
      <div className="space-y-2">
        <Label htmlFor="text" className="text-sm font-medium text-gray-700">
          Text
        </Label>
        <AutosizeTextarea
          id="text"
          value={text}
          onChange={(e) => updateNodeField(id, "text", e.target.value)}
          placeholder="Type something like 'Hello, {{name}}!'"
          maxHeight={200}
          className="min-h-[100px]"
        />
      </div>
    </BaseNode>
  );
};

export default TextNode;
