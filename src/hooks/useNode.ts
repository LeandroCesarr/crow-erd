import { createNode as createNodeUtil, nodesAtom } from "@/store/editor"
import { useRecoilCallback } from "recoil"

export function useNode() {
  const createNode = useRecoilCallback(({ set }) => async (type: string, selected?: boolean) => {
    set(nodesAtom, (curr) => [...curr, createNodeUtil(type)])
  })

  const removeNode = useRecoilCallback(({ set }) => async (id: string) => {
    set(nodesAtom, (old) => old.filter((node) => node.id != id))
  })

  return {
    createNode,
    removeNode
  }
}