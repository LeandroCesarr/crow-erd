import isHotkey from "is-hotkey"
import { useEffect } from "react";

export function useHandleWindowCommand(command: string, cb : () => void) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isHotkey(command, e)) {
        e.preventDefault()
        cb();
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
}