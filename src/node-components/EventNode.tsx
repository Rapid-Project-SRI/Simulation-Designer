import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const EventNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className='node-container bg-node-purple-light'>
      <Handle type="source" position={Position.Right} />
      <div
        className="flex p-2">
        <h3 className="node-letter text-node-purple-dark">E</h3>
        <div>
          <h3 className="text-node-purple-dark font-semibold text-lg">Event Node</h3>
          <p>ID: {nodeData?.label}</p>
          <p>Type: {nodeData?.dataType}</p>
        </div>
      </div>
    </div>
  );
});

export default EventNode;