import React from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { CombineMode } from './NodeTypes';
import "./NodeDetails.css";


const CombinerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <div style={{ marginTop: 10 }}>
            <h4 style={{ marginBottom: 20 }}>Output Variable: {node.variableName}</h4>
            <label style={{ fontWeight: "bold" }} htmlFor="combinerMode">Mode: </label>
            <select className="node-details combiner" id="combinerMode" value={node.mode} onChange={(e) => flowStore.updateCombinerMode(node.id, e.target.value as CombineMode)}>
                <option value="merge">Merge</option>
                <option value="zip">Zip</option>
                <option value="combineLatest">Combine Latest</option>
            </select>
        </div>
    )
});

export default CombinerDetails