import { createContext, useContext } from "react";


export declare type CssGlobalContextDataType = {
  // headers
  headerHeight: string;

  // media
  mobileSSize: number;
  mobileLSize: number;
  tabletSize: number;
  laptopSize: number;
  desktopSize: number;

  // font-size
  titleFontSize: string;
  subTitleFontSize: string;
  regularFontSize: string;
  smallFontSize: string;
  exSmallFontSize: string;

  // color
  mainColor: string;
  secColor: string;
  thirdColor: string;
  borderColor: string;

  successColor: string;
  errorColor: string;
  importantColor: string;
  confirmationColor: string;
}

export const CssGlobalContextDefaultState: CssGlobalContextDataType = {
  // header
  headerHeight: "50px",

  // media
  mobileSSize: 320,
  mobileLSize: 425,
  tabletSize: 768,
  laptopSize: 1024,
  desktopSize: 1440,

  // font-size
  titleFontSize: "3em",
  subTitleFontSize: "1.8em",
  regularFontSize: "1.4em",
  smallFontSize: "1.2em",
  exSmallFontSize: "1em",

  mainColor: "#fff",
  secColor: "#000",
  thirdColor: "#ED7171",
  borderColor: "#7E7B7B",

  successColor: "#45A845",
  errorColor: "#DC3545",
  importantColor: "#3B7CFE",
  confirmationColor: '#FE8176',
}

  
// for provider 
export const CssGlobalContext = createContext<CssGlobalContextDataType>(CssGlobalContextDefaultState);
  
// for consumer 
export const useCssGlobalContext = () => {
  return useContext(CssGlobalContext);
} 

