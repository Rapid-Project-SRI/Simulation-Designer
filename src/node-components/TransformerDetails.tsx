import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNode } from '../FlowStore';
import { NodeDetailProps } from './NodeTypes';

const TransformerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    const availableVariables: (string | undefined)[] = flowStore.edges
        .filter(edge => edge.target === node.id)
        .map(edge => flowStore.nodes.find(node => node.id === edge.source))
        .map(node => node?.variableName);

        const renderAvailableVariables = () => {
            const filteredVariables = availableVariables.filter(variable => variable); // Filter out undefined values
    
            if (filteredVariables.length === 0) {
                return (
                    <p className="bg-node-green-dark text-white p-1 rounded-app italic">
                        No Connected Sources
                    </p>
                );
            }
    
            return filteredVariables.map((variable, index) => (
                <p
                    key={index}
                    className="inline-block bg-node-green-dark text-white px-2 py-1 rounded-md mr-2 mb-2"
                >
                    {variable}
                </p>
            ));
        };

    return (
        <div className='grid gap-4'>
            <div>
                <div className='form-label'>Output Variable</div>
                <input
                    value={node.variableName || ''}
                    onChange={(e) => flowStore.updateNodeVariableName(node.id, e.target.value)}
                    className='form-input bg-node-green-light'
                    placeholder="Enter output variable name..."
                />
            </div>
            <div>
                <div className='form-label'>Available Variables</div>
                <div className="flex flex-wrap">{renderAvailableVariables()}</div>
            </div>
            <div>
                <div className='form-label'>Function Builder</div>
                <textarea
                    value={node.expression}
                    onChange={(e) => flowStore.updateCalcExpression(node.id, e.target.value)}
                    className='form-input bg-node-green-light'
                />
            </div>
        </div>
    )
});

export default TransformerDetails