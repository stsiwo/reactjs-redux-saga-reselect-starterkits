import * as React from 'react';
import { IconProps } from './types';
import styled from 'styled-components';

const CloseI: React.FunctionComponent<IconProps> = (props) => {

  const color = props.color ? props.color : "#fff";

  return (
    <svg 
      viewBox="0 0 23 25" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}
    >
      <path 
        d="M14.722 13l4.833-4.549a1.371 1.371 0 000-2.021l-1.074-1.011a1.587 1.587 0 00-2.148 0L11.5 9.967 6.667 5.42a1.587 1.587 0 00-2.148 0l-1.074 1.01a1.371 1.371 0 000 2.022L8.278 13l-4.833 4.549a1.371 1.371 0 000 2.021l1.074 1.011a1.587 1.587 0 002.148 0l4.833-4.548 4.833 4.548a1.587 1.587 0 002.148 0l1.074-1.01a1.371 1.371 0 000-2.022L14.722 13z" 
        fill={color}
      />
    </svg>
  )
}

export default CloseI 
