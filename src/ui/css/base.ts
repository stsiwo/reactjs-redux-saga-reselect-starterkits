import { css } from "styled-components";

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

