import { Node, XYPosition } from "reactflow";
import { v4 as uuid } from 'uuid';
import { TABLE_NODE_TYPE } from "@/components/editor/erd/nodes/TableNode";
import { TBaseNodeProps } from "@/@types/nodes";

export function createNode<T extends TBaseNodeProps>(type: string, position?: XYPosition, data?: T) : Node {
  return {
    id: uuid(),
    type: TABLE_NODE_TYPE,
    data,
    position: {
      x: position?.x ?? 0,
      y: position?.y ?? 0
    },
  }
}

// export function mapCallbackToActionRecoil(recoil: CallbackInterface) : TRecoilParameter {}