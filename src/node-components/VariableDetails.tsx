import { observer } from 'mobx-react-lite'
import React from 'react'
import { flowStore } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes';
import "./NodeDetails.css";

const VariableDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <>
            <h4 style={{ marginBottom: 4 }}>Output Variable: {node.variableName}</h4>
            <input 
                className="node-details variable"
                value={node.variableName}
                onChange={(e) => flowStore.updateNodeVariableName(node.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
            />
        </>
    )
});

export default VariableDetails