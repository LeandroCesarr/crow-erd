import {
  TBaseNode,
  TTableColumn,
  TTableNode,
  TTableProps,
} from '@/@types/nodes';
import { updateNodeDataSetter } from '../setters';
import { CallbackInterface } from 'recoil';
import {
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
