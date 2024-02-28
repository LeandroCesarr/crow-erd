import { Node } from "reactflow";
import { v4 as uuid } from 'uuid';
import { TABLE_NODE_TYPE } from "@/components/editor/erd/nodes/TableNode";

export function createNode(type: string, selected?: boolean) : Node {
  return {
    id: uuid(),
    type: TABLE_NODE_TYPE,
    data: {},
    selected,
    position: {
      x: 0,
      y: 0
    },
  }
}