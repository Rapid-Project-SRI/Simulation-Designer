import { FlowNode } from "../FlowStore";
import { Node as ReactFlowNode } from '@xyflow/react';

// Custom node data structure
export type NodeData = {
    nodeId: string;
};

// Custom node props extending the React Flow node props
export type NodeProps = {
    data: NodeData;
    selected?: boolean;
    positionAbsoluteX?: number;
    positionAbsoluteY?: number;
};

export type CombineMode = 'merge' | 'zip' | 'combineLatest';

export type NodeDetailProps = { node: FlowNode };
