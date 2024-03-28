import { atom } from "recoil";
import { Edge } from "reactflow";
import { syncLocalStorageEffect } from "@/store/utils";
import { TTableEdgeData, TTableNode } from "@/@types/nodes";

export const nodesAtom = atom<TTableNode[]>({
  key: "nodes",
  default: [],
  // effects: [syncLocalStorageEffect()]
})

export const edgesAtom = atom<Edge<TTableEdgeData>[]>({
  key: "edges",
  default: [],
  // effects: [syncLocalStorageEffect()]
})

export const loadedFileIdAtom = atom({
  key: "loadedFileId",
  default: ""
})

export const commandsDialogAtom = atom({
  key: "commandsDialog",
  default: false
})

export const commandLineDialogAtom = atom({
  key: "commandLineDialog",
  default: false
})

export const showElementsIdAtom = atom<boolean>({
  key: "showElementsId",
  default: true,
  effects: [syncLocalStorageEffect()]
})

export const currentEdgeIdAtom = atom<string>({
  key: "currentEdgeId",
  default: "",
  // effects: [syncLocalStorageEffect()]
})

export const currentTableIdAtom = atom<string>({
  key: "currentTableId",
  default: "",
  // effects: [syncLocalStorageEffect()]
})