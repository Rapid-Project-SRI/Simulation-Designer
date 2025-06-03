import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore'
import { NodeProps } from './NodeTypes';

const CombinerNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData: FlowNode = flowStore.nodes.find((n) => n.id === data.nodeId)!;

  return (
    <div className='node-container bg-node-orange-light border-node-orange-dark'>
      <Handle type="target" position={Position.Left} />
      <div className="flex p-2">
        <h3 className="node-letter text-node-orange-dark">C</h3>
        <div>
          <h3 className="node-label text-node-orange-dark"> {nodeData?.label}</h3>
          <p>Type: {nodeData?.dataType}</p>
          <p>Mode: {nodeData?.mode}</p>
          <p>Variable: {nodeData?.variableName}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right}/>
    </div>
  );
});

export default CombinerNode;
