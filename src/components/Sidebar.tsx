// components/SideBar.tsx
import React from 'react';

function SideBar() {
  // When dragging starts, store the node type in the dataTransfer object.
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    // <aside style={{ padding: 10, background: '#f7f7f7', height: '100%', borderRight: '1px solid #ddd' }}>
    <div className='p-2 flex flex-col min-w-full bg-bg-primary gap-4'>
      <h1 className='bg-blue'>Library</h1>

      {/* Blue Node */}
      <div onDragStart={(event) => onDragStart(event, 'variableNode')} draggable
        className="flex p-4 min-w-full bg-node-blue-light rounded-app border-1 border-node-blue-dark">
        <h3 className="node-letter text-node-blue-dark font-bold text-3xl mr-4">X</h3>
        <div>
          <h3 className="text-node-blue-dark font-semibold text-lg">Variable Node</h3>
          {/* <p className="text-node-blue-dark text-sm">Description</p> */}
        </div>
      </div>

      {/* Green Node */}
      <div onDragStart={(event) => onDragStart(event, 'transformerNode')} draggable
        className="flex p-4 bg-node-green-light rounded-app border-1 border-node-green-dark">
        <h3 className="node-letter text-node-green-dark font-bold text-3xl mr-4">T</h3>
        <div>
          <h3 className="text-node-green-dark font-semibold text-lg">Transformer Node</h3>
          {/* <p className="text-node-green-dark text-sm">Description</p> */}
        </div>
      </div>

      {/* Yellow Node */}
      <div onDragStart={(event) => onDragStart(event, 'dataProducerNode')} draggable
        className="flex p-4 bg-node-yellow-light rounded-app border-1 border-node-yellow-dark">
        <h3 className="node-letter text-node-yellow-dark font-bold text-3xl mr-4">D</h3>
        <div>
          <h3 className="text-node-yellow-dark font-semibold text-lg">Data Producer Node</h3>
          {/* <p className="text-node-yellow-dark text-sm">Description</p> */}
        </div>
      </div>

      {/* Orange Node */}
      <div onDragStart={(event) => onDragStart(event, 'combinerNode')} draggable
        className="flex p-4 bg-node-orange-light rounded-app border-1 border-node-orange-dark">
        <h3 className="node-letter text-node-orange-dark font-bold text-3xl mr-4">C</h3>
        <div>
          <h3 className="text-node-orange-dark font-semibold text-lg">Combiner Node</h3>
          {/* <p className="text-node-orange-dark text-sm">Description</p> */}
        </div>
      </div>

      {/* Purple Node */}
      <div onDragStart={(event) => onDragStart(event, 'eventNode')} draggable
        className="flex p-4 bg-node-purple-light rounded-app border-1 border-node-purple-dark">
        <h3 className="node-letter text-node-purple-dark font-bold text-3xl mr-4">E</h3>
        <div>
          <h3 className="text-node-purple-dark font-semibold text-lg">Event Node</h3>
          {/* <p className="text-node-purple-dark text-sm">Description</p> */}
        </div>
      </div>

      {/* Gray Node */}
      <div onDragStart={(event) => onDragStart(event, 'outputNode')} draggable 
        className="flex p-4 bg-node-gray-light rounded-app border-1 border-node-gray-dark">
        <h3 className="node-letter text-node-gray-dark font-bold text-3xl mr-4">O</h3>
        <div>
          <h3 className="text-node-gray-dark font-semibold text-lg">Output Node</h3>
          {/* <p className="text-node-gray-dark text-sm">Description</p> */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;