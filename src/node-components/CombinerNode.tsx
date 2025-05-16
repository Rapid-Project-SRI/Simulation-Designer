import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore'
import { NodeProps } from './NodeTypes';

const CombinerNode: React.FC<NodeProps> = observer(({ data }) => {
  const nodeData: FlowNode = flowStore.nodes.find((n) => n.id === data.nodeId)!;

  return (
    <div style={{ padding: 10, background: '#e8f5e9', border: '1px solid #777', borderRadius: 5, width: 250 }}>
      {/* Input handle(s) */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      {/* Output handle */}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      <strong>Combiner Node</strong>
      <div>{nodeData?.label}</div>
      <div>id: {nodeData?.id}</div>
      <div>Merge Mode: {nodeData?.mode}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
      {/* <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div> */}
    </div>
  );
});

export default CombinerNode;
