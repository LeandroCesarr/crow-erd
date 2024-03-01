'use client';

import 'reactflow/dist/style.css';
import { FC, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { TABLE_NODE_TYPE, TableNode } from './nodes/TableNode';
import { useRecoilState } from 'recoil';
import { edgesAtom, nodesAtom } from '@/store/editor';
import { TableEdge } from './edges/TableEdge';
import { ActionsPanel } from './panels/ActionsPanel';
import { CommandsDialog } from './dialogs/CommandsDialog';
import { CommandLineDialog } from './dialogs/CommandLineDialog';
import { Markers } from './edges/Markers';

const nodeTypes = {
  [TABLE_NODE_TYPE]: TableNode,
};

const edgeTypes = {
  'table-edge': TableEdge,
};

const edgeOptions = {
  animated: true,
};

export const ErdEditor: FC = () => {
  const [nodes, setNodes] = useRecoilState(nodesAtom);
  const [edges, setEdges] = useRecoilState(edgesAtom);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, type: 'table-edge' }, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={edgeOptions}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
        <MiniMap nodeColor="var(--muted)" maskColor="rgb(0, 0, 0, 0.3)" />
        <Panel position="top-right">
          <ActionsPanel />
        </Panel>

        <Markers />
      </ReactFlow>

      <CommandsDialog />
      <CommandLineDialog />
    </div>
  );
};
