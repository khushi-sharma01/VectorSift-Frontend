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

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (value) => {
    updateNodeField(id, "inputName", value);
  };

  const handleTypeChange = (value) => {
    updateNodeField(id, "inputType", value);
  };

  return (
    <BaseNode
      id={id}
      type="Input Node"
      data={data}
      handles={[{ type: "source", position: Position.Right, id: "value" ,data: { sourceHandleText: "Input" },}]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            value={data?.inputName || `input_${id}`}
            onChange={(e) => handleNameChange(e.target.value)}
            className="h-8"
            placeholder="Enter input name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Type
          </Label>
          <Select 
            value={data?.inputType || "Text"} 
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