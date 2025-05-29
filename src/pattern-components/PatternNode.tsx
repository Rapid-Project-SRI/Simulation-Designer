import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Pattern } from '../items';
interface PatternNodeProps {
    id: string;
    data: {
        tick: number;
        pattern: Pattern<any>;
        onClick: (curTick: number, curPattern: Pattern<any>, rect: DOMRect) => void;
    };
}

const PatternNode: React.FC<PatternNodeProps> = ({ id, data }) => {
    const { tick, pattern, onClick } = data;

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onClick(tick, pattern, rect);
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
            <Handle type="source" position={Position.Right} id="source" style={{ background: '#555' }} />
            <Handle type="target" position={Position.Left} id="target" style={{ background: '#555' }} />
            <div>
                <label>Tick: {tick}</label>
            </div>
            <div>
                <label>Pattern: {pattern.name}</label>
            </div>
        </div>
    );
};

export default PatternNode;
