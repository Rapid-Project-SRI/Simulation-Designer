import { observer } from 'mobx-react-lite';
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { flowStore  } from '../FlowStore';
import { NodeProps } from './NodeTypes';

export interface PatternItem<T> {
    data: T; // Data for the pattern item.
    delayTicks: number; // Delay in ticks.
}

const DataProducerNode: React.FC<NodeProps> = observer(({ data }) => {
    // Get Saved Node Data from Flow Store.
    const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

    return (
        <div className='node-container bg-node-yellow-light border-node-yellow-dark'>
            <Handle type="target" position={Position.Left}/>
            <div className="flex p-2">
                <h3 className="node-letter text-node-yellow-dark">D</h3>
                <div>
                <h3 className="node-label text-node-yellow-dark">{nodeData?.label}</h3>
                <p>Type: {nodeData?.dataType}</p>
                <p>Variable: {nodeData?.variableName}</p>
                </div>
            </div>
            {/* Input handle for marking as Event-Activated */}
            {/* Output handle for connecting to downstream nodes */}
            <Handle type="source" position={Position.Right} />
        </div>
    );
});

export default DataProducerNode;