import React, { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    Background,
    BackgroundVariant,
    NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { observer } from 'mobx-react-lite';
import { PatternEditorProvider } from '../PatternEditorContext';
import { flowStore } from '../FlowStore';
import { Pattern, DataType } from '../items';
import PatternItem from './PatternItem';

const PX_PER_TICK = 120;
const LANE_Y = 100;

interface PatternEditorProps {
    patternId: string;
}

const nodeTypes: NodeTypes = {
    patternItem: PatternItem,
};

// PatternEditor<T>
// A React Flow–based editor for editing a Pattern<T>
const PatternEditor: React.FC<PatternEditorProps> = observer(({ patternId }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const currentPattern: Pattern<any> = flowStore.patterns.find(p => p.id === patternId)!;
    const [showPopup, setShowPopup] = useState(false);
    const [newEventData, setNewEventData] = useState('');
    const [newEventTick, setNewEventTick] = useState('');

    const rebuildGraph = useCallback(() => {
        if (!currentPattern) return;
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        // Create nodes for each event
        Array.from(currentPattern.events.entries()).forEach(([tick, value], index) => {
            newNodes.push({
                id: `event-${currentPattern.id}-${tick}`,
                type: 'patternItem',
                position: { x: tick * PX_PER_TICK, y: LANE_Y },
                data: {
                    tick,
                    value,
                    onTickChange: handleTickChange,
                    onValueChange: handleValueChange,
                },
                style: { width: 50, height: 30, backgroundColor: '#ddd' },
            });
        });

        // Sort nodes by tick
        newNodes.sort((a, b) => (a.data as { tick: number }).tick - (b.data as { tick: number }).tick);

        // Create edges between consecutive events
        newNodes.forEach((node, index) => {
            if (index > 0) {
                const prevNode = newNodes[index - 1];
                newEdges.push({
                    id: `edge-${currentPattern.id}-${prevNode.data.tick}-${node.data.tick}`,
                    source: prevNode.id,
                    target: node.id,
                });
            }
        });

        // Add end-handle node
        newNodes.push({
            id: `end-handle-${currentPattern.id}`,
            position: { x: currentPattern.length * PX_PER_TICK, y: LANE_Y },
            data: { 
                tick: 13,
                value: "End",
                onTickChange: handleTickChange,
                onValueChange: handleValueChange,
            },
            style: { width: 50, height: 30, backgroundColor: '#f00' },
        });

        // Add edge from last event to end-handle
        if (currentPattern.events.size > 0) {
            const lastTick = Array.from(currentPattern.events.keys()).pop();
            newEdges.push({
                id: `edge-${currentPattern.id}-${lastTick}-end-handle`,
                source: `event-${currentPattern.id}-${lastTick}`,
                target: `end-handle-${currentPattern.id}`,
            });
        }

        setNodes(newNodes);
        setEdges(newEdges);
    }, [currentPattern]);

    const handleDataTypeChange = (newType: string) => {
        if (!currentPattern) return;
        // Update the pattern's events to match the new data type
        const updatedEvents = new Map<number, any>();
        currentPattern.events.forEach((value, tick) => {
            let newValue;
            switch (newType) {
                case 'number':
                    newValue = Number(value) || 0;
                    break;
                case 'string':
                    newValue = String(value);
                    break;
                case 'boolean':
                    newValue = Boolean(value);
                    break;
                case 'object':
                    newValue = typeof value === 'object' ? value : {};
                    break;
                default:
                    newValue = value;
            }
            updatedEvents.set(tick, newValue);
        });
        flowStore.updatePattern({ ...currentPattern, dataType: newType as DataType, events: updatedEvents });
    };

    const handleAddEvent = () => {
        if (!currentPattern) return;
        const tick = parseInt(newEventTick, 10);
        if (isNaN(tick)) return alert('Invalid tick value');
        let value;
        switch (currentPattern.dataType) {
            case DataType.NUMBER:
                value = Number(newEventData);
                if (isNaN(value)) return alert('Invalid number');
                break;
            case DataType.STRING:
                value = newEventData;
                break;
            case DataType.BOOLEAN:
                value = newEventData.toLowerCase() === 'true';
                break;
            case DataType.OBJECT:
                try {
                    value = JSON.parse(newEventData);
                } catch {
                    return alert('Invalid JSON object');
                }
                break;
            default:
                return;
        }
        const updatedEvents = new Map(currentPattern.events);
        updatedEvents.set(tick, value);
        flowStore.updatePattern({ ...currentPattern, events: updatedEvents });
        setShowPopup(false);
        setNewEventData('');
        setNewEventTick('');
    };

    const handleTickChange = (id: string, newTick: number) => {
        if (!currentPattern) return;
        const [_, patternId, tickStr] = id.split('-');
        const oldTick = parseInt(tickStr, 10);
        const updatedEvents = new Map(currentPattern.events);
        const value = updatedEvents.get(oldTick);
        updatedEvents.delete(oldTick);
        updatedEvents.set(newTick, value);
        flowStore.updatePattern({ ...currentPattern, events: updatedEvents });
    };

    const handleValueChange = (id: string, newValue: any) => {
        if (!currentPattern) return;
        const [_, patternId, tickStr] = id.split('-');
        const tick = parseInt(tickStr, 10);
        const updatedEvents = new Map(currentPattern.events);
        updatedEvents.set(tick, newValue);
        flowStore.updatePattern({ ...currentPattern, events: updatedEvents });
    };

    useEffect(() => {
        rebuildGraph();
    }, [currentPattern]);

    return (
        <PatternEditorProvider>
            <div style={{ width: '100%', height: 400 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    snapToGrid
                    nodesDraggable={false}
                    snapGrid={[PX_PER_TICK, PX_PER_TICK]}
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} gap={PX_PER_TICK} size={1} style={{ stroke: '#ddd' }} />
                </ReactFlow>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={currentPattern?.name || ''}
                            onChange={(e) => flowStore.updatePattern({ ...currentPattern!, name: e.target.value })}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Description:
                        <textarea
                            value={currentPattern?.description || ''}
                            onChange={(e) => flowStore.updatePattern({ ...currentPattern!, description: e.target.value })}
                            style={{ marginLeft: '10px', width: '100%' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Data Type:
                        <select
                            value={currentPattern?.dataType || ''}
                            onChange={(e) => handleDataTypeChange(e.target.value)}
                            style={{ marginLeft: '10px' }}
                        >
                            {Object.values(DataType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <button onClick={() => setShowPopup(true)} style={{ fontSize: '24px', padding: '10px', borderRadius: '50%', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>+</button>
            </div>
            {showPopup && (
                <div style={{ position: 'absolute', bottom: 60, right: 10, backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                    <div>
                        <label>Data:</label>
                        <input type="text" value={newEventData} onChange={(e) => setNewEventData(e.target.value)} />
                    </div>
                    <div>
                        <label>Tick:</label>
                        <input type="text" value={newEventTick} onChange={(e) => setNewEventTick(e.target.value)} />
                    </div>
                    <button onClick={handleAddEvent} style={{ marginTop: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Add Event</button>
                    <button onClick={() => setShowPopup(false)} style={{ marginTop: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
                </div>
            )}
        </PatternEditorProvider>
    );
});

export default PatternEditor;
