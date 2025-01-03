import React from "react";
import BaseNode from "./basenode";
import { useStore } from "../store";
import { Button } from "../components/ui/button"; 
import { Input } from "../components/ui/input";

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

  return (
    <BaseNode id={id} type="timer" data={data}>
      <div className="space-y-2">
        <Input
          type="number"
          value={data?.delay || ""}
          onChange={(e) => handleDelayChange(e.target.value)}
          placeholder="Delay in ms"
          className="w-full"
        />
        <Button onClick={handleDelay} className="w-full">
          Start Timer
        </Button>
      </div>
    </BaseNode>
  );
};

export default TimerNode;
