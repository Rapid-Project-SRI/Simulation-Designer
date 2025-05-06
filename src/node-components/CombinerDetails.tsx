import React from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { CombineMode } from './NodeTypes';

const CombinerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <div style={{ marginTop: 10 }}>
            <div style={{ marginBottom: 5 }}>Output Variable: {node.variableName}</div>
            <label htmlFor="combinerMode">Mode: </label>
            <select id="combinerMode" value={node.mode} onChange={(e) => flowStore.updateCombinerMode(node.id, e.target.value as CombineMode)}>
                <option value="merge">Merge</option>
                <option value="zip">Zip</option>
                <option value="combineLatest">Combine Latest</option>
            </select>
        </div>
    )
});

export default CombinerDetails