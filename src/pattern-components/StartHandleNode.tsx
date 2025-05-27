import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface StartHandleNodeProps {
    id: string;
    data: {
        tick: number;
        onClick: (rect: DOMRect) => void;
    };
}

const StartHandleNode: React.FC<StartHandleNodeProps> = ({ id, data }) => {
    const { tick, onClick } = data;

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onClick(rect);
    }

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
            onClick={handleClick}
        >
            <div>
                <label>Start Tick: {tick}</label>
            </div>
        </div>
    );
};

export default StartHandleNode;
