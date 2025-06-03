// components/SideBar.tsx
import React from 'react';

function SideBar() {
  // When dragging starts, store the node type in the dataTransfer object.
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='sidebar-container'>
      <h1 className='bg-blue'>Library</h1>

      {/* Blue Node */}
      <div onDragStart={(event) => onDragStart(event, 'variableNode')} draggable
        className="sidebar-node-container bg-node-blue-light border-node-blue-dark">
        <h3 className="node-letter text-node-blue-dark">X</h3>
        <div>
          <h3 className="node-label text-node-blue-dark">Variable Node</h3>
        </div>
      </div>

      {/* Green Node */}
      <div onDragStart={(event) => onDragStart(event, 'transformerNode')} draggable
        className="sidebar-node-container bg-node-green-light border-node-green-dark">
        <h3 className="node-letter text-node-green-dark">T</h3>
        <div>
          <h3 className="node-label text-node-green-dark">Transformer Node</h3>
        </div>
      </div>

      {/* Yellow Node */}
      <div onDragStart={(event) => onDragStart(event, 'dataProducerNode')} draggable
        className="sidebar-node-container bg-node-yellow-light border-node-yellow-dark">
        <h3 className="node-letter text-node-yellow-dark">D</h3>
        <div>
          <h3 className="node-label text-node-yellow-dark">Data Producer Node</h3>
        </div>
      </div>

      {/* Orange Node */}
      <div onDragStart={(event) => onDragStart(event, 'combinerNode')} draggable
        className="sidebar-node-container bg-node-orange-light border-node-orange-dark">
        <h3 className="node-letter text-node-orange-dark">C</h3>
        <div>
          <h3 className="node-label text-node-orange-dark ">Combiner Node</h3>
        </div>
      </div>

      {/* Purple Node */}
      <div onDragStart={(event) => onDragStart(event, 'eventNode')} draggable
        className="sidebar-node-container bg-node-purple-light border-node-purple-dark">
        <h3 className="node-letter text-node-purple-dark">E</h3>
        <div>
          <h3 className="node-label text-node-purple-dark">Event Node</h3>
        </div>
      </div>

      {/* Gray Node */}
      <div onDragStart={(event) => onDragStart(event, 'outputNode')} draggable 
        className="sidebar-node-container bg-node-gray-light border-node-gray-dark">
        <h3 className="node-letter text-node-gray-dark">O</h3>
        <div>
          <h3 className="node-label text-node-gray-dark">Output Node</h3>
        </div>
      </div>
    </div>
  );
}

export default SideBar;