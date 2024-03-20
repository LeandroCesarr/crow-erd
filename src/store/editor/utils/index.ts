import { Node, XYPosition } from "reactflow";
import { TABLE_NODE_TYPE } from "@/components/editor/erd/nodes/TableNode";
import { TBaseNodeProps, TTableEdgeProps } from "@/@types/nodes";
import { DEFAULT_EDGE_DATA } from "@/data/editor";
import { EdgeTypeEnum } from "@/enums/EdgeTypeEnum";

export function createNode<T extends TBaseNodeProps>(type: string, id: string, position?: XYPosition, data?: T) : Node {
  return {
    id,
    type: TABLE_NODE_TYPE,
    data,
    position: {
      x: position?.x ?? 0,
      y: position?.y ?? 0
    },
  }
}

interface ICreateNodeProps {
  type: EdgeTypeEnum;
  sourceNodeId: string;
  sourceColumnId: string;
  targetNodeId: string;
  targetColumnId: string;
  data?: TTableEdgeProps
}

export function createEdge({ type, sourceNodeId, sourceColumnId, targetNodeId, targetColumnId, data }: ICreateNodeProps) {
  return {
    animates: true,
    type,
    source: sourceNodeId,
    sourceHandle: sourceColumnId,
    target: targetNodeId,
    targetHandle: targetColumnId,
    data: {
      ...DEFAULT_EDGE_DATA,
      ...(data ?? {})
    }
  }
}

export function createHandleId(tableId: string, columnId: string, type: "source" | "target") {
  return `${tableId}-${columnId}-${type}`
}