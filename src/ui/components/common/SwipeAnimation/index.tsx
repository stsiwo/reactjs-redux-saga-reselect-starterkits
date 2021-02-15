import * as React from 'react';
import styled from 'styled-components';
import { device, ShowUpKeyFrames } from 'ui/css/base';
import SwipeArrowI from '../icons/SwipeArrowI';
import { useResponsive } from 'hooks/responsive';
import { useOrientation } from 'hooks/orientation';
import { OrientationEnum } from 'hooks/orientation/types';


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
  visibility: hidden;
`

const Message = styled.div`
  color: #fff;
  opacity: 0;
  visiblity: hidden;
  animation: ${ShowUpKeyFrames} 1s 1.4s 5;
  text-transform: uppercase;
`

const SwipeAnimation: React.FunctionComponent<{}> = (props) => {

  const responsive = useResponsive()

  return (
    <Box>
      <InnerBox>
        <AnimatedSwipeArrowI />       
        <AnimatedSwipeArrowI />       
        <AnimatedSwipeArrowI />       
        <AnimatedSwipeArrowI />       
      </InnerBox>
        {(responsive.isTouchDevice && 
          <Message>
            Swipe Right 
          </Message>
        )}
        {(!responsive.isTouchDevice && 
          <Message>
            Scroll Down 
          </Message>
        )}
    </Box>
  )
}

export default SwipeAnimation 

