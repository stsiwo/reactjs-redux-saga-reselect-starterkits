import * as React from 'react';
import styled from 'styled-components';
import { device, ShowUpKeyFrames } from 'ui/css/base';
import SwipeArrowI from '../icons/SwipeArrowI';


const Box = styled.div`
  position: fixed;
  bottom: 10%;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
`
const InnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  & svg:nth-child(1) {
    animation: ${ShowUpKeyFrames} 1s 1s 5;
  }
  & svg:nth-child(2) {
    animation: ${ShowUpKeyFrames} 1s 1.1s 5;
  }
  & svg:nth-child(3) {
    animation: ${ShowUpKeyFrames} 1s 1.2s 5 ;
  }
  & svg:nth-child(4) {
    animation: ${ShowUpKeyFrames} 1s 1.3s 5;
  }
`

const AnimatedSwipeArrowI = styled(SwipeArrowI)`
  width: 25px;  
  height: 25px;  
  color: #fff; 
  opacity: 0;
`

const Message = styled.div`
  color: #fff;
  opacity: 0;
  animation: ${ShowUpKeyFrames} 1s 1.4s 5;
  text-transform: uppercase;
`

const SwipeAnimation: React.FunctionComponent<{}> = (props) => {

  return (
    <Box>
      <InnerBox>
        <AnimatedSwipeArrowI />       
        <AnimatedSwipeArrowI />       
        <AnimatedSwipeArrowI />       
        <AnimatedSwipeArrowI />       
      </InnerBox>
      <Message>
        Swipe Right 
      </Message>
    </Box>
  )
}

export default SwipeAnimation 

