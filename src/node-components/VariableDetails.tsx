import { observer } from 'mobx-react-lite'
import React from 'react'
import { flowStore } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes'

const VariableDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <>
            <div className='form-label'>Output Variable</div>
            <input
                value={node.variableName}
                onChange={(e) => flowStore.updateNodeVariableName(node.id, e.target.value)}
                className='form-input bg-node-blue-light'
            />
        </>
    )
});

export default VariableDetails