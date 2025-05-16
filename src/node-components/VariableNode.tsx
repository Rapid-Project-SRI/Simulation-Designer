import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const VariableNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div style={{ padding: 10, background: '#fdfefe', border: '1px solid #777', borderRadius: 5 }}>
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      <strong>Variable Node</strong>
      <div>{nodeData?.label}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
    </div>
  );
});

export default VariableNode;