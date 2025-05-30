import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const OutputNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className='node-container bg-node-gray-light border-1 border-node-gray-dark'>
      <Handle type="target" position={Position.Left} />
      {/* <div style={{ color: '#21618c' }}>{nodeData?.label}</div>
      <div>id: {nodeData?.id}</div> */}
      <div
        className="flex p-2">
        <h3 className="node-letter text-node-gray-dark">O</h3>
        <div>
          <h3 className="text-node-gray-dark font-semibold text-lg">{nodeData?.label}</h3>
          <p>Type: {nodeData?.dataType}</p>
        </div>
      </div>
    </div>
  );
});

export default OutputNode;