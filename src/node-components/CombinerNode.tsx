import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore'
import { NodeProps } from './NodeTypes';
import "./NodeDetails.css";

const CombinerNode: React.FC<NodeProps> = observer(({ data }) => {
  const nodeData: FlowNode = flowStore.nodes.find((n) => n.id === data.nodeId)!;

  return (
    <div className="node-details combiner" style={{ padding: 10, border: '1px solid #777', borderRadius: 5, width: 250 }}>
      {/* Input handle(s) */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
      {/* Output handle */}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      <strong>Combiner Node</strong>
      <div>{nodeData?.label}</div>
      <div>Merge Mode: {nodeData?.mode}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div>
    </div>
  );
});

export default CombinerNode;
