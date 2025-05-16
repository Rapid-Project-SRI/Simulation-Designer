import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const VariableNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div style={{ padding: 10, background: '#d6eaf8', border: '1px solid #777', borderRadius: 5 }}>
      <div><strong>Variable Node</strong></div>
      <Handle type="source" position={Position.Right} />
      <div style={{ color: '#21618c' }}>{nodeData?.variableName}</div>
      <div>id: {nodeData?.id}</div>
    </div>
  );
});

export default VariableNode;