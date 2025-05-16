import React, { useEffect, useCallback, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
    ReactFlow,
    MiniMap,
    Background,
    useNodesState,
    useEdgesState,
    Connection,
    Node,
    Edge,
    useReactFlow,
    XYPosition,
    addEdge,
    reconnectEdge,
    NodeTypes,
    EdgeTypes,
    BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { flowStore, nodeTypes, DataType } from '../FlowStore';
import { getDefaultValueForType } from '../utils';

const defaultExpression = "output = input_1 + input_2 - 100";

const FlowCanvas = observer(() => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
    const reactFlowInstance = useReactFlow();
    const canvasRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [hasFocus, setHasFocus] = useState(false);
    const edgeReconnectSuccessful = useRef(true);

    const rebuildReactFlowState = () => {
        setNodes(
            flowStore.nodes.map((node) => ({
                id: node.id,
                type: node.type,
                data: { nodeId: node.id },
                position: node.position,
            }))
        );
        setEdges(
            flowStore.edges.map((e, i) => ({
                id: `e${i}`,
                source: e.source,
                target: e.target
            }))
        );
    };

    useEffect(() => {
        rebuildReactFlowState();
    }, [flowStore.nodes.length, flowStore.edges.length]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleFocus = () => setHasFocus(true);
        const handleBlur = () => setHasFocus(false);

        canvas.addEventListener('focus', handleFocus);
        canvas.addEventListener('blur', handleBlur);

        return () => {
            canvas.removeEventListener('focus', handleFocus);
            canvas.removeEventListener('blur', handleBlur);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!hasFocus) return;

        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            flowStore.copySelectedNodes();
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            e.preventDefault();
            flowStore.pasteClipboard();
            rebuildReactFlowState();
        }

        if (e.key === 'Backspace') {
            e.preventDefault();
            flowStore.deleteSelectedNodes();
            rebuildReactFlowState();
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
                flowStore.redo();
            } else {
                flowStore.undo();
            }
            rebuildReactFlowState();
        }
    };

    const uploadJson = () => {
        fileInputRef.current?.click();
    };

    const onJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = event.target?.result as string;
                flowStore.hydrate(json);
                rebuildReactFlowState();
            } catch (err) {
                console.error("Failed to load JSON:", err);
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    };

    const downloadJson = () => {
        const json = flowStore.serialize();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'flow.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const nodeType = e.dataTransfer.getData('application/reactflow');
        if (!nodeType) return;

        const bounds = (e.target as HTMLDivElement).getBoundingClientRect();

        const position = reactFlowInstance.screenToFlowPosition({
            x: e.clientX - bounds.left - 50,
            y: e.clientY - bounds.top - 20,
        });

        // Set default data type to NUMBER for all nodes
        const defaultDataType = DataType.NUMBER;

        switch (nodeType) {
            case 'variableNode':
                addVariableNode(position, defaultDataType);
                break;
            case 'transformerNode':
                addTransformerNode(position, defaultDataType);
                break;
            case 'dataProducerNode':
                addDataProducerNode(position, defaultDataType);
                break;
            case 'combinerNode':
                addCombinerNode(position, defaultDataType);
                break;
            case 'eventNode':
                addEventNode(position, defaultDataType);
                break;
            case 'outputNode':
                addOutputNode(position, defaultDataType);
                break;
            case 'branchNode':
                addBranchNode(position, defaultDataType);
                break;
        }
        flowStore.saveHistory();
    };

    const onConnect = useCallback((connection: Connection) => {
        flowStore.addEdge({ source: connection.source!, target: connection.target! });
        flowStore.saveHistory();
    }, []);

    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    const onReconnect = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, []);

    const onReconnectEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeReconnectSuccessful.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
            // Also remove from flowStore
            const source = edge.source;
            const target = edge.target;
            flowStore.deleteEdge(source, target);
            flowStore.saveHistory();
        }
        edgeReconnectSuccessful.current = true;
    }, []);

    const onNodeDragStop = (e: React.MouseEvent, node: Node) => {
        flowStore.updateNodePosition(node.id, node.position);
        flowStore.saveHistory();
    };

    const addVariableNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        const variableName = `var_${id}`;
        flowStore.addNode({
            id,
            type: 'variableNode',
            label: variableName,
            variableName,
            position,
            dataType,
            initialValue: getDefaultValueForType(dataType),
            description: ''
        });
    };

    const addTransformerNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        flowStore.addNode({
            id,
            type: 'transformerNode',
            label: `Transformer ${flowStore.getTransformerIndex()}`,
            position,
            dataType,
            expression: defaultExpression,
            description: '',
            outputVariableName: `transformer_${id}`
        });
    };

    const addDataProducerNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        flowStore.addNode({
            id,
            type: 'dataProducerNode',
            label: `Data Producer ${flowStore.getDataProducerIndex()}`,
            position,
            dataType,
            pattern: [],
            startTick: 0,
            endTick: 100,
            repeat: false,
            description: '',
            outputVariableName: `producer_${id}`
        });
    };

    const addCombinerNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        flowStore.addNode({
            id,
            type: 'combinerNode',
            label: `Combiner ${flowStore.getCombinerIndex()}`,
            position,
            dataType,
            mode: 'merge',
            description: '',
            outputVariableName: `output_${id}`
        });
    };

    const addEventNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        flowStore.addNode({
            id,
            type: 'eventNode',
            label: `Event ${id}`,
            position,
            dataType,
            description: ''
        });
    };

    const addOutputNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        flowStore.addNode({
            id,
            type: 'outputNode',
            label: `Output ${id}`,
            position,
            dataType,
            description: '',
            outputVariableName: `output_${id}`
        });
    };

    const addBranchNode = (position: XYPosition, dataType: DataType) => {
        const id = flowStore.generateNodeId();
        const variableName = `branch_${id}`;
        flowStore.addNode({ id, type: 'branchNode', label: variableName, variableName, position, dataType });
    };

    return (
        <div
            ref={canvasRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={() => canvasRef.current?.focus()}
            style={{ width: '100%', height: '100vh', outline: 'none' }}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <div style={{ padding: 10 }}>
                <button onClick={downloadJson}>Download JSON</button>
                <button onClick={uploadJson} style={{ marginLeft: 8 }}>Upload JSON</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={onJsonFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeDragStop={onNodeDragStop}
                nodeTypes={nodeTypes as NodeTypes}
                selectNodesOnDrag={true}
                elementsSelectable
                onSelectionChange={({ nodes }) => {
                    flowStore.setSelectedNodes(nodes.map(n => n.id));
                }}
                onReconnect={onReconnect}
                onReconnectStart={onReconnectStart}
                onReconnectEnd={onReconnectEnd}
                fitView
                panOnScroll={false}
                proOptions={{ hideAttribution: true }}
                defaultEdgeOptions={{
                    animated: true
                }}
                connectionRadius={30}
                colorMode="light"
            >
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
});

export default FlowCanvas;
