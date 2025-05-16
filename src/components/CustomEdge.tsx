import React from 'react';
import { BaseEdge, getBezierPath, useReactFlow } from 'reactflow';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
    const { deleteElements } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const handleDelete = async () => {
        await deleteElements({ edges: [{ id }] });
    };

    return (
        <>
            <BaseEdge path={edgePath} />
            <foreignObject
                width={40}
                height={40}
                x={labelX - 20}
                y={labelY - 20}
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    <button
                        onClick={handleDelete}
                        style={{
                            cursor: 'pointer',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            fontSize: '16px',
                            color: '#666',
                            opacity: 0,
                            transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '0'}
                    >
                        ×
                    </button>
                </div>
            </foreignObject>
        </>
    );
};

export default CustomEdge; 