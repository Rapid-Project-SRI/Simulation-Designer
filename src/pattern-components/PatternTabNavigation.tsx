import React from 'react';
import { flowStore } from '../FlowStore';
import { observer } from 'mobx-react-lite';
import './PatternTabNavigation.css';
import { DataType } from '../items';

interface PatternTabNavigationProps {
    activePatternId: string;
    setActivePatternId: (id: string) => void;
}

const PatternTabNavigation: React.FC<PatternTabNavigationProps> = observer(({ activePatternId, setActivePatternId }) => {
    const createNewPattern = () => {
        const newPattern = {
            id: `pattern-${Date.now()}`,
            name: 'New Pattern',
            length: 0,
            events: new Map(),
            description: '',
            dataType: DataType.NUMBER
        };
        flowStore.addPattern(newPattern);
        setActivePatternId(newPattern.id);
    };

    return (
        <div className="pattern-tab-navigation">
            <div className="tab-bar">
                {flowStore.patterns.map(pattern => (
                    <div
                        key={pattern.id}
                        className={`tab-button ${activePatternId === pattern.id ? 'active' : ''}`}
                        onClick={() => setActivePatternId(pattern.id)}
                    >
                        {pattern.name}
                    </div>
                ))}
                <button className="tab-button new-tab" onClick={createNewPattern}>New Pattern</button>
            </div>
        </div>
    );
});

export default PatternTabNavigation; 