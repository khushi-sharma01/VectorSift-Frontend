import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { X } from 'lucide-react';

const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  id,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    if (data?.deleteEdge) {
      data.deleteEdge(id); 
    }
  };
  

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {data?.deleteIcon && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <X
              className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer bg-white rounded-full"
              onClick={(e) => onEdgeClick(e, id)}
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;