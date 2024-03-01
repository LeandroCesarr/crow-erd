import { TTableColumn, TTableProps } from '@/@types/nodes';
import { updateNodeDataSetter } from '../setters';
import { CallbackInterface } from 'recoil';
import { nodeSelector } from '..';



export function addTableNodeColumnCallback(
  recoil: CallbackInterface,
  nodeId: string,
  column: TTableColumn
) {
  recoil.set(nodeSelector(nodeId), (node) => updateNodeDataSetter<TTableProps>(node, {
    columns: [
      ...node.data.columns,
      column
    ]
  }))
  ;
}
