import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
interface PatternItemProps {
    id: string;
    data: {
        tick: number;
        value: any;
        onTickChange: (id: string, newTick: number) => void;
        onValueChange: (id: string, newValue: any) => void;
    };
}

const PatternItem: React.FC<PatternItemProps> = ({ id, data }) => {
    const { tick, value, onTickChange, onValueChange } = data;

    return (
        <div
            style={{
                position: 'absolute',
                width: 100,
                height: 60,
                backgroundColor: '#ddd',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '5px',
            }}
        >
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            <div>
                <label>Tick:</label>
                <input
                    type="number"
                    value={tick}
                    onChange={(e) => onTickChange(id, parseInt(e.target.value, 10))}
                    style={{ width: '40px', margin: '2px' }}
                />
            </div>
            <div>
                <label>Value:</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onValueChange(id, e.target.value)}
                    style={{ width: '40px', margin: '2px' }}
                />
            </div>
            <Handle type="target" position={Position.Right} style={{ background: '#555' }} />
        </div>
    );
};

export default PatternItem;
