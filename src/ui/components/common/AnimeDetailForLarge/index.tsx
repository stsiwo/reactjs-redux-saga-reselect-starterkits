import * as React from 'react';
import styled from 'styled-components';
import { device } from 'ui/css/base';
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

export declare type AnimeDetailPropsType = {
  anime: AnimeType
  className?: string
}

const AnimeDetailForLarge: React.FunctionComponent<AnimeDetailPropsType> = ({
  anime,
  className
}) => {

  return (
    <div className={className}>
      <AnimeTitle>
        {anime.attributes.canonicalTitle}
      </AnimeTitle>
      <AnimeReleased>
        Release Date: {toStringToDateToString(anime.attributes.startDate)}
      </AnimeReleased>
      <AnimeAverageRating>
        Average Rating: {anime.attributes.averageRating}
      </AnimeAverageRating>
      <AnimeDescription>
        {anime.attributes.description}
      </AnimeDescription>
      <AnimeTrailerLink href={`https://youtu.be/${anime.attributes.youtubeVideoId}`} target="_blank">
        Watch The Trailer
      </AnimeTrailerLink>
    </div>
  )
}

export default styled(AnimeDetailForLarge)`

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

  @media ${device.laptop} {
    opacity: 0;
    visibility: hidden;

    position: absolute; 
  }

`
