import React from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore, DataType } from '../FlowStore';
import { PatternItem } from './DataProducerNode';
import { getDefaultValueForType } from '../utils';

const DataProducerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    // Add a new row with default values.
    const addRow = () => {
        const newRow: PatternItem<any> = {
            data: getDefaultValueForType(node.dataType),
            delayTicks: 0
        };
        flowStore.updateNodePattern(node.id, [...node.pattern!, newRow]);
    };

    // Update a specific row.
    const updateRow = (index: number, key: 'data' | 'delayTicks', value: any) => {
        const newPattern: PatternItem<any>[] = [...node.pattern!];
        newPattern[index] = { ...newPattern[index], [key]: value }
        flowStore.updateNodePattern(node.id, newPattern);
    };

    // Remove a row.
    const removeRow = (index: number) => {
        const newPattern = node.pattern!.filter((_, i) => i !== index);
        flowStore.updateNodePattern(node.id, newPattern);
    };

    const renderDataInput = (item: PatternItem<any>, index: number) => {
        switch (node.dataType) {
            case DataType.NUMBER:
                return (
                    <input
                        type="number"
                        value={item.data}
                        onChange={(e) => updateRow(index, 'data', Number(e.target.value))}
                        placeholder="Data"
                        style={{ width: 80, marginRight: 5 }}
                    />
                );
            case DataType.STRING:
                return (
                    <input
                        type="text"
                        value={item.data}
                        onChange={(e) => updateRow(index, 'data', e.target.value)}
                        placeholder="Data"
                        style={{ width: 80, marginRight: 5 }}
                    />
                );
            case DataType.BOOLEAN:
                return (
                    <input
                        type="checkbox"
                        checked={item.data}
                        onChange={(e) => updateRow(index, 'data', e.target.checked)}
                        style={{ marginRight: 5 }}
                    />
                );
            case DataType.OBJECT:
                return (
                    <input
                        type="text"
                        value={JSON.stringify(item.data)}
                        onChange={(e) => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                updateRow(index, 'data', parsed);
                            } catch (err) {
                                // Invalid JSON, ignore
                            }
                        }}
                        placeholder="JSON object"
                        style={{ width: 150, marginRight: 5 }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div style={{ marginBottom: 5 }}>Output Variable: {node.variableName}</div>
            <div style={{ marginBottom: 5 }}>Data Type: {node.dataType}</div>
            {/* Pattern editor */}
            <div style={{ marginTop: 10 }}>
                <div style={{ marginBottom: 5 }}>
                    <strong>Pattern:</strong>
                </div>
                {node.pattern!.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                        {renderDataInput(item, index)}
                        <input
                            type="number"
                            value={item.delayTicks}
                            onChange={(e) => updateRow(index, 'delayTicks', Number(e.target.value))}
                            placeholder="Delay (ms)"
                            style={{ width: 100, marginRight: 5 }}
                        />
                        <button
                            onClick={() => removeRow(index)}
                            style={{
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: 3,
                                cursor: 'pointer',
                                padding: '2px 6px',
                            }}
                            title="Remove row"
                        >
                            X
                        </button>
                    </div>
                ))}
                <button
                    onClick={addRow}
                    style={{
                        padding: '4px 8px',
                        borderRadius: 3,
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    title="Add row"
                >
                    +
                </button>
            </div>

            {/* Time settings */}
            <div style={{ marginBottom: 10 }}>
                <div style={{ marginBottom: 5, fontWeight: 'bold' }}>Time Settings</div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 5 }}>
                    <div>
                        <label>Start Tick:</label>
                        <input
                            type="number"
                            value={node.startTick || 0}
                            onChange={(e) => flowStore.updateNodeTime(node.id, Number(e.target.value), node.endTick || 0)}
                            style={{ width: '60px', marginLeft: 5 }}
                        />
                    </div>
                    <div>
                        <label>End Tick:</label>
                        <input
                            type="number"
                            value={node.endTick || 0}
                            onChange={(e) => flowStore.updateNodeTime(node.id, node.startTick || 0, Number(e.target.value))}
                            style={{ width: '60px', marginLeft: 5 }}
                        />
                    </div>
                </div>
                <div style={{ marginTop: 5 }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={node.repeat || false}
                            onChange={(e) => flowStore.updateNodeRepeat(node.id, e.target.checked)}
                        />
                        Repeat Pattern
                    </label>
                </div>
            </div>
        </>
    )
});

export default DataProducerDetails;