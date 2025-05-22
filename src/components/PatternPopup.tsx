import React, { useState } from 'react';
import './PatternPopup.css'; // Import the CSS file for styling
// import PatternEditor from './PatternEditor';

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
              {/* <PatternEditor /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternPopup;
