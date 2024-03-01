import { Edge, Node } from "reactflow";
import { TBaseNodeProps, TTableColumn } from "@/@types/nodes";

export function updateEdgeListItemSetter(edges: Edge[], edgeId: string, data: Edge) : Edge[] {
  return edges.map((edge) => {
    if (edge.id == edgeId) {
      return data
    }

    return edge;
  })
}

export function updateNodeListItemSetter(nodes: Node[], nodeId: string, data: Node) : Node[] {
  return nodes.map((node) => {
    if (node.id == nodeId) {
      return data
    }

    return node;
  })
}

export function updateNodeDataSetter<T extends TBaseNodeProps>(node: Node, data: Partial<T>) : Node {
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