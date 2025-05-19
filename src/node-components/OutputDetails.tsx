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
            <div>
                <div className='form-label'>Data Type</div>
                <select
                    value={node.dataType}
                    onChange={(e) => flowStore.updateNodeDataType(node.id, e.target.value as DataType)}
                    className='form-input bg-node-gray-light'
                >
                    <option value={DataType.NUMBER}>Number</option>
                    <option value={DataType.STRING}>String</option>
                    <option value={DataType.BOOLEAN}>Boolean</option>
                    <option value={DataType.OBJECT}>Object</option>
                </select>
            </div>
        </div>
    )
});

export default OutputDetails