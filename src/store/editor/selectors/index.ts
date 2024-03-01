import { selectorFamily } from 'recoil';
import {
  nodesAtom,
  updateNodeColumnsSetter,
  updateNodeDataSetter,
  updateNodeListItemSetter,
} from '@/store/editor';
import { Node } from 'reactflow';
import { TTableColumn, TTableNode, TTableProps } from '@/@types/nodes';

export const nodeSelector = selectorFamily({
  key: 'node',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const nodes = get(nodesAtom);

      return nodes.find(({ id }) => id === nodeId) ?? ({} as Node);
    },
  set:
    (nodeId: string) =>
    ({ set }, newValue) => {
      set(nodesAtom, (nodes) =>
        updateNodeListItemSetter(nodes, nodeId, newValue as Node)
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
