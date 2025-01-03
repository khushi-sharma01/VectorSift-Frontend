import React from "react";
import { Handle, Position } from "reactflow";

import { X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

const BaseNode = ({
  id,
  type,
  data,
  handles = [],
  children,
  className = "",
}) => {
  const handleStyles = (handle) => ({
    ...handle.style,
    width: "15px",
    height: "15px",
    opacity: 1,
    zIndex: 50,
    backgroundColor: handle.type === "target" ? "#78def0" : "#78f084",
    borderRadius: "50%",
    ...(handle.position === Position.Left ? { left: "-20px", marginTop: "10px" } : { right: "-20px", marginTop: "3px" })
  });

  const leftHandles = handles.filter(h => h.position === Position.Left);
  const rightHandles = handles.filter(h => h.position === Position.Right);

  return (
    <Card
      className={`w-64 shadow-lg bg-card backdrop-blur-sm hover:shadow-xl transition-all duration-200 ${className}`}
    >
      <CardHeader className="p-3 dark:bg-gradient-to-r dark:from-purple-950 dark:to-purple-900 bg-gradient-to-r from-purple-50 to-purple-100 relative rounded-t-lg">
        <CardTitle className="text-sm font-medium dark:text-purple-200 text-purple-700">
          {type}
        </CardTitle>
        <X
          className="absolute top-0 right-1 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
          onDoubleClick={(e) => {
            e.stopPropagation();
            data?.onDelete?.();
          }}
        />
      </CardHeader>
      <CardContent className="p-3 relative dark:bg-card">
        <div className="mb-4">
          {children}
        </div>

        <div className="flex justify-between items-center">
          <div className="relative flex-1">
            {leftHandles.map((handle, index) => (
              <div key={`left-${index}`} className="relative">
                <Handle
                  type={handle.type}
                  position={handle.position}
                  id={`${id}-${handle.id}`}
                  style={handleStyles(handle)}
                />
                {handle.type === "target" && (
                  <span className="text-sm text-muted-foreground">
                    {handle?.data?.targetHandleText}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="relative flex-1 flex justify-end">
            {rightHandles.map((handle, index) => (
              <div key={`right-${index}`} className="relative mb-2">
                {handle.type === "source" && (
                  <span className="text-sm text-muted-foreground">
                    {handle?.data?.sourceHandleText}
                  </span>
                )}
                <Handle
                  type={handle.type}
                  position={handle.position}
                  id={`${id}-${handle.id}`}
                  style={handleStyles(handle)}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseNode;