import { observer } from 'mobx-react-lite'
import React from 'react'
import { flowStore } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes'

const VariableDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <>
            <div style={{ marginBottom: 5 }}>Output Variable: {node.variableName}</div>
            <input
                value={node.variableName}
                onChange={(e) => flowStore.updateNodeVariableName(node.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
            />
        </>
    )
});

export default VariableDetails