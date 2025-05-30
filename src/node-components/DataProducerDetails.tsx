import React, { useState } from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore, DataType } from '../FlowStore';
import { PatternItem } from './DataProducerNode';
import { getDefaultValueForType } from '../utils';
import { FaExpandAlt } from "react-icons/fa";
import { RiCollapseDiagonalLine } from "react-icons/ri";



const DataProducerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    const [isPatternCollapsed, setIsPatternCollapsed] = useState(true);
    const [isTimeSettingsCollapsed, setIsTimeSettingsCollapsed] = useState(true);

    const togglePattern = () => setIsPatternCollapsed(!isPatternCollapsed);
    const toggleTimeSettings = () => setIsTimeSettingsCollapsed(!isTimeSettingsCollapsed);

    const addRow = () => {
        const newRow: PatternItem<any> = {
            data: getDefaultValueForType(node.dataType),
            delayTicks: 0,
        };
        flowStore.updateNodePattern(node.id, [...node.pattern!, newRow]);
    };

    const updateRow = (index: number, key: 'data' | 'delayTicks', value: any) => {
        const newPattern: PatternItem<any>[] = [...node.pattern!];
        newPattern[index] = { ...newPattern[index], [key]: value };
        flowStore.updateNodePattern(node.id, newPattern);
    };

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
                        className="form-input"
                    />
                );
            case DataType.STRING:
                return (
                    <input
                        type="text"
                        value={item.data}
                        onChange={(e) => updateRow(index, 'data', e.target.value)}
                        placeholder="Data"
                        className="form-input"
                    />
                );
            case DataType.BOOLEAN:
                return (
                    <input
                        type="checkbox"
                        checked={item.data}
                        onChange={(e) => updateRow(index, 'data', e.target.checked)}
                        className="checkbox"
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
                        className="form-input"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid gap-4">
      {/* Collapsible Pattern Editor */}
            <div>
                <div className="form-input bg-node-yellow-light form-label flex justify-between items-center">
                    <span>Pattern</span>
                    <button onClick={togglePattern} className="btn-secondary">
                        {isPatternCollapsed ? <FaExpandAlt /> : <RiCollapseDiagonalLine size={25} />}
                    </button>
                </div>
                {!isPatternCollapsed && (
                    <div>
                        <div className='grid grid-cols-2'>
                            <p className='form-label'>Value</p>
                            <p className='form-label'>Delay (ticks)</p>
                        </div>
                        {node.pattern!.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                {renderDataInput(item, index)}
                                <input
                                    type="number"
                                    value={item.delayTicks}
                                    onChange={(e) => updateRow(index, 'delayTicks', Number(e.target.value))}
                                    placeholder="Delay (ms)"
                                    className="form-input"
                                />
                                <button
                                    onClick={() => removeRow(index)}
                                    className="btn-error"
                                    title="Remove row"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button onClick={addRow} className="btn-primary" title="Add row">
                            + Add a new Row
                        </button>
                    </div>
                )}
            </div>

            {/* Collapsible Time Settings */}
            <div>
                <div className="form-input bg-node-yellow-light form-label flex justify-between items-center">
                    <span>Time Settings</span>
                    <button onClick={toggleTimeSettings} className="btn-secondary">
                        {isTimeSettingsCollapsed ? <FaExpandAlt /> : <RiCollapseDiagonalLine size={25} />}
                    </button>
                </div>
                {!isTimeSettingsCollapsed && (
                    <div>
                        <div className="flex gap-4">
                            <div>
                                <label className="form-label">Start Tick</label>
                                <input
                                    type="number"
                                    value={node.startTick || 0}
                                    onChange={(e) =>
                                        flowStore.updateNodeTime(node.id, Number(e.target.value), node.endTick || 0)
                                    }
                                    className="form-input"
                                />
                            </div>
                            <div>
                                <label className="form-label">End Tick</label>
                                <input
                                    type="number"
                                    value={node.endTick || 0}
                                    onChange={(e) =>
                                        flowStore.updateNodeTime(node.id, node.startTick || 0, Number(e.target.value))
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                checked={node.repeat || false}
                                onChange={(e) => flowStore.updateNodeRepeat(node.id, e.target.checked)}
                                className="checkbox"
                            />
                            <label className="form-label">Repeat Pattern</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default DataProducerDetails;