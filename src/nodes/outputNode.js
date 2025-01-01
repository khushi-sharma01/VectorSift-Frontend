import React, { useState } from "react";
import BaseNode from "./basenode";
import { Position } from "reactflow";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || `output_${id}`);
  const [type, setType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      id={id}
      type="Output Node"
      data={data}
      handles={[
        { type: "target", position: Position.Left, id: "value" }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="outputName" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="outputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8"
            placeholder="Enter output name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="outputType" className="text-sm font-medium text-gray-700">
            Type
          </Label>
          <Select value={type} onValueChange={setType}>
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