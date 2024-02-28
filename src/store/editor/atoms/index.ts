import { atom } from "recoil";
import { Edge, Node } from "reactflow";
import { syncLocalStorageEffect } from "@/store/utils";

export const nodesAtom = atom<Node[]>({
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