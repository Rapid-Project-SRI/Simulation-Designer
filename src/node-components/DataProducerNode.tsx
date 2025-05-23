import { observer } from 'mobx-react-lite';
import React, { useEffect, useCallback, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import { flowStore, FlowNode } from '../FlowStore';
import { NodeProps } from './NodeTypes';
import { getDefaultValueForType } from '../utils';
import { DataType } from '../items';

export interface PatternItem<T> {
    data: T;
    delayTicks: number; // Delay in ticks.
}

const DataProducerNode: React.FC<NodeProps> = observer(({ data }) => {
    const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);
    const defaultPattern = [{ data: getDefaultValueForType(nodeData?.dataType || DataType.NUMBER), delayTicks: 60 }];

    return (
        <div className='node-container bg-node-yellow-light'>
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            <div
                className="flex p-2">
                <h3 className="node-letter text-node-yellow-dark">D</h3>
                <div>
                <h3 className="text-node-yellow-dark font-semibold text-lg">Data Producer Node</h3>
                <p>ID: {nodeData?.label}</p>
                <p>Type: {nodeData?.dataType}</p>
                </div>
            </div>
            {/* Input handle for marking as Event-Activated */}
            {/* Output handle for connecting to downstream nodes */}
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
            {/* <div style={{ color: '#21618c' }}>{nodeData?.label}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
            <div>id: {nodeData?.id}</div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>Output Variable: {nodeData?.variableName}</div> */}
        </div>
    );
});

export default DataProducerNode;