import React, { useState } from "react";
import BaseNode from "./basenode";
import { Position } from 'reactflow';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || `input_${id}`);
  const [type, setType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      type="Input Node"
      data={data}
      handles={[
        { type: "source", position: Position.Right, id: "value" }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8"
            placeholder="Enter input name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
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