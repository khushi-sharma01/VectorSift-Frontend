import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const ResponseDialog = ({ isOpen, setIsOpen, response }) => {
  const formatValue = (value, key) => {
    if (typeof value === 'boolean') {
      return value.toString();
    }
    if (Array.isArray(value)) {
      if (key === 'nodes') {
        return (
          <div className="flex flex-wrap gap-2 mt-1">
            {value.map((node, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                {node}
              </span>
            ))}
          </div>
        );
      }
      return (
        <div className="pl-4 mt-1">
          {value.map((item, index) => (
            <div key={index} className="text-gray-700">
              {Array.isArray(item) ? item.join(' → ') : item}
            </div>
          ))}
        </div>
      );
    }
    return value;
  };

  const renderData = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="mb-3 border-b border-purple-100 pb-2 last:border-0">
        <span className="font-medium text-purple-700 capitalize">{key.replace(/_/g, ' ')}: </span>
        {formatValue(value, key)}
      </div>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-purple-500" />
            <span className="text-purple-800">Pipeline Response</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 p-4 rounded bg-purple-50">
          {response && renderData(response)}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;