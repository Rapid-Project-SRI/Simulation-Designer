import React, { useState } from 'react';
import './PatternPopup.css'; // Import the CSS file for styling
import PatternContent from './PatternContent';
import DataTimeline from './DataTimeline';

interface PatternPopupProps {
  nodeId: string;
}

const PatternPopup: React.FC<PatternPopupProps> = ({ nodeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'patternEditor' | 'dataTimeline' | null>(null);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const showPatternContent = () => setView('patternEditor');
  const showDataTimeline = () => setView('dataTimeline');

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      {isOpen && (
        <div className="overlay">
          <div className="popup">
            <button className="close" onClick={closePopup}>X</button>
            <div className="content">
              <h2>Pattern Popup</h2>
              <p>This is a popup window for node {nodeId}.</p>
              <button onClick={showPatternContent}>Show Pattern Content</button>
              <button onClick={showDataTimeline}>Show Data Timeline</button>
              {view === 'patternEditor' && <PatternContent />}
              {view === 'dataTimeline' && <DataTimeline nodeId={nodeId}/>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternPopup;
