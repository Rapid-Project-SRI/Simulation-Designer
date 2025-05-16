// components/SideBar.tsx
import React from 'react';

function SideBar() {
  // When dragging starts, store the node type in the dataTransfer object.
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: 10, background: '#f7f7f7', height: '100%', borderRight: '1px solid #ddd' }}>
      <h1 className='bg-blue pb-4'>Library</h1>
      <div
        style={{ marginBottom: 5, padding: 8, background: '#ddd', cursor: 'grab' }}
        onDragStart={(event) => onDragStart(event, 'variableNode')}
        draggable
      >
        Variable Node
      </div>
      <div
        style={{ marginBottom: 5, padding: 8, background: '#ddd', cursor: 'grab' }}
        onDragStart={(event) => onDragStart(event, 'transformerNode')}
        draggable
      >
        Transformer Node
      </div>
      <div
        style={{ marginBottom: 5, padding: 8, background: '#ddd', cursor: 'grab' }}
        onDragStart={(event) => onDragStart(event, 'dataProducerNode')}
        draggable
      >
        Data Producer Node
      </div>
      <div
        style={{ marginBottom: 5, padding: 8, background: '#ddd', cursor: 'grab' }}
        onDragStart={(event) => onDragStart(event, 'combinerNode')}
        draggable
      >
        Combiner Node
      </div>
      <div
        style={{ marginBottom: 5, padding: 8, background: '#ddd', cursor: 'grab' }}
        onDragStart={(event) => onDragStart(event, 'eventNode')}
        draggable
      >
        Event Node
      </div>
      <div
        style={{ marginBottom: 5, padding: 8, background: '#ddd', cursor: 'grab' }}
        onDragStart={(event) => onDragStart(event, 'outputNode')}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
}

export default SideBar;
