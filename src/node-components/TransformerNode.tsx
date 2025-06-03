import React from 'react'
import { flowStore } from '../FlowStore';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { NodeProps } from './NodeTypes';

const TransformerNode: React.FC<NodeProps> = observer(({ data }) => {
  // Retrieve the saved expression from your store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className='node-container bg-node-green-light border-node-green-dark'>
      <Handle type="target" position={Position.Left} />
      <div className="flex p-2">
        <h3 className="node-letter text-node-green-dark">T</h3>
        <div>
          <h3 className="node-label text-node-green-dark">{nodeData?.label}</h3>
          <p>Type: {nodeData?.dataType}</p>
          <p>Variable: {nodeData?.variableName}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right}/>
    </div>
  );
});

export default TransformerNode