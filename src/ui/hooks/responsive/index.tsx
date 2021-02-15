import * as React from 'react'
import { UseResponsiveStatusInputType, UseResponsiveStatusOutputType, ScreenSizeStatusType } from './types';

export const useResponsive = (): UseResponsiveStatusOutputType => {

  const size = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768, //  768 <= tablet size < 1024
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560,
  }

  const [currentScreenSize, setScreenSize] = React.useState<ScreenSizeStatusType>({
    currentScreenWidth: window.innerWidth,
    currentScreenHeight: window.innerHeight,
    isMobile: window.innerWidth < size.tablet,
    isTablet: size.tablet <= window.innerWidth && window.innerWidth < size.laptop,
    isLaptop: size.laptop <= window.innerWidth && window.innerWidth < size.desktop,
    isDesktop: size.desktop <= window.innerWidth,
    isLTETablet: window.innerWidth < size.laptop,
    isLTELaptop: window.innerWidth < size.desktop,
    isLandscape: window.innerWidth > window.innerHeight,
    isTouchDevice: (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)), // src: https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  });

  React.useEffect(() => {
    function handleScreenWidth() {
      setScreenSize({
        currentScreenWidth: window.innerWidth,
        currentScreenHeight: window.innerHeight,
        isMobile: window.innerWidth < size.tablet,
        isTablet: size.tablet <= window.innerWidth && window.innerWidth < size.laptop,
        isLaptop: size.laptop <= window.innerWidth && window.innerWidth < size.desktop,
        isDesktop: size.desktop <= window.innerWidth,
        isLTETablet: window.innerWidth < size.laptop,
        isLTELaptop: window.innerWidth < size.desktop,
        isLandscape: window.innerWidth > window.innerHeight,
        isTouchDevice: (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)), // src: https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
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

