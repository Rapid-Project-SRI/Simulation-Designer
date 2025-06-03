// components/SideBar.tsx
import React from 'react';
import SidebarNode from './SidebarNode';

function SideBar() {
  // When dragging starts, store the node type in the dataTransfer object.
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='sidebar-container'>
      <h1 className='bg-blue'>Library</h1>
      <SidebarNode color={'blue'} letter={'X'} label={'Variable Node'} nodeType={'variableNode'}onDragStart={onDragStart}/>
      <SidebarNode color={'green'} letter={'T'} label={'Transformer Node'} nodeType={'transformerNode'} onDragStart={onDragStart}/>
      <SidebarNode color={'yellow'} letter={'D'} label={'Data Producer Node'} nodeType={'dataProducerNode'} onDragStart={onDragStart}/>
      <SidebarNode color={'orange'} letter={'C'} label={'Combiner Node'} nodeType={'combinerNode'} onDragStart={onDragStart}/>
      <SidebarNode color={'purple'} letter={'E'} label={'Event Node'} nodeType={'eventNode'} onDragStart={onDragStart}/>
      <SidebarNode color={'gray'} letter={'O'} label={'Output Node '} nodeType={'outputNode'} onDragStart={onDragStart}/>
    </div>
  );
}

export default SideBar;