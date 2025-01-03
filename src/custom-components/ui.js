import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { InputNode } from "../nodes/inputNode";
import { LLMNode } from "../nodes/llmNode";
import { OutputNode } from "../nodes/outputNode";
import TextNode from "../nodes/textNode";
import CustomEdge from "./custom-edge";
import CommentNode from "../nodes/commentNode";
import TimerNode from "../nodes/timerNode";

// Constants
const gridSize = 20;
const proOptions = { hideAttribution: true };

// Node types configuration
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  comment: CommentNode,
  timer: TimerNode
};

// Edge types configuration
const edgeTypes = {
  smoothstep: CustomEdge,
};

// Store selector
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteNode: state.deleteNode,
  deleteEdge: state.deleteEdge,
});

export const PipelineUI = ({ setPipelineData }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    deleteEdge,
  } = useStore(selector, shallow);

  // Initialize node data
  const getInitNodeData = useCallback((nodeID, type) => ({
    id: nodeID,
    nodeType: type,
    onDelete: () => deleteNode(nodeID),
  }), [deleteNode]);

  // Handle node dropping
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode, getInitNodeData]
  );

  // Handle drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle keyboard events
  const onKeyDown = useCallback(
    (event) => {
      const target = event.target;
      const isInputElement =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (
        !isInputElement &&
        (event.key === "Delete" || event.key === "Backspace")
      ) {
        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);

        selectedNodes.forEach((node) => deleteNode(node.id));
        selectedEdges.forEach((edge) => deleteEdge(edge.id));
      }
    },
    [nodes, edges, deleteNode, deleteEdge]
  );

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // Update pipeline data when nodes or edges change
  useEffect(() => {
    setPipelineData({ nodes, edges });
  }, [nodes, edges, setPipelineData]);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: "70vw", height: "70vh" }}
      tabIndex={0}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        deleteKeyCode={"Delete"}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};