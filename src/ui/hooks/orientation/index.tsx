import * as React from 'react';
import { OrientationEnum, UseOrientationChangeOutputType } from './types';

/**
 * NOT working
 *   - don't use this
 *   - need to update
 **/
  
export const useOrientation = (): UseOrientationChangeOutputType => {

  const mql = window.matchMedia('(orientation:landscape)')
  const [curOrientation, setOrientation] = React.useState<OrientationEnum>(null)

  React.useEffect(() => {   
    function handleOrientationChange(e: any) {
      if (e.matches) {
        setOrientation(OrientationEnum.LANDSCAPE)
      } else {
        setOrientation(OrientationEnum.PORTRAIT)
      }
    } 
      
    mql.addEventListener('change', handleOrientationChange);
      
    return () => {
      mql.removeEventListener('change', handleOrientationChange);
    };
  }, []); 
    
  return curOrientation 
}   
