import React from 'react';
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
import { DataType } from '../items';

const nodeMap: Record<FlowNodeType, [React.FC<NodeDetailProps>, string, string, string]> = {
    transformerNode: [TransformerDetails, "Transformer Node", "T", "-node-green-"],
    variableNode: [VariableDetails, "Variable Node", "X", "-node-blue-"],
    dataProducerNode: [DataProducerDetails, "Data Producer Node", "D", "-node-yellow-"],
    combinerNode: [CombinerDetails, "Combiner Node", "C", "-node-orange-"],
    eventNode: [EventDetails, "Event Node", "E", "-node-purple-"],
    outputNode: [OutputDetails, "Output Node", "O", "-node-gray-"],
    branchNode: [BranchDetails, "Branch Node", "B", "-node-red-"]
};


const NodeDetails = observer(() => {
    const selectedNodeId = flowStore.selectedNodeIds[0];
    const node = flowStore.nodes.find((n) => n.id === selectedNodeId);

    if (!node) {
        return null;
    }

    const handleDelete = () => {
        flowStore.deleteNode(node.id);
    };

    const DetailComponent = nodeMap[node.type][0];
    const showDataType = node.type === 'variableNode' || node.type === 'eventNode' || node.type === 'dataProducerNode';

    const renderOutputVariableField = () => {
        if (node.type !== 'combinerNode' && node.type !== 'dataProducerNode') return null;

        return (
            <div >
                <div className="form-label">Output Variable Name</div>
                <input
                    type="text"
                    value={node.variableName || ''}
                    onChange={(e) => flowStore.updateNodeVariableName(node.id, e.target.value)}
                    placeholder="Enter output variable name..."
                    className={inputStyle} 
                />
            </div>
        );
    };

    const renderInitialValueInput = () => {
        if (node.type !== 'variableNode') return null;

        switch (node.dataType) {
            case DataType.NUMBER:
                return (
                    <div className="flex flex-col gap-2">
                        <label className="form-label">Initial Value</label>
                        <input
                            type="number"
                            value={node.initialValue || 0}
                            onChange={(e) => flowStore.updateNodeInitialValue(node.id, Number(e.target.value))}
                            className={inputStyle}
                        />
                    </div>
                );
            case DataType.STRING:
                return (
                    <div className="flex flex-col gap-2">
                        <label className="form-label">Initial Value</label>
                        <input
                            type="text"
                            value={node.initialValue || ''}
                            placeholder="Enter initial value..."
                            onChange={(e) => flowStore.updateNodeInitialValue(node.id, e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                );
            case DataType.BOOLEAN:
                return (
                    <div className="flex items-center gap-2 mt-2 mb-2">
                        <label className="form-label">Initial Value:</label>
                        <input
                            type="checkbox"
                            checked={node.initialValue || false}
                            onChange={(e) => flowStore.updateNodeInitialValue(node.id, e.target.checked)}
                            className="checkbox"
                        />
                    </div>
                );
            case DataType.OBJECT:
                return (
                    <div className="flex flex-col gap-2">
                        <label className="form-label">Initial Value (JSON)</label>
                        <textarea
                            value={JSON.stringify(node.initialValue || {})}
                            onChange={(e) => {
                                try {
                                    const parsed = JSON.parse(e.target.value);
                                    flowStore.updateNodeInitialValue(node.id, parsed);
                                } catch (err) {
                                    // Invalid JSON, ignore
                                }
                            }}
                            className={`${inputStyle} resize-none`}
                            rows={3}
                            placeholder="Enter JSON object..."
                        />
                        {!isValidJSON(node.initialValue) && (
                            <span className="text-error">Invalid JSON</span>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const isValidJSON = (value: any) => {
        try {
            JSON.stringify(value);
            return true;
        } catch (e) {
            return false;
        }
    };

    const inputStyle = `form-input ${'bg' + nodeMap[node.type][3] + 'light'}`

    return (
        <div className={`overflow-y-auto h-full p-2 flex flex-col min-w-full ${'bg' + nodeMap[node.type][3] + 'light'}`}>
            <div className='flex'>
                <h3 className={`node-letter font-bold text-3xl mb-2 mr-4 ${'text' + nodeMap[node.type][3] + 'dark'}`}>{nodeMap[node.type][2]}</h3>
                <h1 className={`font-semibold text-3x1 ${'text' + nodeMap[node.type][3] + 'dark'}`}>{nodeMap[node.type][1]}</h1>
            </div>
            <div className='bg-bg-primary p-2 grid gap-4'>
                <div>
                    <div className='form-label'>Node Label</div>
                    <input
                        type="text"
                        placeholder="Enter node label..."
                        value={node.label}
                        onChange={(e) => flowStore.updateNodeLabel(node.id, e.target.value)}
                        className={inputStyle}
                    />
                </div>

                <div>
                    <div className='form-label'>Description</div>
                    <textarea
                        value={node.description || ''}
                        onChange={(e) => flowStore.updateNodeDescription(node.id, e.target.value)}
                        rows={3}
                        placeholder="Enter node description..."
                        className={inputStyle}
                    />
                </div>

                {showDataType && (
                    <div>
                        <div className="form-label">Data Type</div>
                        <select
                            value={node.dataType}
                            onChange={(e) => flowStore.updateNodeDataType(node.id, e.target.value as DataType)}
                            className={inputStyle}
                        >
                            {Object.values(DataType).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                )}

                {renderOutputVariableField()}
                {renderInitialValueInput()}

                {/* Node-specific details */}
                <div>
                    {DetailComponent && <DetailComponent node={node} />}
                </div>

                <button onClick={handleDelete} className='btn-error'>Delete Node</button>
            </div>
        </div>
    );
});

export default NodeDetails;

