import React from 'react';
import BaseNode from './basenode';
import { Position } from 'reactflow';
import { Card } from "../components/ui/card";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="LLM Node"
      data={data}
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <Card className="p-3 bg-blue-50/50">
        <p className="text-sm text-blue-700 font-medium">Natural Language Processing</p>
      </Card>
    </BaseNode>
  );
};