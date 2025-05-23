import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import PatternTabNavigation from './PatternTabNavigation';
import PatternEditor from './PatternEditor';
import { flowStore } from '../FlowStore';

const PatternContent: React.FC = observer(() => {
    const [activePatternId, setActivePatternId] = useState<string | null>(null);

    const handleSetActivePatternId = (id: string) => {
        setActivePatternId(id);
        flowStore.setSelectedPattern(id);
    };

    return (
        <div className="pattern-content">
            <PatternTabNavigation activePatternId={activePatternId || ''} setActivePatternId={handleSetActivePatternId} />
            {activePatternId && <PatternEditor patternId={activePatternId}/>}
        </div>
    );
});

export default PatternContent; 