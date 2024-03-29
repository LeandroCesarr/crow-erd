import { EdgeProps, Node, NodeProps } from 'reactflow';
import { ColumnTypeEnum } from '@/enums/ColumnTypeEnum';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';
import { ColumnRelationsEnum } from '@/enums/ColumnRelationsEnum';
import { NodeTypeEnum } from '@/enums/NodeTypeEnum';
import { ConstraintEnum } from '@/enums/ConstraintEnum';

export type TBaseNode<D = any, T extends NodeTypeEnum = NodeTypeEnum.DEFAULT> = Node<D, T>;

export type TBaseNodeProps = {
  title: string;
  description?: string;
};

export type TColumnConstraint = {
  id: string;
  type: ConstraintEnum,
  name?: string,
  customValue?: string,
  columns: string[]
}

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
  constraints: TColumnConstraint[]
};

export type TTableNodeProps = NodeProps<TTableProps>;

export type TTableNode = TBaseNode<TTableProps, NodeTypeEnum.TABLE>;

export type TTableEdgeData = {
  title?: string;
  sourceRelation?: ColumnRelationsEnum,
  targetRelation?: ColumnRelationsEnum,
}

export type TTableEdgeProps = EdgeProps<TTableEdgeData>