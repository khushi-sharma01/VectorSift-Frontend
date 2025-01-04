import React, { useEffect, useMemo,useCallback } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { useStore } from "../store";
import BaseNode from "./basenode";
import { AutosizeTextarea } from "../components/ui/autosize-textarea";
import { Label } from "../components/ui/label";

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const text = data?.text || "{{Input}}";

  // Extract variables using regex
  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    return [...new Set([...text.matchAll(regex)].map((match) => match[1]))];
  }, [text]);

  // Update variables in node data only when they change
  useEffect(() => {
    if (JSON.stringify(data?.variables) !== JSON.stringify(variables)) {
      updateNodeField(id, "variables", variables);
    }
  }, [variables, id, updateNodeField, data?.variables]);

  // Create handles for each variable
  const handles = useMemo(() => [
    ...variables.map((variable, index) => ({
      type: "target",
      position: Position.Left,
      id: `variable-target-${variable}`,
      data: { targetHandleText: variable },
      isConnectable: true,
      style: {
        top: `${(index + 1) * 11}%`,
      },
    })),
    {
      type: "source",
      position: Position.Right,
      id: "output",
      data: { sourceHandleText: "output" },
    },
  ], [variables]);

  // Update node internals when handles change
  useEffect(() => {
    updateNodeInternals(id);
  }, [handles.length, id, updateNodeInternals]);

  const handleTextChange = useCallback((e) => {
    updateNodeField(id, "text", e.target.value);
  }, [id, updateNodeField]);

  return (
    <BaseNode id={id} type="Text Node" data={data} handles={handles}>
      <div className="space-y-2">
        <Label htmlFor="text" className="text-sm font-medium text-gray-700">
          Text
        </Label>
        <AutosizeTextarea
          id="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Type something like 'Hello, {{name}}!'"
          maxHeight={400}
          className="min-h-[100px]"
        />
      </div>
    </BaseNode>
  );
};

export default TextNode;