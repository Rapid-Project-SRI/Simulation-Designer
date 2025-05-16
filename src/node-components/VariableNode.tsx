import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const VariableNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div style={{ padding: 10, background: '#f0f0f0', borderRadius: 5, minWidth: 150 }}>
      <Handle type="target" position={Position.Left} />
      <div style={{ marginBottom: 5 }}>{nodeData?.label}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>ID: {nodeData?.id}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default VariableNode;