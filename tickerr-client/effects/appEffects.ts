import { useEffect } from "react";

export const useUpdatePageTitleEffect = (title: string): void => {
  useEffect(() => {
    if(document.title !== title) {
      document.title = title;
      document.querySelector("meta[name=\"og:title\"]").setAttribute("content", title);
    }
  }, [title]);
}

export const useLoadLegalPolicyEffect = (): void => {
  useEffect(() => {
    const id: string = "termly-jssdk";
    
    if (document.getElementById(id)) return;

    const tjs: HTMLScriptElement = document.getElementsByTagName("script")[0],
      js: HTMLScriptElement = document.createElement("script"); 

    js.id = id;    
    js.src = "https://app.termly.io/embed-policy.min.js";

    tjs.parentNode.insertBefore(js, tjs);

    return () => {     
      if (document.getElementById(id)) {
        tjs.parentNode.removeChild(js);
      }
    }
  }, []);
}