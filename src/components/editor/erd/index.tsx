'use client';

import 'reactflow/dist/style.css';
import { FC } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import { ActionsPanel } from './panels/ActionsPanel';
import { CommandsDialog } from './dialogs/CommandsDialog';
import { CommandLineDialog } from './dialogs/CommandLineDialog';
import { Markers } from './edges/Markers';
import { NODES_MAP } from './nodes';
import { EDGES_MAP, EDGE_DEFAULT_PROPS } from './edges';
import { useEditor } from '@/hooks/useEditor';

export const ErdEditor: FC = () => {
  const editorProps = useEditor();

  return (
    <ReactFlowProvider>
      <div style={{ height: '100%' }}>
        <ReactFlow
          nodeTypes={NODES_MAP}
          edgeTypes={EDGES_MAP}
          defaultEdgeOptions={EDGE_DEFAULT_PROPS}
          {...editorProps}
        >
          <Background />
          <Controls />
          <MiniMap />
          <ActionsPanel />
          <Markers />
        </ReactFlow>

        <CommandsDialog />
        <CommandLineDialog />
      </div>
    </ReactFlowProvider>
  );
};
