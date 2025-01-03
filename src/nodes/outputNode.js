import React from "react";
import BaseNode from "./basenode";
import { Position } from "reactflow";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Label } from "@components/ui/label";
import { useStore } from "../store";

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (value) => {
    updateNodeField(id, "outputName", value);
  };

  const handleTypeChange = (value) => {
    updateNodeField(id, "outputType", value);
  };

  return (
    <BaseNode
      id={id}
      type="Output Node"
      data={data}
      handles={[{ type: "target", position: Position.Left, id: "value" ,  style: { top: "22%" }, data: { targetHandleText: "output" }, }]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="outputName" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="outputName"
            value={data?.outputName || `output_${id}`}
            onChange={(e) => handleNameChange(e.target.value)}
            className="h-8"
            placeholder="Enter output name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outputType" className="text-sm font-medium text-gray-700">
            Type
          </Label>
          <Select 
            value={data?.outputType || "Text"} 
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  );
};