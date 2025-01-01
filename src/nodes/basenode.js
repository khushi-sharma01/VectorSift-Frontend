import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRightCircle } from 'lucide-react';

const BaseNode = ({ id, type, data, handles = [], children, className = '' }) => {
  return (
    <Card className={`w-64 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-200 ${className}`}>
      <CardHeader className="p-3 bg-gradient-to-r from-purple-50 to-purple-100">
        <CardTitle className="text-sm font-medium text-purple-700">{type}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 relative">
        {children}
        {handles.map((handle, index) => (
          <div key={index} >
            {/* Invisible Handle */}
            <Handle
              type={handle.type}
              position={handle.position}
              id={`${id}-${handle.id}`}
              style={{
                width: '20px',  // Adjust the width
                height: '20px', 
                opacity: 0, // Make handle invisible
                zIndex: 50, // Keep it functional
              }}
            />
            {/* Icon as the handle */}
            <ArrowRightCircle
              className={`absolute ${
                handle.type === 'target' ? 'text-blue-500' : 'text-green-500'
              }`}
              style={{
                
                width: '20px',  // Adjust the icon size
                height: '20px',
                top: handle.position === Position.Top ? '-12px' : '50%',
                bottom: handle.position === Position.Bottom ? '-12px' : '50%',
                left: handle.position === Position.Left ? '-2px' : undefined,
                right: handle.position === Position.Right ? '-20px' : undefined,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none', // Prevent icon from interfering with interactions
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BaseNode;
