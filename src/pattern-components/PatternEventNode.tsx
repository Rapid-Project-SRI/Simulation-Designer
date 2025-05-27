import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
interface PatternItemProps {
    id: string;
    data: {
        tick: number;
        value: any;
        onClick: (curTick: number, curValue: string, rect: DOMRect) => void;
    };
}

const PatternItem: React.FC<PatternItemProps> = ({ id, data }) => {
    const { tick, value, onClick } = data;

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onClick(tick, value, rect);
    }

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
            onClick={handleClick}
        >
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            <div>
                <label>Tick: {tick}</label>
            </div>
            <div>
                <label>Value: {value}</label>
            </div>
            <Handle type="target" position={Position.Right} style={{ background: '#555' }} />
        </div>
    );
};

export default PatternItem;
