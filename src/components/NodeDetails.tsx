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

    return (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2>{nodeMap[selected.type][1]}</h2>
            <h3>Label: </h3>
            <input
                value={selected.label}
                onChange={(e) => flowStore.updateNodeLabel(selected.id, e.target.value)}
                style={{ width: '100%', marginBottom: 5 }}
            />
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)', marginBottom: 16 }}>
                {DetailComponent && <DetailComponent node={selected} />}
            </div>

            <button
                onClick={handleDelete}
                style={{
                    width: '100%',
                    padding: '10px 0',
                    background: '#f55',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                }}
            >
                Delete Node
            </button>
        </div>
    );
});

export default NodeDetails;

