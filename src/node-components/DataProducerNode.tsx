import { observer } from 'mobx-react-lite';
import React, { useEffect, useCallback, useRef } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { flowStore, FlowNode } from '../FlowStore';
import { NodeProps } from './NodeTypes';

export interface PatternItem<T> {
    data: T;
    delayTicks: number; // Delay in ticks.
}

const DataProducerNode: React.FC<NodeProps> = observer(({ data }) => {
    const nodeData: FlowNode = flowStore.nodes.find((n) => n.id === data.nodeId)!;

    return (
        <div style={{ padding: 10, background: '#f0f0f0', border: '1px solid #ddd', borderRadius: 5 }}>
            <div><strong>Data Producer Node</strong></div>
            {/* Input handle for marking as Event-Activated */}
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            {/* Output handle for connecting to downstream nodes */}
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
            <div>{nodeData?.label}</div>
            <div>id: {nodeData?.id}</div>
            <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
        </div>
    );
});

export default DataProducerNode;