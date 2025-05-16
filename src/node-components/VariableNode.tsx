import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { observer } from 'mobx-react-lite';
import { flowStore, DataType } from '../FlowStore';
import { NodeProps } from './NodeTypes';

const VariableNode: React.FC<NodeProps> = observer(({ data }) => {
  // Get Saved Node Data from Flow Store.
  const nodeData = flowStore.nodes.find((n) => n.id === data.nodeId);

  const renderInitialValueInput = () => {
    if (!nodeData) return null;

    switch (nodeData.dataType) {
      case DataType.NUMBER:
        return (
          <input
            type="number"
            value={nodeData.initialValue || 0}
            onChange={(e) => flowStore.updateNodeInitialValue(nodeData.id, Number(e.target.value))}
            style={{ width: '60px', marginLeft: 5 }}
          />
        );
      case DataType.STRING:
        return (
          <input
            type="text"
            value={nodeData.initialValue || ''}
            onChange={(e) => flowStore.updateNodeInitialValue(nodeData.id, e.target.value)}
            style={{ width: '60px', marginLeft: 5 }}
          />
        );
      case DataType.BOOLEAN:
        return (
          <input
            type="checkbox"
            checked={nodeData.initialValue || false}
            onChange={(e) => flowStore.updateNodeInitialValue(nodeData.id, e.target.checked)}
            style={{ marginLeft: 5 }}
          />
        );
      case DataType.OBJECT:
        return (
          <input
            type="text"
            value={JSON.stringify(nodeData.initialValue || {})}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                flowStore.updateNodeInitialValue(nodeData.id, parsed);
              } catch (err) {
                // Invalid JSON, ignore
              }
            }}
            style={{ width: '60px', marginLeft: 5 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 10, background: '#f0f0f0', borderRadius: 5, minWidth: 150 }}>
      <Handle type="target" position={Position.Left} />
      <div style={{ marginBottom: 5 }}>{nodeData?.label}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>ID: {nodeData?.id}</div>
      <div style={{ fontSize: '0.8em', color: '#666' }}>Type: {nodeData?.dataType}</div>
      <div style={{ fontSize: '0.8em', color: '#666', marginTop: 5 }}>
        Initial Value: {renderInitialValueInput()}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default VariableNode;