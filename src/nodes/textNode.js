import React, { useState, useEffect } from 'react';
import BaseNode from './basenode';
import { Position } from 'reactflow';
import { AutosizeTextarea } from '../components/ui/autosize-textarea';
import { Label } from '../components/ui/label';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const uniqueVars = [...new Set([...text.matchAll(regex)].map(match => match[1]))];
    setVariables(uniqueVars);
  }, [text]);

  const handles = [
    ...variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `variable-${variable}`,
      label: variable,
      style: { 
        top: `${(index + 1) * 40 + 40}px`,
        left: '0px'
      }
    })),
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode
      id={id}
      type="Text Node"
      data={data}
      handles={handles}
    >
      <div className="space-y-2">
        <Label htmlFor="text" className="text-sm font-medium text-gray-700">Text</Label>
        <AutosizeTextarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something like 'Hello, {{name}}!'"
          maxHeight={200}
          className="min-h-[100px]"
        />
      </div>
    </BaseNode>
  );
};

export default TextNode;