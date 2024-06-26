import {
  TBaseNode,
  TTableColumn,
  TTableNode,
  TTableProps,
} from '@/@types/nodes';
import { updateNodeDataSetter } from '../setters';
import { CallbackInterface } from 'recoil';
import {
  currentDialogPageAtom,
  edgesAtom,
  lastNodeColumnIdSelector,
  nodeSelector,
  nodesAtom,
} from '..';

export async function addTableNodeColumnCallback(
  recoil: CallbackInterface,
  nodeId: string,
  column: TTableColumn
) {
  const currentLastId = await recoil.snapshot.getPromise(
    lastNodeColumnIdSelector(nodeId)
  );
  const newId = `C${currentLastId + 1}`;

  recoil.set(
    nodeSelector(nodeId),
    (node) =>
      updateNodeDataSetter<TTableProps>(node as TBaseNode, {
        columns: [
          ...node.data.columns,
          {
            ...column,
            id: newId,
          },
        ],
      }) as TTableNode
  );
}

export function getEditorDataCallback(recoil: CallbackInterface) {
  return async () => ({
    nodes: await recoil.snapshot.getPromise(nodesAtom),
    edges: await recoil.snapshot.getPromise(edgesAtom),
  });
}

export function removeEdgeCallback(recoil: CallbackInterface) {
  return async (id: string) => {
    recoil.set(edgesAtom, (old) => old.filter((edge) => edge.id != id));
  };
}


export function changeCommandDialogPageCallback(recoil: CallbackInterface) {
  return async (page: string) => {
    recoil.set(currentDialogPageAtom, page);
  };
}

export function deleteColumnCallback(nodeId: string, columnId: string) {
  return (recoil: CallbackInterface) => async () => {
    recoil.set(nodeSelector(nodeId), old => updateNodeDataSetter<TTableProps>(old as TBaseNode, {
      columns: old.data.columns.filter((col) => col.id !== columnId),
    }) as TTableNode);
  };
}


export function deleteConstraintCallback(nodeId: string, constraintId: string) {
  return (recoil: CallbackInterface) => async () => {
    recoil.set(nodeSelector(nodeId), old => updateNodeDataSetter<TTableProps>(old as TBaseNode, {
      constraints: old.data.constraints.filter((con) => con.id !== constraintId),
    }) as TTableNode);
  };
}
