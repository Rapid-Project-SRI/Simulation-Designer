import { XYPosition } from '@xyflow/react';
import { makeAutoObservable } from 'mobx';
import { PatternItem } from './node-components/DataProducerNode';
import VariableNode from './node-components/VariableNode';
import TransformerNode from './node-components/TransformerNode';
import DataProducerNode from './node-components/DataProducerNode';
import CombinerNode from './node-components/CombinerNode';
import { CombineMode } from './node-components/NodeTypes';
import EventNode from './node-components/EventNode';
import OutputNode from './node-components/OutputNode';

export type FlowNodeType =
    'variableNode' | 'transformerNode' | 'dataProducerNode' |
    'combinerNode' | 'eventNode' | 'outputNode';

export enum DataType {
    NUMBER = 'number',
    STRING = 'string',
    BOOLEAN = 'boolean',
    OBJECT = 'object'
}

export const nodeTypes = {
    variableNode: VariableNode,
    transformerNode: TransformerNode,
    dataProducerNode: DataProducerNode,
    combinerNode: CombinerNode,
    eventNode: EventNode,
    outputNode: OutputNode,
};

export interface FlowNode {
    id: string;
    type: FlowNodeType;
    label: string;
    position: XYPosition
    dataType: DataType;
    description: string;
    variableName?: string;
    selected?: boolean; // for selection

    //only for CalcNode
    expression?: string;

    //only for DataProd
    pattern?: PatternItem<number>[]; // the pattern is stored as an array of objects
    startTick?: number;
    endTick?: number;
    repeat?: boolean; // whether to repeat the pattern
    defaultVal?: any;

    //only for VariableNode
    initialValue?: any; // initial value for variable nodes

    //only for Combiner
    mode?: CombineMode;
}

export interface FlowEdge {
    source: string;
    target: string;
}

export class FlowStore {
    // Observable state
    nodes: FlowNode[] = [];
    edges: FlowEdge[] = [];
    selectedNodeIds: string[] = [];
    nextNodeId: number = 1;
    nextEdgeId: number = 1;

    // Copy, Paste, and Undo Utilities
    clipboard: { nodes: FlowNode[], edges: FlowEdge[] } = { nodes: [], edges: [] };
    history: { nodes: FlowNode[], edges: FlowEdge[] }[] = [];
    historyIndex: number = -1;


    constructor() {
        makeAutoObservable(this);
    }

    // Add a new node with a unique ID and default values
    addNode(node: FlowNode) {
        // Ensure description is initialized
        const nodeWithDescription = {
            ...node,
            description: node.description || '', // Set default empty description if not provided
            variableName: node.variableName || `output_${node.id}` // Set default output variable name
        };
        this.nodes.push(nodeWithDescription);
    }

    // Add a new node with a unique ID and default values
    deleteNode(id: string) {
        console.log(id);
        this.nodes = this.nodes.filter((n) => n.id !== id);
    }

    // Add an edge to the end of the edges array
    addEdge(edge: FlowEdge) {
        this.edges.push(edge);
    }

    // Delete an edge by its source and target IDs
    deleteEdge(sourceId: string, targetId: string) {
        this.edges = this.edges.filter((edge) => !(edge.source === sourceId && edge.target === targetId))
    }

    // Set selected nodes by their IDs
    setSelectedNodes(ids: string[]) {
        this.selectedNodeIds = ids;
        this.nodes.forEach(node => {
            node.selected = ids.includes(node.id);
        });;
    }

    // Generate a unique node ID
    generateNodeId(): string {
        return `node_${this.nextNodeId++}`;
    }

    // Generate a unique edge ID
    generateEdgeId() {
        return `edge_${this.nextEdgeId++}`;
    }

    // Update the calculation expression for transformer nodes
    updateCalcExpression(id: string, newExpr: string) {
        const node = this.nodes.find((n) => n.id === id);
        if (node?.type === 'transformerNode') {
            node.expression = newExpr;
        }
    }

