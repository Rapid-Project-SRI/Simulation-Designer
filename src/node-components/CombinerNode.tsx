import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore'
import { NodeProps } from './NodeTypes';

const CombinerNode: React.FC<NodeProps> = observer(({ data }) => {
  const nodeData: FlowNode = flowStore.nodes.find((n) => n.id === data.nodeId)!;

  return (
    <div className='node-container bg-node-orange-light'>
      <Handle type="target" position={Position.Left} />
      <div
        className="flex p-2">
        <h3 className="node-letter text-node-orange-dark">C</h3>
        <div>
          <h3 className="text-node-orange-dark font-semibold text-lg">Combiner Node</h3>
          <p>ID: {nodeData?.label}</p>
          <p>Type: {nodeData?.dataType}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Right}/>
      {/* <strong>Combiner Node</strong>
      <div>{nodeData?.label}</div>
      <div>id: {nodeData?.id}</div>
      <div>Merge Mode: {nodeData?.mode}</div>
      <div style={{ marginBottom: 5 }}>Output Variable: {nodeData?.variableName}</div> */}
      {/* <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div> */}
    </div>
  );
});

export default CombinerNode;
