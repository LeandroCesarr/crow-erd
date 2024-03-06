import { TTableEdgeData } from "@/@types/nodes";
import { ColumnRelationsEnum } from "@/enums/ColumnRelationsEnum";

export const DEFAULT_EDGE_DATA: TTableEdgeData = {
  sourceRelation: ColumnRelationsEnum.ONE,
  targetRelation: ColumnRelationsEnum.ONE
}