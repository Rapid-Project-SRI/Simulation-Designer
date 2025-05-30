import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const VariableNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className='node-container bg-node-blue-light'>
      <Handle type="target" position={Position.Left} />
      <div
        className="flex p-2">
        <h3 className="node-letter text-node-blue-dark">X</h3>
        <div>
          <h3 className="text-node-blue-dark font-semibold text-lg">{nodeData?.label}</h3>
          <p>Type: {nodeData?.dataType}</p>
          <p>Variable: {nodeData?.variableName}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default VariableNode;