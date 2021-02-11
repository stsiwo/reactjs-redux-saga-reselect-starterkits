import * as React from 'react';
import styled from 'styled-components';
import { AnimeType } from 'domain/anime';
import LeftArrowI from '../icons/LeftArrowI';


declare type BoxPropsType = {
  open: boolean
}
const Box = styled.div`

  transform: translateX(${(props: BoxPropsType) => (props.open) ? "-700px" : "700px"});
  position: fixed; 
  top: 0;
  right: 0;

  background-color: red;

  transition: all 0.5s;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CloseBox = styled.div`
  flex: 0 0 50px; 
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const AnimeDetailBox = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const PosterImageBox = styled.div`
  flex: 0 0 50%;
`

const DetailBox = styled.div`

  flex: 0 0 50%;
`

export declare type AnimeDetailModalPropsType = {
  isOpen: boolean
  anime: AnimeType
  onCloseClick: React.EventHandler<React.MouseEvent<SVGElement>>
}


const AnimeDetailModal: React.FunctionComponent<AnimeDetailModalPropsType> = (props) => {

  return (
    <Box open={props.isOpen}>
      <CloseBox>
        <LeftArrowI onClick={props.onCloseClick} />
      </CloseBox>
      <AnimeDetailBox>
        {(props.anime) && (
          <React.Fragment>
            <PosterImageBox >
              <img src={props.anime.attributes.posterImage.large} alt="sample" />
            </PosterImageBox>
            <DetailBox>
              <h1>{props.anime.attributes.titles.en}</h1>
            </DetailBox>
          </React.Fragment>
        )}
      </AnimeDetailBox>
    </Box>
  )

}

export default AnimeDetailModal

