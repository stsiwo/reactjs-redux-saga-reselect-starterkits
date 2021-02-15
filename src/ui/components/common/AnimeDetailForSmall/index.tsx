import * as React from 'react';
import styled from 'styled-components';
import { device, BaseInputBtnStyle } from 'ui/css/base';
import { AnimeType } from 'domain/anime';
import { toStringToDateToString } from 'src/utils';


const AnimeTitle = styled.h2`
  
`
const AnimeReleased = styled.p``

const AnimeAverageRating = styled.p``

const AnimeTrailerLink = styled.a`
  text-decoration: none;
  color: #fff;
  border: 1px solid #fff;
  padding: 7px;
  box-shadow: 0px 1px 3px 0px #fff;
`

const AnimeDescription = styled.p`
  font-weight: normal;
`

const AnimeDetailControllerBox = styled.div`
  
  @media ${device.lteTablet} {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`

const AnimeDetailCloseBtn = styled.input`
  ${BaseInputBtnStyle}
  font-weight: bold;
  font-size: 1em;

  border: 1px solid #fff;
  padding: 7px;
  box-shadow: 0px 1px 3px 0px #fff;
`

export declare type AnimeDetailForSmallPropsType = {
  curSelectedAnime: AnimeType
  open: boolean
  handleAnimeDetailBoxCloseEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>>
  className?: string
}

const AnimeDetailForSmall: React.FunctionComponent<AnimeDetailForSmallPropsType> = ({
  curSelectedAnime,
  open,
  handleAnimeDetailBoxCloseEvent,
  className,
}) => {

  return ( open &&
    <div className={className}>
      <AnimeTitle>
        {curSelectedAnime.attributes.canonicalTitle}
      </AnimeTitle>
      <AnimeReleased>
        Release Date: {toStringToDateToString(curSelectedAnime.attributes.startDate)}
      </AnimeReleased>
      <AnimeAverageRating>
        Average Rating: {curSelectedAnime.attributes.averageRating}
      </AnimeAverageRating>
      <AnimeDetailControllerBox>
        <AnimeTrailerLink href={`https://youtu.be/${curSelectedAnime.attributes.youtubeVideoId}`} target="_blank">
          Watch The Trailer
            </AnimeTrailerLink>
        <AnimeDetailCloseBtn type="button" value="Close" onClick={handleAnimeDetailBoxCloseEvent} />
      </AnimeDetailControllerBox>
      <AnimeDescription>
        {curSelectedAnime.attributes.description}
      </AnimeDescription>
    </div>
  )
}

export default styled(AnimeDetailForSmall)`

  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  text-align: center;
  padding: 10px;

  word-break: break-all;
  white-space: normal;
  font-weight: bold;
  transition: all 0.5s;

  @media ${device.lteTablet} {
    position: fixed;
    z-index: 2000; 

    ${(props: AnimeDetailForSmallPropsType) => {
    if (props.open) {
      return `
          opacity: 1;
          visibility: visible;
        `
    } else {
      return `
          opacity: 0;
          visibility: hidden;
        `
    }
  }}
  }

  @media ${device.laptop} {
    opacity: 0;
    visibility: hidden;

    position: absolute; 
  }

  
`

