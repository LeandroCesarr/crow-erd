import { NodeTypeEnum } from "@/enums/NodeTypeEnum";
import { TableNode } from "./TableNode";

export const NODES_MAP = {
  [NodeTypeEnum.TABLE]: TableNode
}