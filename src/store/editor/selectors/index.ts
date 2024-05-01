import { selector, selectorFamily } from 'recoil';
import {
  edgesAtom,
  isSelectingAtom,
  nodesAtom,
  updateEdgeListItemSetter,
  updateNodeColumnsSetter,
  updateNodeDataSetter,
  updateNodeListItemSetter,
} from '@/store/editor';
import { Edge } from 'reactflow';
import {
  TBaseNode,
  TColumnConstraint,
  TTableColumn,
  TTableEdgeData,
  TTableNode,
  TTableProps,
} from '@/@types/nodes';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { ConstraintEnum } from '@/enums/ConstraintEnum';

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
      set(
        nodesAtom,
        (nodes) =>
          updateNodeListItemSetter(
            nodes as TBaseNode[],
            nodeId,
            newValue as TBaseNode
          ) as TTableNode[]
      );
    },
});

export const nodeSelectedSelector = selectorFamily({
  key: 'nodeSelected',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const isDragSelecting = get(isSelectingAtom)
      const nodes = get(nodesAtom);

      const selectedNodes = nodes
        .filter(({ selected }) => selected)
        .map(({ id }) => id);

      return selectedNodes.includes(nodeId) && selectedNodes.length == 1 && !isDragSelecting;
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
      set(
        nodeSelector(nodeId),
        (node) =>
          updateNodeDataSetter(node as TBaseNode, {
            title: newValue as string,
          }) as TTableNode
      ),
});

export const nodeConstraintsSelector = selectorFamily({
  key: 'nodeConstraints',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));

      return node.data?.constraints ?? [];
    },
});

export const nodeConstraintsIdsSelector = selectorFamily({
  key: 'nodeConstraintsIds',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));

      return node.data?.constraints
        .filter(({ columns }) => !!columns.length)
        .map(({ id }) => id) ?? [];
    },
});

type TNodeConstraintSelectorProps = { nodeId: string; constraintId: string };

export const nodeConstraintSelector = selectorFamily({
  key: 'nodeConstraint',
  get:
    ({ nodeId, constraintId }: TNodeConstraintSelectorProps) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));

      return (
        node.data?.constraints.find((c) => c.id === constraintId) ??
        ({} as TColumnConstraint)
      );
    },
  set:
    ({ nodeId, constraintId }: TNodeConstraintSelectorProps) =>
    ({ set }, newValue) =>
      set(nodeSelector(nodeId), (node) => {
        return updateNodeDataSetter<TTableProps>(node as TBaseNode, {
          constraints: node.data.constraints.map((constraint) => {
            if (constraint.id === constraintId) return newValue;

            return constraint;
          }) as TColumnConstraint[],
        }) as TTableNode;
      }),
});

export const columnIsPrimaryKeySelector = selectorFamily({
  key: 'columnIsPrimaryKeySelector',
  get:
    ({ nodeId, columnId }: { nodeId: string; columnId: string }) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));

      return (
        node.data?.constraints.some((c) => c.type == ConstraintEnum.PRIMARY && c.columns.includes(columnId)) ?? false
      );
    }
});

export const nodeConstraintColumnNamesSelector = selectorFamily({
  key: 'nodeConstraintColumnNames',
  get:
    ({ nodeId, constraintId }: TNodeConstraintSelectorProps) =>
    ({ get }) => {
      const node = get(nodeSelector(nodeId));
      const constraint = node.data?.constraints.find((c) => c.id === constraintId)!

      return  constraint.columns.map((col) => get(nodeColumnSelector({ nodeId, columnId: col })).name)
    }
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
      set(
        nodeSelector(nodeId),
        (node) =>
          updateNodeDataSetter(node as TBaseNode, {
            description: newValue as string,
          }) as TTableNode
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
        ({
          id: "",
          name: "",
          type: ColumnTypeEnum.VARCHAR,
          required: false
        } as TTableColumn)
      );
    },
  set:
    ({ nodeId, columnId }: TNodeColumnSelectorProps) =>
    ({ set }, newValue) =>
      set(nodeSelector(nodeId), (node) => {
        return updateNodeDataSetter<TTableProps>(node as TBaseNode, {
          columns: updateNodeColumnsSetter(
            node.data.columns,
            columnId,
            newValue as TTableColumn
          ),
        }) as TTableNode;
      }),
});

export const lastNodeIdSelector = selector({
  key: 'lastNodeId',
  get: ({ get }) => {
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
        ...node.data.columns.map((column) =>
          Number.parseInt(column.id.replace(/\D/g, ''))
        )
      );
    },
});
