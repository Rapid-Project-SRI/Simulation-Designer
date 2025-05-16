// components/SideBar.tsx
import React from 'react';
import './SidebarNode.css';

function SideBar() {
  // When dragging starts, store the node type in the dataTransfer object.
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: 10, background: '#ECECEC', height: '100%', borderRight: '1px solid #ddd' }}>
      <h3 style={{ marginBottom: 20, fontWeight: 'bold' }}>Library</h3>
      <div
        className="sidebar-node variable"
        onDragStart={(event) => onDragStart(event, 'variableNode')}
        draggable
      >
        Variable Node
      </div>
      <div
        className="sidebar-node transformer"
        onDragStart={(event) => onDragStart(event, 'transformerNode')}
        draggable
      >
        Transformer Node
      </div>
      <div
        className="sidebar-node data-producer"
        onDragStart={(event) => onDragStart(event, 'dataProducerNode')}
        draggable
      >
        Data Producer Node
      </div>
      <div
        className="sidebar-node combiner"
        onDragStart={(event) => onDragStart(event, 'combinerNode')}
        draggable
      >
        Combiner Node
      </div>
      <div
        className="sidebar-node event"
        onDragStart={(event) => onDragStart(event, 'eventNode')}
        draggable
      >
        Event Node
      </div>
      <div
        className="sidebar-node output"
        onDragStart={(event) => onDragStart(event, 'outputNode')}
        draggable
      >
        Output Node
      </div>
      {/* <div
        className="sidebar-node branch"
        onDragStart={(event) => onDragStart(event, 'branchNode')}
        draggable
      >
        Branch Node
      </div> */}
    </aside>
  );
}

export default SideBar;
