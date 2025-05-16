import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes';
import "./NodeDetails.css";

const TransformerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    const availableVariables: (string | undefined)[] = flowStore.edges
        .filter(edge => edge.target === node.id)
        .map(edge => flowStore.nodes.find(node => node.id === edge.source))
        .map(node => node?.variableName);

    return (
        <>
            <h4 style={{ marginBottom: 4 }}>Output Variable: {node.variableName}</h4>
            <textarea
                className="node-details transformer"
                value={node.expression}
                onChange={(e) => flowStore.updateCalcExpression(node.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
            />
            <h4 style={{ marginBottom: 4 }}>
                Available Variables: {availableVariables.length > 0 && availableVariables.some(v => v) 
                    ? availableVariables.filter(v => v).join(', ') 
                    : 'None'}
            </h4>
            
        </>
    )
});

export default TransformerDetails