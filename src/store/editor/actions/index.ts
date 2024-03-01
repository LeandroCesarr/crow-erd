import { TTableColumn } from '@/@types/nodes';
import { nodesAtom } from '..';
import { addTableColumnSetter, editColumnKeyTypeSetter, editTableTitleSetter } from '../setters';
import { CallbackInterface } from 'recoil';
import { ColumnKeyTypeEnum } from '@/enums/ColumnKeyTypeEnum';



export function addTableNodeColumnCallback(
  recoil: CallbackInterface,
  tableId: string,
  column: TTableColumn
) {
  recoil.set(nodesAtom, (nodes) =>
    addTableColumnSetter(nodes, tableId, column)
  );
}

export function editTableTitleCallback(
  recoil: CallbackInterface,
  tableId: string,
  title: string
) {
  recoil.set(nodesAtom, (nodes) => editTableTitleSetter(nodes, tableId, title));
}

export function editColumnKeyTypeCallback(
  recoil: CallbackInterface,
  tableId: string,
  columnId: string,
  type: ColumnKeyTypeEnum | null
) {
  recoil.set(nodesAtom, (nodes) => editColumnKeyTypeSetter(nodes, tableId, columnId, type));
}
