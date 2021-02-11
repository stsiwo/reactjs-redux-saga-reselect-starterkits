import * as React from 'react'
import { UseResponsiveStatusInputType, UseResponsiveStatusOutputType, ScreenSizeStatusType } from './types';

export const useResponsive = (): UseResponsiveStatusOutputType => {

  const size = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560,
  }

  const [currentScreenSize, setScreenSize] = React.useState<ScreenSizeStatusType>({
    currentScreenWidth: window.innerWidth,
    currentScreenHeight: window.innerHeight,
    isMobile: window.innerWidth <= size.mobileL,
    isTablet: size.mobileL < window.innerWidth && window.innerWidth <= size.tablet,
    isLaptop: size.tablet < window.innerWidth && window.innerWidth <= size.laptop,
    isDesktop: size.laptop < window.innerWidth,
    isLTETablet: window.innerWidth <= size.tablet,
    isLTELaptop: window.innerWidth <= size.laptop,
    isLTEDesktop: window.innerWidth <= size.desktop,
  });

  React.useEffect(() => {
    function handleScreenWidth() {
      setScreenSize({
        currentScreenWidth: window.innerWidth,
        currentScreenHeight: window.innerHeight,
        isMobile: window.innerWidth <= size.mobileL,
        isTablet: size.mobileL < window.innerWidth && window.innerWidth <= size.tablet,
        isLaptop: size.tablet < window.innerWidth && window.innerWidth <= size.laptop, 
        isDesktop: size.laptop < window.innerWidth,
        isLTETablet: window.innerWidth <= size.tablet, 
        isLTELaptop: window.innerWidth <= size.laptop,
        isLTEDesktop: window.innerWidth <= size.desktop,
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

