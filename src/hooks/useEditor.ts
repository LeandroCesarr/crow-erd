import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import { EdgeTypeEnum } from '@/enums/EdgeTypeEnum';
import { nodesAtom, edgesAtom, createEdge, isSelectingAtom } from '@/store/editor';
import { TTableNode } from '@/@types/nodes';

export function useEditor() {
  const setIsSelecting = useSetRecoilState(isSelectingAtom)
  const [nodes, setNodes] = useRecoilState(nodesAtom);
  const [edges, setEdges] = useRecoilState(edgesAtom);

  const onSelectionStart = useCallback(
    () => setIsSelecting(true),
    []
  );

  const onSelectionEnd = useCallback(
    () => setIsSelecting(false),
    []
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds) as TTableNode[]),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((currentEdges) =>
        addEdge(
          createEdge({
            type: EdgeTypeEnum.TABLE,
            sourceNodeId: params.source as string,
            sourceColumnId: params.sourceHandle as string,
            targetNodeId: params.target as string,
            targetColumnId: params.targetHandle as string,
          }),
          currentEdges
        )
      ),
    [setEdges]
  );

  return {
    edges,
    nodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onSelectionStart,
    onSelectionEnd
  };
}
