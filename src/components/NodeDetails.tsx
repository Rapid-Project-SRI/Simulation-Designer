import React from 'react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNodeType, FlowNode, DataType } from '../FlowStore';
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
        return (
            <div style={{ padding: 16 }}>
                <div>No node selected</div>
            </div>
        );
    }

    const handleDelete = () => {
        flowStore.deleteNode(selected.id);
    };

    const DetailComponent = nodeMap[selected.type][0];

    return (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ marginBottom: 16, fontWeight: 'bold' }}>
                {nodeMap[selected.type][1]}
            </div>

            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Label:</div>
                <input
                    style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                    value={selected.label}
                    onChange={(e) => flowStore.updateNodeLabel(selected.id, e.target.value)}
                />
            </div>

            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Data Type:</div>
                <select
                    style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
                    value={selected.dataType}
                    onChange={(e) => flowStore.updateNodeDataType(selected.id, e.target.value as DataType)}
                >
                    {Object.values(DataType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
                {DetailComponent && <DetailComponent node={selected} />}
            </div>

            <button
                onClick={handleDelete}
                style={{
                    width: '100%',
                    padding: '10px 0',
                    backgroundColor: '#f55',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f33'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f55'}
            >
                Delete Node
            </button>
        </div>
    );
});

export default NodeDetails;

