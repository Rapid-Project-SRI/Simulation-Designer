import React from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { PatternItem } from './DataProducerNode';
import "./NodeDetails.css";


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
            <h4 style={{ marginBottom: 4 }}>Output Variable: {node.variableName}</h4>
            {/* Pattern editor */}
            <h4 style={{ marginBottom: 4 }}>Pattern: {node.variableName}</h4>
                {node.pattern!.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                        <input
                            className="node-details data-producer"
                            type="number"
                            value={item.data}
                            onChange={(e) => updateRow(index, 'data', Number(e.target.value))}
                            placeholder="Data"
                            style={{ width: 80, marginRight: 5 }}
                        />
                        <input
                            className="node-details data-producer"
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
                                border: '2px solid #e74c3c',
                                borderRadius: 3,
                                cursor: 'pointer',
                                padding: '2px 6px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                fontWeight: 'bold',
                                transition: 'background 0.2s, color 0.2s, border 0.2s'
                            }}
                            onMouseOver={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'white';
                                (e.currentTarget as HTMLButtonElement).style.color = '#e74c3c';
                                (e.currentTarget as HTMLButtonElement).style.border = '2px solid #e74c3c';
                            }}
                            onMouseOut={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = '#e74c3c';
                                (e.currentTarget as HTMLButtonElement).style.color = 'white';
                                (e.currentTarget as HTMLButtonElement).style.border = '2px solid #e74c3c';
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
                        border: '2px solid #27ae60',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        fontWeight: 'bold',
                        transition: 'background 0.2s, color 0.2s, border 0.2s'
                    }}
                    onMouseOver={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'white';
                        (e.currentTarget as HTMLButtonElement).style.color = '#27ae60';
                        (e.currentTarget as HTMLButtonElement).style.border = '2px solid #27ae60';
                    }}
                    onMouseOut={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#27ae60';
                        (e.currentTarget as HTMLButtonElement).style.color = 'white';
                        (e.currentTarget as HTMLButtonElement).style.border = '2px solid #27ae60';
                    }}
                    title="Add row"
                >
                    +
                </button>
       

            {/* Time settings */}
            <h4 style={{ marginBottom: 4 }}>Time Settings</h4>
              
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
                    <label style={{ marginRight: 5 }}>Start Tick:</label>
                    <input
                        className="node-details data-producer"
                        type="number"
                        value={node.startTick}
                        onChange={(e) => flowStore.updateNodeTime(node.id, Number(e.target.value), node.endTick!)}
                        style={{ width: 100 }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: 5, paddingRight: 5 }}>End Tick:</label>
                    <input
                        className="node-details data-producer"
                        type="number"
                        value={node.endTick}
                        onChange={(e) => flowStore.updateNodeTime(node.id, node.startTick!, Number(e.target.value))}
                        style={{ width: 100 }}
                    />
                </div>
        </>
    )
});

export default DataProducerDetails