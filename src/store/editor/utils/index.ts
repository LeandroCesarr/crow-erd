import { XYPosition } from "reactflow";
import { TTableEdgeProps, TTableNode, TTableNodeProps, TTableProps } from "@/@types/nodes";
import { DEFAULT_EDGE_DATA } from "@/data/editor";
import { EdgeTypeEnum } from "@/enums/EdgeTypeEnum";
import { NodeTypeEnum } from "@/enums/NodeTypeEnum";

export function createNode(id: string, position?: XYPosition, data?: TTableProps) : TTableNode {
  return {
    id,
    type: NodeTypeEnum.TABLE,
    data: {
      title: "",
      columns: [],
      ...data
    },
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
    focusable: true,
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