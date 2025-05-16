import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { NodeProps } from './NodeTypes';
import "./NodeDetails.css";

const EventNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  return (
    <div className="node-details event" style={{ padding: 10, border: '1px solid #777', borderRadius: 5 }}>
      <div><strong>Event Node</strong></div>
      <Handle type="source" position={Position.Right} />
      <div>{nodeData?.label}</div>
    </div>
  );
});

export default EventNode;