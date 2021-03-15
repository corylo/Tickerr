import { useEffect } from "react"

export const useUpdatePageTitleEffect = (title: string): void => {
  useEffect(() => {
    if(document.title !== title) {
      document.title = title;
    }
  }, [title]);
}