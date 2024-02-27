import { Edge, Node } from "reactflow";
import { AtomEffect, atom } from "recoil";

const localStorageEffect =
  (): AtomEffect<any> =>
  ({ setSelf, onSet, node }) => {
    if (typeof window === 'undefined') return;

    const savedValue = localStorage.getItem(`ryze.store.${node.key}`);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(`ryze.store.${node.key}`)
        : localStorage.setItem(`ryze.store.${node.key}`, JSON.stringify(newValue));
    });
  };

export const nodesAtom = atom<Node[]>({
  key: "nodes",
  default: [],
  effects: [localStorageEffect()]
})

export const edgesAtom = atom<Edge[]>({
  key: "edges",
  default: [],
  effects: [localStorageEffect()]
})

export const commandsDialogAtom = atom({
  key: "commandsDialog",
  default: false
})

export const commandLineDialogAtom = atom({
  key: "commandLineDialog",
  default: false
})