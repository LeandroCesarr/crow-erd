import { atom } from "recoil";
import { Edge } from "reactflow";
import { syncLocalStorageEffect } from "@/store/utils";
import { TTableNode } from "@/@types/nodes";
import { ColumnTypeEnum } from "@/enums/ColumnTypeEnum";

export const nodesAtom = atom<TTableNode[]>({
  key: "nodes",
  default: [
    {
      type: "table",
      id: "A1",
      position: { x: 0, y: 0 },
      data: {
        title: "Source table",
        columns: [
          {
            id: "A1",
            name: "source",
            type: ColumnTypeEnum.UUID,
            required: true
          }
        ]
      }
    },
    {
      type: "table",
      id: "B1",
      position: { x: 300, y: 300 },
      data: {
        title: "Source table",
        columns: [
          {
            id: "B1",
            name: "source",
            type: ColumnTypeEnum.UUID,
            required: true
          }
        ]
      }
    }
  ],
  effects: [syncLocalStorageEffect()]
})

export const edgesAtom = atom<Edge[]>({
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