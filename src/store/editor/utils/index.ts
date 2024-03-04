import { Node, XYPosition } from "reactflow";
import { TABLE_NODE_TYPE } from "@/components/editor/erd/nodes/TableNode";
import { TBaseNodeProps } from "@/@types/nodes";

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