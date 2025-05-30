import { observer } from 'mobx-react-lite'
import React from 'react'
import { flowStore, DataType } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes'

const OutputDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <div className='grid gap-4'>
            <div>
                <div className='form-label'>Output Variable</div>
                <input
                    value={node.variableName || ''}
                    onChange={(e) => flowStore.updateNodeVariableName(node.id, e.target.value)}
                    className='form-input bg-node-gray-light'
                />
            </div>
        </div>
    )
});

export default OutputDetails