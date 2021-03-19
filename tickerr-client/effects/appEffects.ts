import { useEffect } from "react";

export const useScrollToTopEffect = (location: any): void => {  
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
}

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