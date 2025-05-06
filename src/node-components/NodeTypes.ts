import { FlowNode } from "../FlowStore";

export type NodeProps = {
    data: { nodeId: string }
}
export type CombineMode = 'merge' | 'zip' | 'combineLatest';

export type NodeDetailProps = { node: FlowNode };