    // Update the pattern for data producer nodes
    updateNodePattern(id: string, newPattern: PatternItem<any>[]) {
        const node = this.nodes.find((n) => n.id === id);
        if (node && node.type === 'dataProducerNode') {
            // Validate that all pattern items match the node's data type
            const isValid = newPattern.every(item => {
                switch (node.dataType) {
                    case DataType.NUMBER:
                        return typeof item.data === 'number';
                    case DataType.STRING:
                        return typeof item.data === 'string';
                    case DataType.BOOLEAN:
                        return typeof item.data === 'boolean';
                    case DataType.OBJECT:
                        return typeof item.data === 'object' && item.data !== null;
                    default:
                        return false;
                }
            });

            if (!isValid) {
                console.warn(`Invalid data type in pattern for node ${id}. Expected ${node.dataType}`);
                return;
            }

            node.pattern = newPattern;
        }
    }

    // Update the position of a node
    updateNodePosition(id: string, position: XYPosition) {
        const node = this.nodes.find((n) => n.id === id);
        if (node) {
            node.position = position;
        }
    }

    // Update the start and end ticks for data producer nodes
    updateNodeTime(id: string, startTick: number, endTick: number) {
        const node = this.nodes.find((n) => n.id === id);
        if (node) {
            node.startTick = startTick;
            node.endTick = endTick;
        }
    }

    // Update the repeat status for data producer nodes
    updateNodeRepeat(id: string, repeat: boolean) {
        const node = this.nodes.find((n) => n.id === id);
        if (node && node.type === 'dataProducerNode') {
            node.repeat = repeat;
        }
    }

    // Update the variable name for variable nodes
    updateNodeVariableName(id: string, name: string) {
        const node = this.nodes.find((n) => n.id === id);
        console.log("udpateNodeVarName")
        if (node) {
            node.variableName = name;
            console.log("node var name udpated and exists")
        }
    }

    // Update the initial value for variable nodes
    updateNodeInitialValue(id: string, value: any) {
        const node = this.nodes.find((n) => n.id === id);
        if (node && node.type === 'variableNode') {
            node.initialValue = value;
        }
    }

    // Update the label of a node
    updateNodeLabel(id: string, label: string) {
        const node = this.nodes.find((n) => n.id === id);
        if (node) {
            node.label = label;
        }
    }

    // Update the data type of a node
    updateNodeDataType(id: string, dataType: DataType) {
        const node = this.nodes.find((n) => n.id === id);
        if (node) {
            node.dataType = dataType;
            // If it's a data producer node, update the pattern data to match the new type
            if (node.type === 'dataProducerNode' && node.pattern) {
                // Import the function directly inside the method to avoid circular dependencies
                const { getDefaultValueForType } = require('./utils');
                const newPattern = node.pattern.map(item => ({
                    ...item,
                    data: getDefaultValueForType(dataType)
                }));
                this.updateNodePattern(id, newPattern);
            }
        }
    }

    // Update the combiner mode for combiner nodes
    updateCombinerMode(id: string, mode: 'merge' | 'zip' | 'combineLatest') {
        const node = this.nodes.find((n) => n.id === id);
        console.log(id, "changed to", mode)
        if (node) {
            node.mode = mode;
        }
    }

    // Update the description of a node
    updateNodeDescription(id: string, description: string) {
        const node = this.nodes.find((n) => n.id === id);
        if (node) {
            node.description = description;
        }
    }

    // Update the default value for data producer nodes
    updateNodeDefaultValue(id: string, defaultValue: any) {
        const node = this.nodes.find((n) => n.id === id);
        if (node && node.type === 'dataProducerNode') {
            node.defaultVal = defaultValue;
        }
    }

    // Updated: only return input or variable node IDs that are connected via edges to the calc node.
    getCalcInputIds(calcId: string): string[] {
        return this.edges
            .filter(edge => edge.target === calcId)
            .map(edge => edge.source)
            .filter(sourceId => {
                const node = this.nodes.find(n => n.id === sourceId);
                return node;
                // return node && (node.type === 'inputNode' || node.type === 'variableNode');
            });
    }

    // Serialize the store to a JSON string
    serialize() {
        return JSON.stringify({ nodes: this.nodes, edges: this.edges });
    }

