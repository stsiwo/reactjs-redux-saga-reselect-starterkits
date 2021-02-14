import { UseOutsideClick } from "./types";
import * as React from "react";

export const useOutsideClick = (input: UseOutsideClick): void => {

  React.useEffect(() => {

    const handleOutsideClickEvent = (e: Event) => {
      if (input.ref.current.contains(e.target as Node)) {
        return;
      }
      input.callback()
    }
    document.addEventListener('mousedown', handleOutsideClickEvent, false)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickEvent, false)
    }
  })
}
