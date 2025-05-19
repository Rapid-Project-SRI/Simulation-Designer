import { ReactFlowProvider } from '@xyflow/react';
// We already import the CSS in FlowCanvas
import FlowCanvas from './components/FlowCanvas';
import SideBar from './components/Sidebar';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import NodeDetails from './components/NodeDetails';
import './Globals.css'


export default function App() {
  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-white p-2 '>
        <h1 className="p-2 m-1 bg-bg-primary text-text rounded-app">Data Simulation Framework</h1>
      </div>

      <ReactFlowProvider >
        <PanelGroup direction="horizontal" className="bg-white p-2 h-full w-full">
          <Panel className="rounded-app mr-4 min-w-[250px]" defaultSize={15} minSize={15}>
            <SideBar />
          </Panel>

          <PanelResizeHandle style={{ width: '4px', background: '#ccc', cursor: 'col-resize' }} />

          <Panel className="h-full oberflow-hidden" defaultSize={80} minSize={10}>
            <FlowCanvas />
          </Panel>

          <PanelResizeHandle style={{ width: '4px', background: '#ccc', cursor: 'col-resize' }} />

          <Panel className="rounded-app ml-4" defaultSize={30} minSize={10}>
            <NodeDetails />
          </Panel>
        </PanelGroup>
      </ReactFlowProvider>
    </div>
  );
}