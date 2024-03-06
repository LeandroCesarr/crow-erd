import { selector, selectorFamily } from 'recoil';
import {
  edgesAtom,
  nodesAtom,
  updateEdgeListItemSetter,
  updateNodeColumnsSetter,
  updateNodeDataSetter,
  updateNodeListItemSetter,
} from '@/store/editor';
import { Edge, Node } from 'reactflow';
import {
  TTableColumn,
  TTableEdgeData,
  TTableNode,
  TTableProps,
} from '@/@types/nodes';

export const edgeSelector = selectorFamily({
  key: 'edge',
  get:
    (edgeId: string) =>
    ({ get }) => {
      const edges = get(edgesAtom);

      return (
        edges.find(({ id }) => id === edgeId) ?? ({} as Edge<TTableEdgeData>)
      );
    },
  set:
    (edgeId: string) =>
    ({ set }, newValue) => {
      set(edgesAtom, (edges) =>
        updateEdgeListItemSetter(
          edges,
          edgeId,
          newValue as Edge<TTableEdgeData>
        )
      );
    },
});

export const nodeSelector = selectorFamily({
  key: 'node',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const nodes = get(nodesAtom);

      return nodes.find(({ id }) => id === nodeId) ?? ({} as TTableNode);
    },
  set:
    (nodeId: string) =>
    ({ set }, newValue) => {
      set(nodesAtom, (nodes) =>
        updateNodeListItemSetter(nodes, nodeId, newValue as TTableNode)
      );
    },
});

export const nodeTitleSelector = selectorFamily({
  key: 'nodeTitle',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));

      return node.data?.title ?? '';
    },
  set:
    (nodeId: string) =>
    ({ set }, newValue) =>
      set(nodeSelector(nodeId), (node) =>
        updateNodeDataSetter(node, { title: newValue as string })
      ),
});

export const nodeDescriptionSelector = selectorFamily({
  key: 'nodeDescription',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));

      return node.data?.description;
    },
  set:
    (nodeId: string) =>
    ({ set }, newValue) =>
      set(nodeSelector(nodeId), (node) =>
        updateNodeDataSetter(node, { description: newValue as string })
      ),
});

type TNodeColumnSelectorProps = { nodeId: string; columnId: string };

export const nodeColumnSelector = selectorFamily({
  key: 'nodeColumn',
  get:
    ({ nodeId, columnId }: TNodeColumnSelectorProps) =>
    ({ get }) => {
      const node: TTableNode = get(nodeSelector(nodeId));

      return (
        node.data?.columns.find((column) => column.id === columnId) ??
        ({} as TTableColumn)
      );
    },
  set:
    ({ nodeId, columnId }: TNodeColumnSelectorProps) =>
    ({ set }, newValue) =>
      set(nodeSelector(nodeId), (node) => {
        return updateNodeDataSetter<TTableProps>(node, {
          columns: updateNodeColumnsSetter(
            node.data.columns,
            columnId,
            newValue as TTableColumn
          ),
        });
      }),
});

export const lastNodeIdSelector = selector({
  key: 'lastNodeId',
  get:
    ({ get }) => {
      const nodes = get(nodesAtom);

      return Math.max(
        0,
        ...nodes.map((node) => Number.parseInt(node.id.replace(/\D/g, '')))
      );
    },
});


export const lastNodeColumnIdSelector = selectorFamily({
  key: 'lastNodeId',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const node: TTableNode = get(nodeSelector(nodeId));

      return Math.max(
        0,
        ...node.data.columns.map((column) => Number.parseInt(column.id.replace(/\D/g, '')))
      );
    },
});
