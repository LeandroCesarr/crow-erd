import { AtomEffect } from "recoil";

export const syncLocalStorageEffect =
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