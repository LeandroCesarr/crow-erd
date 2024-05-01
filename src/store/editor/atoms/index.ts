import { atom } from "recoil";
import { Edge } from "reactflow";
import { syncLocalStorageEffect } from "@/store/utils";
import { TTableEdgeData, TTableNode } from "@/@types/nodes";
import { COMMAND_DIALOG_ROOT_PAGE } from "@/data/editor";

export const fileTitleAtom = atom({
  key: "fileTitle",
  default: "",
})

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

export const commandLineDialogAtom = atom({
  key: "commandLineDialog",
  default: false
})

export const showElementsIdAtom = atom<boolean>({
  key: "showElementsId",
  default: true,
  effects: [syncLocalStorageEffect()]
})

export const isSelectingAtom = atom({
  key: "isSelecting",
  default: false
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

export const commandsDialogAtom = atom({
  key: "commandsDialog",
  default: false
})

export const diagramDetailsDialogAtom = atom({
  key: "diagramDetailsDialog",
  default: false
})

export const currentDialogPageAtom = atom({
  key: "currentDialogPage",
  default: COMMAND_DIALOG_ROOT_PAGE
})