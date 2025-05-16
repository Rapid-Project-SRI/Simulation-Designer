import { observer } from 'mobx-react-lite';
import React, { useEffect, useCallback, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import { flowStore, FlowNode, DataType } from '../FlowStore';
import { NodeProps } from './NodeTypes';
import { getDefaultValueForType } from '../utils';

export interface PatternItem<T> {
    data: T;
    delayTicks: number; // Delay in ticks.
}

const DataProducerNode: React.FC<NodeProps> = observer(({ data }) => {
    const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);
    const defaultPattern = [{ data: getDefaultValueForType(nodeData?.dataType || DataType.NUMBER), delayTicks: 60 }];

    return (
        <div style={{ padding: 10, background: '#d6eaf8', border: '1px solid #777', borderRadius: 5 }}>
            <div><strong>Data Producer</strong></div>
            {/* Input handle for marking as Event-Activated */}
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            {/* Output handle for connecting to downstream nodes */}
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
            <div style={{ color: '#21618c' }}>{nodeData?.label}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
            <div>id: {nodeData?.id}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Output Variable: {nodeData?.variableName}</div>
        </div>
    );
});

export default DataProducerNode;