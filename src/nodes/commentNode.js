import React from "react";

import { useStore } from "../store";

import BaseNode from "./basenode";
import { AutosizeTextarea } from "../components/ui/autosize-textarea";

const CommentNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const comment = data?.comment || "";

  return (
    <BaseNode 
      id={id} 
      
      data={data} 
      handles={[]} 
      className="bg-purple-50/95 hover:bg-purple-50"
    >
      <div className="space-y-2">
       
        <AutosizeTextarea
          id="comment"
          value={comment}
          onChange={(e) => updateNodeField(id, "comment", e.target.value)}
          placeholder="Add your notes/comments here..."
          maxHeight={200}
          className="min-h-[100px] bg-purple-50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
        />
      </div>
    </BaseNode>
  );
};

export default CommentNode;