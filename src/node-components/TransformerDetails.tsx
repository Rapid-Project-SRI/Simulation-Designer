import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes';

const TransformerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    const availableVariables: (string | undefined)[] = flowStore.edges
        .filter(edge => edge.target === node.id)
        .map(edge => flowStore.nodes.find(node => node.id === edge.source))
        .map(node => node?.variableName);

    return (
        <>
            <div style={{ marginBottom: 5 }}>Output Variable: {node.outputVariableName}</div>
            <input
                value={node.outputVariableName || ''}
                onChange={(e) => flowStore.updateNodeOutputVariableName(node.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
                placeholder="Enter output variable name..."
            />
            <div>Available Variables: {availableVariables.toString()}</div>
            <textarea
                value={node.expression}
                onChange={(e) => flowStore.updateCalcExpression(node.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
            />
        </>
    )
});

export default TransformerDetails