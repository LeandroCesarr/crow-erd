import React, { FC } from "react"
import { MiniMap as RFMiniMap } from "reactflow"

export const MiniMap: FC = (): JSX.Element => {
  return <RFMiniMap nodeColor="var(--muted)" maskColor="rgb(0, 0, 0, 0.3)" />
}