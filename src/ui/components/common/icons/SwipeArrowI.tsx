import * as React from 'react';
import { IconProps } from './types';
import styled from 'styled-components';

const SwipeArrowI: React.FunctionComponent<IconProps> = (props) => {

  const color = props.color ? props.color : "#fff";

  return (
    <svg 
      viewBox="0 0 14 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}>
        <path 
          d="M11.8 10.3l-6.68 6.374c-.46.44-1.207.44-1.664 0l-1.11-1.06a1.085 1.085 0 010-1.588L7.08 9.507 2.346 4.988a1.085 1.085 0 010-1.589L3.451 2.33a1.213 1.213 0 011.665 0l6.678 6.375c.467.441.467 1.154.005 1.594z" 
          fill={color}
        />
   </svg>
  )
}

export default SwipeArrowI 
