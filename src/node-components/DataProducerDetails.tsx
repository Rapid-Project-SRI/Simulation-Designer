import React from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { PatternItem } from './DataProducerNode';

const DataProducerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    // Add a new row with default values.
    const addRow = () => {
        const newRow: PatternItem<number> = { data: 0, delayTicks: 0 };
        flowStore.updateNodePattern(node.id, [...node.pattern!, newRow]);
    };

    // Update a specific row.
    const updateRow = (index: number, key: 'data' | 'delayTicks', value: number) => {
        const newPattern: PatternItem<number>[] = [...node.pattern!];
        newPattern[index] = { ...newPattern[index], [key]: value }
        flowStore.updateNodePattern(node.id, newPattern);
    };

    // Remove a row.
    const removeRow = (index: number) => {
        const newPattern = node.pattern!.filter((_, i) => i !== index);
        flowStore.updateNodePattern(node.id, newPattern);
    };

    return (
        <>
            <div style={{ marginBottom: 5 }}>Output Variable: {node.variableName}</div>
            {/* Pattern editor */}
            <div style={{ marginTop: 10 }}>
                <div style={{ marginBottom: 5 }}>
                    <strong>Pattern:</strong>
                </div>
                {node.pattern!.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                        <input
                            type="number"
                            value={item.data}
                            onChange={(e) => updateRow(index, 'data', Number(e.target.value))}
                            placeholder="Data"
                            style={{ width: 80, marginRight: 5 }}
                        />
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
            <div style={{ marginTop: 10 }}>
                <div style={{ marginBottom: 5 }}>
                    <strong>Time Settings:</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <label style={{ marginRight: 5 }}>Start Tick:</label>
                    <input
                        type="number"
                        value={node.startTick}
                        onChange={(e) => flowStore.updateNodeTime(node.id, Number(e.target.value), node.endTick!)}
                        style={{ width: 100 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: 5 }}>End Tick:</label>
                    <input
                        type="number"
                        value={node.endTick}
                        onChange={(e) => flowStore.updateNodeTime(node.id, node.startTick!, Number(e.target.value))}
                        style={{ width: 100 }}
                    />
                </div>
            </div>
        </>
    )
});

export default DataProducerDetails