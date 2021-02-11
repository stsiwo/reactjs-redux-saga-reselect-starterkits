import { css } from "styled-components";

/**
 * responsive 
 **/
export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
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

