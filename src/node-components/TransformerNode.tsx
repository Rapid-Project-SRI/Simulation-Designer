import React from 'react'
import { flowStore } from '../FlowStore';
import { Handle, Position } from 'react-flow-renderer';
import { observer } from 'mobx-react-lite';
import { NodeProps } from './NodeTypes';

const TransformerNode: React.FC<NodeProps> = observer(({ data }) => {
  // Retrieve the saved expression from your store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);
  // Use a separate state for the draft expression.
  const [draftExpression, setDraftExpression] = React.useState<string>(nodeData?.expression || '');

  return (
    <div
      style={{
        padding: 10,
        background: '#fdfefe',
        border: '1px solid #777',
        borderRadius: 5,
        width: 250,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      <strong>Transformer Node</strong>
      <div>{nodeData?.label}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
    </div>
  );
});

export default TransformerNode