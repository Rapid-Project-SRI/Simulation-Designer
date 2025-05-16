import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNodeType, FlowNode } from '../FlowStore';
import TransformerDetails from '../node-components/TransformerDetails';
import { NodeDetailProps } from '../node-components/NodeTypes';
import VariableDetails from '../node-components/VariableDetails';
import DataProducerDetails from '../node-components/DataProducerDetails';
import CombinerDetails from '../node-components/CombinerDetails';
import EventDetails from '../node-components/EventDetails'
import OutputDetails from '../node-components/OutputDetails';
import BranchDetails from '../node-components/BranchDetails'

// Add this mapping for background colors
const nodeTypeBgColors: Record<FlowNodeType, string> = {
    variableNode: '#E5F2FD',
    transformerNode: '#EAF7EA',
    dataProducerNode: '#FFF9E5',
    combinerNode: '#FFF0ED',
    eventNode: '#F2EBFD',
    outputNode: '#F1F0F6',
    branchNode: '#ECECEC'
};

const nodeMap: Record<FlowNodeType, [React.FC<NodeDetailProps>, string]> = {
    transformerNode: [TransformerDetails, "Transformer Node"],
    variableNode: [VariableDetails, "Variable Node"],
    dataProducerNode: [DataProducerDetails, "Data Producer Node"],
    combinerNode: [CombinerDetails, "Combiner Node"],
    eventNode: [EventDetails, "Event Node"],
    outputNode: [OutputDetails, "Output Node"],
    branchNode: [BranchDetails, "Branch Node"]
}

const NodeDetails: React.FC = observer(() => {
    const selected = flowStore.nodes.find((n) => n.id === flowStore.selectedNodeIds[0]);

    if (!selected) {
        return <div style={{ padding: 16 }}>No node selected</div>;
    }

    const handleDelete = () => {
        flowStore.deleteNode(selected.id);
    };

    const DetailComponent = nodeMap[selected.type][0];
    const inputBg = nodeTypeBgColors[selected.type] || '#fff';

    return (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%', background: '#ECECEC' }}>
            <h2
                style={{
                    backgroundColor: inputBg,
                    margin: 0,
                    padding: '12px 8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    borderRadius: 8
                }}
            >
                {nodeMap[selected.type][1]}
            </h2>
            <h4 style={{ marginBottom: 4 }}>Node Label</h4>
            <input
                value={selected.label}
                onChange={(e) => flowStore.updateNodeLabel(selected.id, e.target.value)}
                style={{
                    width: '100%',
                    marginBottom: 5,
                    background: inputBg,
                    border: '1px solid #bbb',
                    borderRadius: 4,
                    padding: 8,
                    boxSizing: 'border-box'
                }}
            />
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)', marginBottom: 16 }}>
                {DetailComponent && <DetailComponent node={selected} />}
            </div>

            <button
                onClick={handleDelete}
                style={{
                    width: '100%',
                    maxWidth: 120,
                    padding: '10px 0',
                    background: '#DA7D54',
                    color: 'white',
                    fontWeight: 'bold',
                    border: '2px solid #DA7D54',
                    borderRadius: 4,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    alignSelf: 'center',
                    transition: 'background 0.2s, color 0.2s, border 0.2s'
                }}
                onMouseOver={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'white';
                    (e.currentTarget as HTMLButtonElement).style.color = '#DA7D54';
                }}
                onMouseOut={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#DA7D54';
                    (e.currentTarget as HTMLButtonElement).style.color = 'white';
                }}
            >
                Delete Node
            </button>
        </div>
    );
});

export default NodeDetails;

