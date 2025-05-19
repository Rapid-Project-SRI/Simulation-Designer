import React from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { CombineMode } from './NodeTypes';

const CombinerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <div>
            <div>
                <div className='form-label'>Mode</div>
                <select className="form-input bg-node-orange-light" id="combinerMode" value={node.mode} onChange={(e) => flowStore.updateCombinerMode(node.id, e.target.value as CombineMode)}>
                    <option value="merge">Merge</option>
                    <option value="zip">Zip</option>
                    <option value="combineLatest">Combine Latest</option>
                </select>
            </div>
        </div>
    )
});

export default CombinerDetails