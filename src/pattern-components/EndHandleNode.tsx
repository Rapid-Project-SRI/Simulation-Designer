import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface EndHandleNodeProps {
    id: string;
    data: {
        tick: number;
    };
}

const EndHandleNode: React.FC<EndHandleNodeProps> = ({ id, data }) => {
    const { tick } = data;

    return (
        <div
            style={{
                position: 'absolute',
                width: 100,
                height: 60,
                backgroundColor: '#f00',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '5px',
                zIndex: 10
            }}
        >
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            <div>
                <label>End Tick: {tick}</label>
            </div>
        </div>
    );
};

export default EndHandleNode;
