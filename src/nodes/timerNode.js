import React from "react";

import { Position } from "reactflow";

import BaseNode from "./basenode";
import { useStore } from "../store";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


const TimerNode = ({ id, data }) => {
  const { updateNodeField } = useStore();

  const handleDelayChange = (value) => {
    updateNodeField(id, "delay", Number(value));
  };

  const handleDelay = () => {
    setTimeout(() => {
      if (data?.onFinish) {
        data.onFinish();
      }
    }, data?.delay || 1000);
  };

  const handles = [
    { type: "target", position: Position.Left, id: "trigger",  style: { top: "11%" },label: "Trigger",data:{targetHandleText:"Input" } },
    { type: "source", position: Position.Right, id: "onComplete", label: "Complete" ,data: { sourceHandleText: "output" }, },
  ];

  return (
    <BaseNode id={id} type="timer" data={data} handles={handles}>
      <div className="space-y-2">
        <Input
          type="text"
          value={data?.delay || ""}
          onChange={(e) => handleDelayChange(e.target.value)}
          placeholder="Delay in ms"
          className="w-full"
        />
       
      </div>
    </BaseNode>
  );
};

export default TimerNode;
