import * as React from 'react' 
import { UseResponsiveStatusInputType, UseResponsiveStatusOutputType, ScreenSizeStatusType } from './types';
import { useCssGlobalContext } from 'contexts/cssGlobal';
  
export const useResponsive = (): UseResponsiveStatusOutputType => {
  
  const cssGlobal = useCssGlobalContext()
  const [currentScreenSize, setScreenSize] = React.useState<ScreenSizeStatusType>({
    currentScreenWidth: window.innerWidth,
    currentScreenHeight: window.innerHeight,
    isMobileL: window.innerWidth <= cssGlobal.mobileLSize,
    isTablet: cssGlobal.mobileLSize < window.innerWidth && window.innerWidth <= cssGlobal.tabletSize,
    isLaptop: cssGlobal.tabletSize < window.innerWidth && window.innerWidth <= cssGlobal.laptopSize,
    isDesktop: cssGlobal.laptopSize < window.innerWidth,
    isLTETablet: window.innerWidth <= cssGlobal.tabletSize,
    isLTELaptop: window.innerWidth <= cssGlobal.laptopSize,
    isLTEDesktop: window.innerWidth <= cssGlobal.desktopSize,
  });
        
  React.useEffect(() => {   
    function handleScreenWidth() {
      setScreenSize({
        currentScreenWidth: window.innerWidth,
        currentScreenHeight: window.innerHeight,
        isMobileL: window.innerWidth <= cssGlobal.mobileLSize,
        isTablet: cssGlobal.mobileLSize < window.innerWidth && window.innerWidth <= cssGlobal.tabletSize,
        isLaptop: cssGlobal.tabletSize < window.innerWidth && window.innerWidth <= cssGlobal.laptopSize,
        isDesktop: cssGlobal.laptopSize < window.innerWidth,
        isLTETablet: window.innerWidth <= cssGlobal.tabletSize,
        isLTELaptop: window.innerWidth <= cssGlobal.laptopSize,
        isLTEDesktop: window.innerWidth <= cssGlobal.desktopSize,
      });
    } 
      
    window.addEventListener("resize", handleScreenWidth);
      
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, [  
      JSON.stringify(currentScreenSize)
    ]); 
    
    
  return currentScreenSize     
}   

