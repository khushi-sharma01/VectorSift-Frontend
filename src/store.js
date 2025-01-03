import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
        const nodes = get().nodes;
        const updatedNodes = applyNodeChanges(changes, nodes).map(node => ({
            ...node,
            data: { ...nodes.find(n => n.id === node.id)?.data, ...node.data }
        }));
        set({ nodes: updatedNodes });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge(
                {
                    ...connection,
                    type: 'smoothstep',
                    animated: true,
                    markerEnd: {
                        type: MarkerType.Arrow,
                        height: 20,
                        width: 20,
                    },
                    style: { strokeWidth: 2 },
                    data: {
                        deleteIcon: true,
                        deleteEdge: (edgeId) => get().deleteEdge(edgeId),
                    },
                },
                get().edges
            ),
        });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => 
                node.id === nodeId 
                    ? { ...node, data: { ...node.data, [fieldName]: fieldValue }}
                    : node
            ),
        });
    },
    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter(node => node.id !== nodeId),
            edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
        });
    },
    deleteEdge: (edgeId) => {
        set({
            edges: get().edges.filter(edge => edge.id !== edgeId)
        });
    }
}));