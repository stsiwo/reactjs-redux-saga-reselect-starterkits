import * as React from 'react';
import { IconProps } from './types';

const LeftArrowI: React.FunctionComponent<IconProps> = (props) => {

  const color = props.color ? props.color : "#000";

  return (
    <svg 
      width="24" 
      height="24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}
    >
        <path 
          d="M15 18.057V5.943c0-.838-1.15-1.258-1.822-.665l-6.865 6.056a.865.865 0 000 1.332l6.865 6.056c.672.593 1.822.173 1.822-.665z"
          fill={color}/>
    </svg>
  )
}

export default LeftArrowI
