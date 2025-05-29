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
    MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import type { DataTimeline } from '../items';
import StartHandleNode from './StartHandleNode';
import EndHandleNode from './EndHandleNode';
import PatternNode from './PatternNode';
import { PatternEditorProvider } from '../PatternEditorContext';

const PX_PER_TICK = 120;
const PATTERN_LANE_Y = 100;
const END_LANE_Y = 170;

interface DataTimelineProps {
    nodeId: string;
}

const nodeTypes: NodeTypes = {
    patternNode: PatternNode,
    startHandleNode: StartHandleNode,
    endHandleNode: EndHandleNode
};

const DataTimeline: React.FC<DataTimelineProps> = observer(({ nodeId }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [showAddPatternPopup, setShowAddPatternPopup] = useState(false);
    const [newPatternId, setNewPatternId] = useState<string>('');
    const [newPatternStartTick, setNewPatternStartTick] = useState<string>('');

    const node = flowStore.nodes.find(n => n.id === nodeId);
    const timeline = node?.timeline;

    const rebuildTimeline = useCallback(() => {
        if (!timeline) return;
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        timeline.patterns.forEach(({ pattern, startTick }) => {
            newNodes.push({
                id: `pattern-${pattern.id}`,
                type: 'patternNode',
                position: { x: startTick * PX_PER_TICK, y: PATTERN_LANE_Y },
                data: { tick: startTick, pattern: pattern },
                style: { width: (pattern.length) * 50, height: 30, backgroundColor: '#ddd' },
            });

            // Add start handle node
            newNodes.push({
                id: `start-handle-${pattern.id}`,
                type: 'startHandleNode',
                position: { x: timeline.startTick * PX_PER_TICK, y: END_LANE_Y },
                data: { tick: timeline.startTick },
                style: { width: 50, height: 30, backgroundColor: '#ddd' },
            });

            // Add end handle node
            newNodes.push({
                id: `end-handle-${pattern.id}`,
                type: 'endHandleNode',
                position: { x: (timeline.startTick + pattern.length) * PX_PER_TICK, y: END_LANE_Y },
                data: { tick: timeline.startTick + pattern.length },
                style: { width: 50, height: 30, backgroundColor: '#ddd' },
            });

            // Create edges between start, pattern, and end
            newEdges.push({
                id: `edge-start-${pattern.id}`,
                source: `start-handle-${pattern.id}`,
                target: `pattern-${pattern.id}`,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                }
            });

            newEdges.push({
                id: `edge-end-${pattern.id}`,
                source: `pattern-${pattern.id}`,
                target: `end-handle-${pattern.id}`,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                }
            });
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [timeline]);

    const handleAddPattern = () => {
        if (!timeline) return alert('Timeline is not defined');
        const startTick = parseInt(newPatternStartTick, 10);
        if (isNaN(startTick)) return alert('Invalid start tick');
        const pattern = flowStore.patterns.find(p => p.id === newPatternId);
        if (!pattern) return alert('Invalid pattern selection');

        const updatedTimeline: DataTimeline = {
            ...timeline,
            patterns: [...timeline.patterns, { pattern, startTick }],
            repeat: timeline.repeat || false,
            startTick: timeline.startTick || 0,
            endTick: timeline.endTick || 0
        };
        flowStore.updateDataTimeline(nodeId, updatedTimeline);
        setShowAddPatternPopup(false);
        setNewPatternId('');
        setNewPatternStartTick('');
    };

    useEffect(() => {
        rebuildTimeline();
    }, [timeline]);

    return (
        <PatternEditorProvider>
            <div style={{ width: '100%', height: 200 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    snapToGrid
                    snapGrid={[PX_PER_TICK, PX_PER_TICK]}
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} gap={PX_PER_TICK} size={1} style={{ stroke: '#ddd' }} />
                </ReactFlow>
                <button onClick={() => setShowAddPatternPopup(true)} style={{ fontSize: '24px', padding: '10px', borderRadius: '50%', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>+</button>
                {showAddPatternPopup && (
                    <div style={{ position: 'absolute', bottom: 60, right: 10, backgroundColor: '#fff', padding: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                        <div>
                            <label>Pattern:</label>
                            <select value={newPatternId} onChange={(e) => setNewPatternId(e.target.value)}>
                                <option value="">Select a pattern</option>
                                {flowStore.patterns.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Start Tick:</label>
                            <input type="text" value={newPatternStartTick} onChange={(e) => setNewPatternStartTick(e.target.value)} />
                        </div>
                        <button onClick={handleAddPattern} style={{ marginTop: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Add Pattern</button>
                        <button onClick={() => { setShowAddPatternPopup(false); setNewPatternId(''); setNewPatternStartTick(''); }} style={{ marginTop: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                )}
            </div>
        </PatternEditorProvider>
    );
});

export default DataTimeline; 