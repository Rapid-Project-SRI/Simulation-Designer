import React, { useState } from 'react';
import './PatternPopup.css'; // Import the CSS file for styling
import PatternContent from './PatternContent';

// Mock pattern data
const mockPattern = {
    id: 'test-pattern',
    name: 'Test Pattern',
    length: 10,
    events: new Map<number, unknown>([[1, 'A'], [3, 'B'], [5, 'C']]),
};

// Mock onPatternChange function
const handlePatternChange = (newPattern: typeof mockPattern) => {
    console.log('Pattern changed:', newPattern);
};

const PatternPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      {isOpen && (
        <div className="overlay">
          <div className="popup">
            <button className="close" onClick={closePopup}>X</button>
            <div className="content">
              <h2>Pattern Popup</h2>
              <p>This is a popup window.</p>
              <PatternContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternPopup;
