import { css, keyframes, createGlobalStyle } from "styled-components";

/**
 * responsive 
 **/
export const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
}

export const device = {
  mobileS: `only screen and (min-width: ${size.mobileS}px)`,
  mobileM: `only screen and (min-width: ${size.mobileM}px)`,
  mobileL: `only screen and (min-width: ${size.mobileL}px)`,
  tablet: `only screen and (min-width: ${size.tablet}px)`,
  laptop: `only screen and (min-width: ${size.laptop}px)`,
  laptopL: `only screen and (min-width: ${size.laptopL}px)`,
  desktop: `only screen and (min-width: ${size.desktop}px)`,
  desktopL: `only screen and (min-width: ${size.desktop}px)`,
  mobileOnly: `only screen and (max-width: ${size.tablet - 1}px)`,
  tabletOnly: `only screen and (min-width: ${size.tablet}px) and (max-width: ${size.laptop - 1}px)`,
  laptopOnly: `only screen and (min-width: ${size.laptop}px) and (max-width: ${size.desktop - 1}px)`,
  lteTablet: `only screen and (max-width: ${size.laptop - 1}px)`,
  lteLaptop: `only screen and (max-width: ${size.desktop - 1}px)`,
};

/**
 * base 'styled' style
 **/
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;

  }
  html {
    width: 100%;
    font-size: 62.5%;
    /* disable 'bounce' effect or 'refresh' effect when scroll position top or bottom */
    /* not sure this is working or not */
    /* values:  */
    / *  - 'contain': default but no scroll chaining */
    / *  - 'none': neither bounce/refresh nor scroll chaining */
    overscroll-behavior: none;
  }

  body {
    font-family: "Times New Roman", Times, serif;
    font-size: 1.6em;
    margin: 0;
  }

  /* prevent overflow on mobile (disable all scrollbar x and y) */
  html, body {
    overflow: hidden;
  }
  body {
    position: relative;
  }

  a {
    text-decoration: none;
  }

  /* turn off iPhone/Safari input element rounding */
  input {
    border-radius: 0;
  }

  input[type="search"] {
    -webkit-appearance: none;
  }

  /* prevent input zoom (ios) on mobile */
  input {
    font-size: 16px;
  }

`


export const BaseInputStyle = css`
  border: none;
  border-bottom: 1px solid #fff;
  margin: 3px 5px; 
  padding: 3px;
  background-color: transparent;
  color: #fff;
`

export const BaseInputBtnStyle = css`
  border: 1px solid #fff;
  background-color: transparent;
  padding: 3px;
  color: #fff;
  margin: 3px 5px;

`

export const ShowUpKeyFrames = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
  }

  50% {
    opacity: 1;
    visibility: visible;
  }

  100% {
    opacity: 0;
    visibility: hidden;
  }
`

