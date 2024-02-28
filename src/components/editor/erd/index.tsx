'use client';

import 'reactflow/dist/style.css';
import { FC, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { TABLE_NODE_TYPE, TableNode } from './nodes/TableNode';
import { useRecoilState } from 'recoil';
import { edgesAtom, nodesAtom } from '@/store/editor';
import { Edge } from '../../Edge';
import { ActionsPanel } from './panels/ActionsPanel';
import { CommandsDialog } from './dialogs/CommandsDialog';
import { CommandLineDialog } from './dialogs/CommandLineDialog';

const nodeTypes = {
  [TABLE_NODE_TYPE]: TableNode,
};

const edgeTypes = {
  'custom-edge': Edge,
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
    (params: any) => setEdges((eds) => addEdge({ ...params, type: "custom-edge" }, eds)),
    [setEdges],
  );

  useEffect(() => {
    console.log(edges);
  }, [edges])

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
        <MiniMap />
        <Panel position='top-right'>
          <ActionsPanel />
        </Panel>
      </ReactFlow>

      <CommandsDialog />
      <CommandLineDialog />
    </div>
  );
};
