import { selectorFamily } from 'recoil';
import { editTableTitleSetter, nodesAtom } from '@/store/editor';
import { TTableNode } from '@/@types/nodes';

export const nodeSelector = selectorFamily({
  key: 'node',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const nodes = get(nodesAtom);

      return nodes.find(({ id }) => id === nodeId) ?? ({} as TTableNode);
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
      set(nodesAtom, (nodes) =>
        editTableTitleSetter(nodes, nodeId, newValue as string)
      ),
});
