import { XYPosition } from "reactflow";
import { TTableEdgeProps, TTableNode } from "@/@types/nodes";
import { DEFAULT_EDGE_DATA } from "@/data/editor";
import { EdgeTypeEnum } from "@/enums/EdgeTypeEnum";
import { NodeTypeEnum } from "@/enums/NodeTypeEnum";

export function createNode(type: string, id: string, position?: XYPosition, data?: any) : TTableNode {
  return {
    id,
    type: NodeTypeEnum.TABLE,
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
    type: "table-edge",
    source: sourceNodeId,
    sourceHandle: `${sourceNodeId}-${sourceColumnId}-source`,
    target: targetNodeId,
    targetHandle: `${targetNodeId}-${targetColumnId}-target`,
    data: {
      ...DEFAULT_EDGE_DATA,
      ...(data ?? {})
    }
  }
}