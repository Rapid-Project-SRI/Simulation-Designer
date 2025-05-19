import React from 'react'
import { flowStore } from '../FlowStore';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { NodeProps } from './NodeTypes';

const TransformerNode: React.FC<NodeProps> = observer(({ data }) => {
  // Retrieve the saved expression from your store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);
  // Use a separate state for the draft expression.
  const [draftExpression, setDraftExpression] = React.useState<string>(nodeData?.expression || '');

  return (
    <div className='node-container bg-node-green-light'>
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      <div
        className="flex p-2">
        <h3 className="node-letter text-node-green-dark">T</h3>
        <div>
          <h3 className="text-node-green-dark font-semibold text-lg">Transformer Node</h3>
          <p>ID: {nodeData?.label}</p>
          <p>Type: {nodeData?.dataType}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />

      {/* <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div> */}
    </div>
  );
});

export default TransformerNode