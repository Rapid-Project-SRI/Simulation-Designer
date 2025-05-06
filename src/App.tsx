import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import FlowCanvas from './components/FlowCanvas';
import SideBar from './components/Sidebar';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import NodeDetails from './components/NodeDetails';

export default function App() {
  return (
    <ReactFlowProvider>
      <PanelGroup direction="horizontal" style={{ height: '100vh', width: '100vw' }}>
        <Panel defaultSize={20} minSize={10}>
          <SideBar />
        </Panel>

        <PanelResizeHandle style={{ width: '4px', background: '#ccc', cursor: 'col-resize' }} />

        <Panel defaultSize={80} minSize={10}>
          <FlowCanvas />
        </Panel>

        <PanelResizeHandle style={{ width: '4px', background: '#ccc', cursor: 'col-resize' }} />

        <Panel defaultSize={40} minSize={10}>
          <NodeDetails />
        </Panel>
      </PanelGroup>
    </ReactFlowProvider>
  );
}
