import { Edge } from "reactflow";
import { TBaseNode, TBaseNodeProps, TTableColumn } from "@/@types/nodes";
import { RecoilState } from "recoil";
import { showElementsIdAtom } from "..";

type TRecoilSetter = <T>(recoilVal: RecoilState<T>, valOrUpdater: ((currVal: T) => T) | T) => void

export function updateEdgeListItemSetter(edges: Edge[], edgeId: string, data: Edge) : Edge[] {
  return edges.map((edge) => {
    if (edge.id == edgeId) {
      return data
    }

    return edge;
  })
}

export function updateNodeListItemSetter(nodes: TBaseNode[], nodeId: string, data: TBaseNode) : TBaseNode[] {
  return nodes.map((node) => {
    if (node.id == nodeId) {
      return data
    }

    return node;
  })
}

export function updateNodeDataSetter<T extends TBaseNodeProps>(node: TBaseNode, data: Partial<T>) : TBaseNode {
  return {
    ...node,
    data: {
      ...node.data,
      ...data
    }
  }
}

export function updateNodeColumnsSetter(columns: TTableColumn[], columnId: string, data: Partial<TTableColumn>) : TTableColumn[] {
  return columns.map((column) => {
    if (column.id == columnId) {
      return {
        ...column,
        ...data
      } as TTableColumn
    }

    return column;
  })
}

export function toggleElementIdVisibility(set: TRecoilSetter) {
  set(showElementsIdAtom, (val) => !val)
}