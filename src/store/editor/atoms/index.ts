import { atom } from "recoil";
import { Edge } from "reactflow";
import { syncLocalStorageEffect } from "@/store/utils";
import { TTableNode } from "@/@types/nodes";

export const nodesAtom = atom<TTableNode[]>({
  key: "nodes",
  default: [],
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