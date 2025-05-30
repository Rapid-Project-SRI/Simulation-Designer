import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const EventNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className='node-container bg-node-purple-light border-1 border-node-purple-dark'>
      <Handle type="source" position={Position.Right} />
      <div
        className="flex p-2">
        <h3 className="node-letter text-node-purple-dark">E</h3>
        <div>
          <h3 className="text-node-purple-dark font-semibold text-lg">{nodeData?.label}</h3>
        </div>
      </div>
    </div>
  );
});

export default EventNode;