import { Node, NodeProps } from 'reactflow';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';

export type TBaseNodeProps = {
  title: string;
  description?: string;
};

export type TTableColumn = {
  id: string;
  type: ColumnTypeEnum;
  name: string;
  required: boolean;
  keyType?: ColumnKeyTypeEnum;
  defaultValue?: string;
  description?: string;
  value?: string;
};

export type TTableProps = TBaseNodeProps & {
  columns: TTableColumn[];
};

export type TTableNodeProps = NodeProps<TTableProps>;

export type TTableNode = Node<TTableProps>;