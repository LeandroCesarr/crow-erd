import { EdgeTypeEnum } from "@/enums/EdgeTypeEnum";
import { TableEdge } from "./TableEdge";

export const EDGES_MAP = {
  [EdgeTypeEnum.TABLE]: TableEdge
}

export const EDGE_DEFAULT_PROPS = {
  animated: true
}