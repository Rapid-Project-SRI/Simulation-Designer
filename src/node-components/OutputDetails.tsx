import { observer } from 'mobx-react-lite'
import React from 'react'
import { flowStore } from '../FlowStore';
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
        </>
    )
});

export default OutputDetails