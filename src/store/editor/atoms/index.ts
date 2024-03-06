import { atom } from "recoil";
import { Edge } from "reactflow";
import { syncLocalStorageEffect } from "@/store/utils";
import { TTableEdgeData, TTableNode } from "@/@types/nodes";
import { ColumnTypeEnum } from "@/enums/ColumnTypeEnum";
import { NodeTypeEnum } from "@/enums/NodeTypeEnum";
import { ColumnKeyTypeEnum } from "@/enums/ColumnKeyTypeEnum";

export const nodesAtom = atom<TTableNode[]>({
  key: "nodes",
  default: [
    {
      type: NodeTypeEnum.TABLE,
      id: "T1",
      position: { x: 0, y: 0 },
      data: {
        title: "Source table",
        columns: [
          {
            id: "C1",
            name: "source",
            type: ColumnTypeEnum.UUID,
            required: true,
            keyType: ColumnKeyTypeEnum.PRIMARY_KEY
          }
        ]
      }
    },
    {
      type: NodeTypeEnum.TABLE,
      id: "T2",
      position: { x: 300, y: 300 },
      data: {
        title: "Source table",
        columns: [
          {
            id: "C1",
            name: "id",
            type: ColumnTypeEnum.UUID,
            required: true,
            keyType: ColumnKeyTypeEnum.PRIMARY_KEY
          },
          {
            id: "C2",
            name: "foreign_key",
            type: ColumnTypeEnum.UUID,
            required: true,
            keyType: ColumnKeyTypeEnum.FOREIGN_KEY
          }
        ]
      }
    }
  ],
  effects: [syncLocalStorageEffect()]
})

export const edgesAtom = atom<Edge<TTableEdgeData>[]>({
  key: "edges",
  default: [],
  effects: [syncLocalStorageEffect()]
})

export const commandsDialogAtom = atom({
  key: "commandsDialog",
  default: false
})

export const commandLineDialogAtom = atom({
  key: "commandLineDialog",
  default: false
})