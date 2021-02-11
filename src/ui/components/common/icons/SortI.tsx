import * as React from 'react';
import { IconProps } from './types';
import styled from 'styled-components';



const SortI: React.FunctionComponent<IconProps> = (props) => {

  const color = props.color ? props.color : "#000";

  return (
    <svg
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onClick={props.onClick}
    >
      <path d="M5.234 13.83h12.202c1.097 0 1.646 1.214.872 1.922l-6.101 5.579c-.482.44-1.262.44-1.739 0l-6.106-5.579c-.774-.708-.225-1.921.872-1.921zM18.308 8.91L12.207 3.33a1.308 1.308 0 00-1.739 0L4.363 8.91c-.774.707-.225 1.921.872 1.921h12.202c1.097 0 1.646-1.214.872-1.921z" fill={color} />
    </svg>
  )
}

export default styled(SortI)`
  width: ${(props: IconProps) => props.width ? `${props.width}px;` : "25px;"}  
  height: ${(props: IconProps) => props.height ? `${props.height}px;` : "25px;"}  
  color: ${(props: IconProps) => props.color ? `${props.color};` : "#000;"}
`
