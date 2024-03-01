import { TBaseNodeProps } from "@/@types/nodes"
import { createNode as createNodeUtil, nodesAtom } from "@/store/editor"
import { getCenterOnViewPort } from "@/utils/flow-viewport"
import { useViewport } from "reactflow"
import { useRecoilCallback } from "recoil"

export function useNode() {
  const viewport = useViewport()

  const createNode = useRecoilCallback(({ set }) => async <T extends TBaseNodeProps>(type: string, data?: T) => {
    set(nodesAtom, (curr) => [...curr, createNodeUtil(type, getCenterOnViewPort(viewport), data)])
  })

  const removeNode = useRecoilCallback(({ set }) => async (id: string) => {
    set(nodesAtom, (old) => old.filter((node) => node.id != id))
  })

  return {
    createNode,
    removeNode
  }
}