import { observer } from 'mobx-react-lite'
import React from 'react'
import { flowStore, DataType } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes'

const OutputDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <>
            <div style={{ marginBottom: 5 }}>Output Variable: {node.outputVariableName}</div>
            <input
                value={node.outputVariableName || ''}
                onChange={(e) => flowStore.updateNodeOutputVariableName(node.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
                placeholder="Enter output variable name..."
            />
            <div style={{ marginBottom: 5 }}>Data Type: {node.dataType}</div>
            <select
                value={node.dataType}
                onChange={(e) => flowStore.updateNodeDataType(node.id, e.target.value as DataType)}
                style={{ width: '100%', marginBottom: 5 }}
            >
                <option value={DataType.NUMBER}>Number</option>
                <option value={DataType.STRING}>String</option>
                <option value={DataType.BOOLEAN}>Boolean</option>
                <option value={DataType.OBJECT}>Object</option>
            </select>
        </>
    )
});

export default OutputDetails