    // Hydrate the store from a JSON string
    hydrate(json: string) {
        const data = JSON.parse(json);
        this.nodes = data.nodes || [];
        this.edges = data.edges || [];

        // Recalculate the next node ID to avoid collisions
        const ids = this.nodes.map(n => parseInt(n.id.split('_')[1])).filter(n => !isNaN(n));
        const maxId = ids.length ? Math.max(...ids) : 0;
        this.nextNodeId = maxId + 1;
    }

    // Get the next transformer index based on existing transformer nodes
    getTransformerIndex(): number {
        const transformerNodes = this.nodes.filter(n => n.type === 'transformerNode');
        return transformerNodes.length + 1;
    }

    // Get the next data producer index based on existing data producer nodes
    getDataProducerIndex(): number {
        const dataProdNodes = this.nodes.filter(n => n.type === 'dataProducerNode');
        return dataProdNodes.length + 1;
    }

    // Get the next combiner index based on existing combiner nodes
    getCombinerIndex(): number {
        const combinerNodes = this.nodes.filter(n => n.type === 'combinerNode');
        return combinerNodes.length + 1;
    }

    // Get the next variable index based on existing variable nodes
    getVariableIndex(): number {
        const variableNodes = this.nodes.filter(n => n.type === 'variableNode');
        return variableNodes.length + 1;
    }

    // Copy the selected nodes and edges to the clipboard
    copySelectedNodes() {
        const selectedNodes = this.nodes.filter(node => node.selected);
        const selectedNodeIds = selectedNodes.map(node => node.id);

        const selectedEdges = this.edges.filter(edge =>
            selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)
        );

        this.clipboard = {
            nodes: selectedNodes.map(node => ({ ...node })), // Keep original ID
            edges: selectedEdges.map(edge => ({ ...edge })), // Keep original source/target
        };

        console.log("Clipboard after copying:", this.clipboard); // Debug log 
    }

    // Paste the copied nodes and edges into the flow
    pasteClipboard() {
        if (!this.clipboard || this.clipboard.nodes.length === 0) return;

        const nodeIdMap = new Map<string, string>();

        const newNodes: FlowNode[] = this.clipboard.nodes.map(original => {
            const newId = this.generateNodeId();
            nodeIdMap.set(original.id, newId);

            return {
                ...original,
                id: newId,
                label: `${original.label}_copy`,
                variableName: original.variableName ? `${original.variableName}_copy` : undefined,
                position: {
                    x: original.position.x + 40,
                    y: original.position.y + 40,
                }
            };
        });

        const newEdges: FlowEdge[] = this.clipboard.edges.map(original => {
            const newSource = nodeIdMap.get(original.source);
            const newTarget = nodeIdMap.get(original.target);

            if (newSource && newTarget) {
                return {
                    ...original,
                    id: `e${this.generateEdgeId()}`,
                    source: newSource,
                    target: newTarget,
                };
            }
            return null;
        }).filter(Boolean) as FlowEdge[];

        newNodes.forEach(n => this.addNode(n));
        newEdges.forEach(e => this.addEdge(e));
        this.setSelectedNodes(newNodes.map(n => n.id));
        this.saveHistory();
    }

    deleteSelectedNodes() {
        const ids = new Set(this.selectedNodeIds);
        this.nodes = this.nodes.filter(n => !ids.has(n.id));
        this.edges = this.edges.filter(e => !ids.has(e.source) && !ids.has(e.target));
        this.setSelectedNodes([]);
        this.saveHistory();
    }


    saveHistory() {
        const snapshot = {
            nodes: JSON.parse(JSON.stringify(this.nodes)),
            edges: JSON.parse(JSON.stringify(this.edges))
        };
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(snapshot);
        this.historyIndex++;
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const snapshot = this.history[this.historyIndex];
            this.nodes = snapshot.nodes;
            this.edges = snapshot.edges;
            this.setSelectedNodes([]);
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const snapshot = this.history[this.historyIndex];
            this.nodes = snapshot.nodes;
            this.edges = snapshot.edges;
            this.setSelectedNodes([]);
        }
    }


}

export const flowStore = new FlowStore();
