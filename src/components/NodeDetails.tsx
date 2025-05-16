import React from 'react';
import { observer } from 'mobx-react-lite';
import { flowStore, FlowNodeType, FlowNode, DataType } from '../FlowStore';
import TransformerDetails from '../node-components/TransformerDetails';
import { NodeDetailProps } from '../node-components/NodeTypes';
import VariableDetails from '../node-components/VariableDetails';
import DataProducerDetails from '../node-components/DataProducerDetails';
import CombinerDetails from '../node-components/CombinerDetails';
import EventDetails from '../node-components/EventDetails'
import OutputDetails from '../node-components/OutputDetails';
import BranchDetails from '../node-components/BranchDetails'
import { Box, Typography, TextField, Select, MenuItem, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const nodeMap: Record<FlowNodeType, [React.FC<NodeDetailProps>, string]> = {
    transformerNode: [TransformerDetails, "Transformer Node"],
    variableNode: [VariableDetails, "Variable Node"],
    dataProducerNode: [DataProducerDetails, "Data Producer Node"],
    combinerNode: [CombinerDetails, "Combiner Node"],
    eventNode: [EventDetails, "Event Node"],
    outputNode: [OutputDetails, "Output Node"],
    branchNode: [BranchDetails, "Branch Node"]
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    title: {
        marginBottom: '16px',
    },
    section: {
        marginBottom: '16px',
    },
    scrollableContent: {
        flex: 1,
        overflowY: 'auto',
    },
    deleteButton: {
        marginTop: '16px',
    },
    input: {
        width: '100%',
        marginBottom: '8px',
    },
    select: {
        width: '100%',
        marginBottom: '8px',
    },
});

const NodeDetails = observer(() => {
    const classes = useStyles();
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
            <Box className={classes.section}>
                <Typography variant="subtitle1">Output Variable Name</Typography>
                <TextField
                    value={node.outputVariableName || ''}
                    onChange={(e) => flowStore.updateNodeOutputVariableName(node.id, e.target.value)}
                    fullWidth
                    margin="normal"
                    placeholder="Enter output variable name..."
                />
            </Box>
        );
    };

    const renderInitialValueInput = () => {
        if (node.type !== 'variableNode') return null;

        switch (node.dataType) {
            case DataType.NUMBER:
                return (
                    <TextField
                        type="number"
                        label="Initial Value"
                        value={node.initialValue || 0}
                        onChange={(e) => flowStore.updateNodeInitialValue(node.id, Number(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                );
            case DataType.STRING:
                return (
                    <TextField
                        type="text"
                        label="Initial Value"
                        value={node.initialValue || ''}
                        onChange={(e) => flowStore.updateNodeInitialValue(node.id, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                );
            case DataType.BOOLEAN:
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                        <Typography sx={{ mr: 2 }}>Initial Value:</Typography>
                        <input
                            type="checkbox"
                            checked={node.initialValue || false}
                            onChange={(e) => flowStore.updateNodeInitialValue(node.id, e.target.checked)}
                        />
                    </Box>
                );
            case DataType.OBJECT:
                return (
                    <TextField
                        type="text"
                        label="Initial Value (JSON)"
                        value={JSON.stringify(node.initialValue || {})}
                        onChange={(e) => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                flowStore.updateNodeInitialValue(node.id, parsed);
                            } catch (err) {
                                // Invalid JSON, ignore
                            }
                        }}
                        fullWidth
                        margin="normal"
                        error={!isValidJSON(node.initialValue)}
                        helperText={!isValidJSON(node.initialValue) ? "Invalid JSON" : ""}
                    />
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

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                {nodeMap[node.type][1]}
            </Typography>
            <Box className={classes.scrollableContent}>
                <Box className={classes.section}>
                    <Typography variant="subtitle1">Label</Typography>
                    <TextField
                        value={node.label}
                        onChange={(e) => flowStore.updateNodeLabel(node.id, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </Box>

                <Box className={classes.section}>
                    <Typography variant="subtitle1">Description</Typography>
                    <TextField
                        value={node.description || ''}
                        onChange={(e) => flowStore.updateNodeDescription(node.id, e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        placeholder="Enter node description..."
                    />
                </Box>

                {showDataType && (
                    <Box className={classes.section}>
                        <Typography variant="subtitle1">Data Type</Typography>
                        <Select
                            value={node.dataType}
                            onChange={(e) => flowStore.updateNodeDataType(node.id, e.target.value as DataType)}
                            fullWidth
                            margin="dense"
                        >
                            {Object.values(DataType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                )}

                {renderOutputVariableField()}
                {renderInitialValueInput()}

                {/* Node-specific details */}
                <Box className={classes.section}>
                    {DetailComponent && <DetailComponent node={node} />}
                </Box>

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    className={classes.deleteButton}
                >
                    Delete Node
                </Button>
            </Box>
        </Box>
    );
});

export default NodeDetails;

