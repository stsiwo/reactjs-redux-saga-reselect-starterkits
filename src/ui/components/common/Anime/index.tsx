import * as React from 'react';
import styled from 'styled-components';
import AnimeDetailForLarge from '../AnimeDetailForLarge';
import { device } from 'ui/css/base';
import { AnimeType } from 'domain/anime';
import { useResponsive } from 'hooks/responsive';

const AnimeImage = styled.img`
  vertical-align: middle; //(image-vertical-align)
  max-height: 100%;
  max-width: auto;
  box-shadow: 0px 7px 15px -2px rgb(84, 84, 84);
`

// need this to center image vertically (image-vertical-align)
const AnimeImageHelper = styled.span`
  display: inline-block; //(image-vertical-align)
  height: 100%; //(image-vertical-align)
  vertical-align: middle; //(image-vertical-align)

`

export declare type AnimePropsType = {
  anime: AnimeType
  curAnimeListRefs: React.MutableRefObject<HTMLDivElement[]> 
  index: number
  handleAnimeClickEvent: React.EventHandler<React.MouseEvent<HTMLImageElement>>
  className?: string // this is required by 'styled-components` to wrap non-styled component (normal react component)
}

const Anime: React.FunctionComponent<AnimePropsType> = ({
  anime,
  curAnimeListRefs,
  index,
  handleAnimeClickEvent,
  className
}) => {
  
  // responsive
  const responsive = useResponsive()

  return (
    <div ref={(el: HTMLDivElement) => curAnimeListRefs.current[index] = el} className={className}>
      <AnimeImageHelper />
      {(responsive.isMobile &&
        <React.Fragment>
          <AnimeImage
            src={anime.attributes.posterImage.small}
            alt={`${anime.attributes.titles.en} post image`}
            data-anime-id={anime.id}
            onClick={handleAnimeClickEvent}
          />
        </React.Fragment>
      )}
      {(responsive.isTablet &&
        <AnimeImage
          src={anime.attributes.posterImage.medium}
          alt={`${anime.attributes.titles.en} post image`}
          data-anime-id={anime.id}
          onClick={handleAnimeClickEvent}
        />
      )}
      {(responsive.isLaptop &&
        <React.Fragment>
          <AnimeImage src={anime.attributes.posterImage.large} alt={`${anime.attributes.titles.en} post image`} />
          <AnimeDetailForLarge
            anime={anime}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default styled(Anime)`

  // inline-flex: make the container inline, which means that the next element comes next horizontally. (not jump to next line)
  // flex: make the container block, which means that the next element comes next vertically.

  display: inline-block; //(image-vertical-align)
  margin: 10px;
  height: 90%; //(image-vertical-align)

  position: relative;

  &:hover > ${AnimeDetailForLarge} {
    opacity: 1;
    visibility: visible;
  }

  @media ${device.mobileOnly} {
  }
`
