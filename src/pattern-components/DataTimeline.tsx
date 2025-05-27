import React, { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    Background,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const PX_PER_TICK = 20;

interface Pattern {
    id: string;
    name: string;
    startTick: number;
    endTick: number;
}

interface DataTimelineProps {
    patterns: Pattern[];
    onPatternsChange: (newPatterns: Pattern[]) => void;
}

export function DataTimeline({ patterns, onPatternsChange }: DataTimelineProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const rebuildTimeline = useCallback(() => {
        const newNodes: Node[] = [];

        patterns.forEach((pattern) => {
            newNodes.push({
                id: `pattern-${pattern.id}`,
                position: { x: pattern.startTick * PX_PER_TICK, y: 0 },
                data: { label: `${pattern.name} (${pattern.startTick}-${pattern.endTick})` },
                style: { width: (pattern.endTick - pattern.startTick) * PX_PER_TICK, height: 30, backgroundColor: '#ddd' },
            });
        });

        setNodes(newNodes);
        setEdges([]); // No edges needed for timeline
    }, [patterns]);

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        const patternId = node.id.split('-')[1];
        const pattern = patterns.find(p => p.id === patternId);
        if (!pattern) return;

        const newStartTick = parseInt(prompt(`Edit start tick for pattern ${pattern.name}:`, pattern.startTick.toString()) || pattern.startTick.toString(), 10);
        const newEndTick = parseInt(prompt(`Edit end tick for pattern ${pattern.name}:`, pattern.endTick.toString()) || pattern.endTick.toString(), 10);

        if (newStartTick !== pattern.startTick || newEndTick !== pattern.endTick) {
            const updatedPatterns = patterns.map(p =>
                p.id === patternId ? { ...p, startTick: newStartTick, endTick: newEndTick } : p
            );
            onPatternsChange(updatedPatterns);
        }
    }, [patterns, onPatternsChange]);

    useEffect(() => {
        rebuildTimeline();
    }, [patterns]);

    return (
        <div style={{ width: '100%', height: 200 }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                snapToGrid
                snapGrid={[PX_PER_TICK, PX_PER_TICK]}
                fitView
            >
                <Background variant={BackgroundVariant.Dots} gap={PX_PER_TICK} size={1} style={{ stroke: '#ddd' }} />
            </ReactFlow>
        </div>
    );
}

export default DataTimeline; 