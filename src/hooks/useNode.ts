import { TBaseNodeProps } from "@/@types/nodes"
import { createNode as createNodeUtil, lastNodeIdSelector, nodesAtom } from "@/store/editor"
import { getCenterOnViewPort } from "@/utils/flow-viewport"
import { useViewport } from "reactflow"
import { useRecoilCallback } from "recoil"

export function useNode() {
  const viewport = useViewport()

  const createNode = useRecoilCallback(({ set, snapshot }) => async <T extends TBaseNodeProps>(type: string, data?: T) => {
    const currentLastId = await snapshot.getPromise(lastNodeIdSelector);
    const newId = `T${currentLastId + 1}`;

    set(nodesAtom, (curr) => [...curr, createNodeUtil(type, newId, getCenterOnViewPort(viewport), data)])
  })

  const removeNode = useRecoilCallback(({ set }) => async (id: string) => {
    set(nodesAtom, (old) => old.filter((node) => node.id != id))
  })

  return {
    createNode,
    removeNode
  }
}