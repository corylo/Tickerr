import { useEffect } from "react";

export const useScrollToTopEffect = (location: any): void => {  
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
}

export const useOnClickAwayEffect = (
  focused: boolean,
  elementIds: string[],
  changeProps: any[],
  handleOnClickAway: () => void
) => {
  useEffect(() => {
    if (focused) {
      const focusedElements: HTMLElement[] = [];

      elementIds.forEach((id: string) => {
        const el: HTMLElement | null = document.getElementById(id);

        if (el) {
          focusedElements.push(el);
        }
      });

      const handleClick = (e: any): void => {
        let count: number = 0;
        
        focusedElements.forEach((el: HTMLElement) => {
          if (el.contains(e.target)) {
            count++;
          }
        });
        
        if (count === 0) {
          handleOnClickAway();
        }
      };

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, changeProps);
};

export const useUpdatePageOGUrlEffect = (location: any): void => {  
  useEffect(() => {            
    document.querySelector("meta[property=\"og:url\"]").setAttribute("content", window.location.href);
  }, [location.pathname]);
}

export const useUpdatePageTitleEffect = (title: string): void => {
  useEffect(() => {
    if(document.title !== title) {
      document.title = title;
      document.querySelector("meta[property=\"og:title\"]").setAttribute("content", title);
      document.querySelector("meta[name=\"twitter:title\"]").setAttribute("content", title);
    }
  }, [title]);
}