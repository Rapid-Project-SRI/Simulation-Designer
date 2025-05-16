import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const VariableNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className='p-2 bg-node-blue-light rounded-app flex flex-col items-center justify-center'>
      <Handle type="target" position={Position.Left} />
      <div
        className="flex p-4 bg-node-blue-light rounded-app">
        <h3 className="big-letter text-node-blue-dark font-bold text-3xl mr-4">X</h3>
        <div>
          <h3 className="text-node-blue-dark font-semibold text-lg">Variable Node</h3>
          <div style={{ marginBottom: 5 }}>{nodeData?.label}</div>
          <div style={{ fontSize: '0.8em', color: '#666' }}>ID: {nodeData?.id}</div>
          <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
          <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default VariableNode;