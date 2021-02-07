import * as React from 'react' 
import { UseScrollStatusInputType, UseScrollStatusOutputType, ScrollPosStatusType } from './types';
 
export const useScroll = (): UseScrollStatusOutputType => {

  /**
   * this useState might cause side effect to another components esp the one fetch the request when re-rendered
   *  - e.g., this cause Quill component re-render every time user scroll. the Quill content includes links to image, video
   *    so every time user scroll, the Quill component is re-render and try to fetch those assets ==> performance issues.
   *    also, if the images are not cached in browser and fetch to s3 storage, it might increase request cost for s3 so BE CAREFUL!!!!!!
   *
   * workaround: use Ref instead of useState
   **/
    
  const scrollPos = React.useRef<ScrollPosStatusType>({
    y: window.pageYOffset, 
  })
    
  React.useEffect(() => {      
    function handleScrollPos() {    
      scrollPos.current.y = window.pageYOffset
    } 
      
    window.addEventListener("scroll", handleScrollPos);
      
    return () => {         
      window.removeEventListener("scroll", handleScrollPos);
    };
  }, [
    window.pageYOffset     
  ]); 
    
  return {                 
    y: scrollPos.current.y,
  }
}                          

