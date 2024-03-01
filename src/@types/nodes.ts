import { Node, NodeProps } from "reactflow";
import { ColumnTypeEnum } from "@/enums/ColumnTypeEnum";
import { ColumnKeyTypeEnum } from "@/enums/ColumnKeyTypeEnum";

export type TBaseNodeProps = {
  title: string
  description?: string
}

export interface IBaseColumn {
  id: string;
  type: ColumnTypeEnum,
  name: string;
  required: boolean;
  keyType?: ColumnKeyTypeEnum;
  defaultValue?: string;
  description?: string;
}

export type TUuidColumn = IBaseColumn & {
  type: ColumnTypeEnum.UUID
}

export type TVarcharColumn = IBaseColumn & {
  type: ColumnTypeEnum.VARCHAR,
  size: number
}

export type TTableColumn = TUuidColumn | TVarcharColumn;

export type TTableProps = TBaseNodeProps & {
  columns: TTableColumn[]
}

export type TTableNodeProps = NodeProps<TTableProps>

export type TTableNode = Node<TTableProps>