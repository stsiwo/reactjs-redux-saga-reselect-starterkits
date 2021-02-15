import { AnimeType } from 'domain/anime';
import { useResponsive } from 'hooks/responsive';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllSortAndFilterActionCreator, curCategorySearchKeywordActions } from 'reducers/slices/app';
import { FetchStatusEnum } from 'src/app';
import { mSelector } from 'src/selectors/selector';
import styled from 'styled-components';
import { BaseInputBtnStyle } from 'ui/css/base';
import Anime from '../Anime';
import AnimeDetailForSmall from '../AnimeDetailForSmall';
import Loading from '../Loading';

const NoResultBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`

const NoResultMessage = styled.p`
  color: #fff;
`

const ClearAllSortAndFilterBtn = styled.input`
  ${BaseInputBtnStyle}
  font-weight: bold;
  font-size: 1em;
  border: 1px solid #fff;
  padding: 7px;
  box-shadow: 0px 1px 3px 0px #fff;
  margin: 30px 5px;
`

const ItemList = styled.div`

  overflow: hidden;
  white-space: nowrap;
  width: 100vw;
  height: 100%;

  /* hide scroll (horizontal) bar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */

  &::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }
`

export declare type SearchResultPropsType = {
  className?: string // this is required by 'styled-components` to wrap non-styled component (normal react component)
}

const SearchResult: React.FunctionComponent<SearchResultPropsType> = ({
  className,
}) => {

  // redux dispatcher
  const dispatch = useDispatch()

  // responsive
  const responsive = useResponsive()

  /**
   * current anime list
   **/
  const curAnimes: AnimeType[] = useSelector(mSelector.makeAnimeDataSelector())

  /**
   * anime list item horizontal scroll
   **/
  const unitScrollMove = 50;

  // laptop & desktop: we need to use onWheel
  const curAnimeListRefs = React.useRef<HTMLDivElement[]>([]);
  const curScrollPosXRef = React.useRef<number>(0)
  const handleHorizontalWheelEvent: React.EventHandler<React.WheelEvent<HTMLDivElement>> = (e) => {
    // deltaY is used to determine wheel is up or down 
    // return "+" value when scroll down
    // return "-" value when scroll up 
    if (curAnimeListRefs.current.length === 0) return false

    const maxWidth = - (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)

    if (e.deltaY > 0) {

      // scroll down
      if (curScrollPosXRef.current <= maxWidth) return false
      curScrollPosXRef.current -= unitScrollMove

    } else if (e.deltaY < 0) {

      // scroll up 
      if (curScrollPosXRef.current >= 0) return false
      curScrollPosXRef.current += unitScrollMove
    }

    // scroll with transform
    for (let i = 0; i < curAnimeListRefs.current.length; i++) {
      curAnimeListRefs.current[i].style.transform = `translate3d(${curScrollPosXRef.current}px, 0, 0)`
      curAnimeListRefs.current[i].style.transition = `transform 1s`
    }
  }

  // mobile & tablet swipe

  // (ref) current position where touch starts
  const curTouchStart = React.useRef<number>(0)
  // event handler triggered when a user starts touching the screen
  const handleTouchStartEvent: React.EventHandler<React.TouchEvent<HTMLDivElement>> = React.useCallback((e) => {
    curTouchStart.current = e.touches[0].clientX
  }, [
    ])

  // event handler triggered when a user ends touching the screen
  const handleTouchMoveEvent: React.EventHandler<React.TouchEvent<HTMLDivElement>> = React.useCallback((e) => {

    // get the position where the user ends touching
    const curTouchEnd = e.touches[0].clientX

    // get max scroll width
    const maxWidth = - (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)

    // decide the right/left swipe based on the curTouchStart and curTouchEnd
    if (curTouchEnd > curTouchStart.current) {

      // right swipe
      if (curScrollPosXRef.current >= 0) return false
      curScrollPosXRef.current += unitScrollMove

    } else if (curTouchEnd < curTouchStart.current) {

      // left swipe
      if (curScrollPosXRef.current <= maxWidth) return false
      curScrollPosXRef.current -= unitScrollMove

    }

    // scroll with transform
    for (let i = 0; i < curAnimeListRefs.current.length; i++) {
      curAnimeListRefs.current[i].style.transform = `translate3d(${curScrollPosXRef.current}px, 0, 0)`
      curAnimeListRefs.current[i].style.transition = `transform 1s`
    }
  }, [
    ])

  /**
   * (mobile & table) detail modal feature
   *  - display this detail modal when user click an anime item
   **/
  const [isAnimeDetailModalOpen, setAnimeDetailModalOpen] = React.useState<boolean>(false)
  const [curSelectedAnime, setSelectedAnime] = React.useState<AnimeType>(null)

  const handleAnimeClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
    const nextAnimeId = e.currentTarget.getAttribute("data-anime-id")

    // find anime
    const nextAnime = curAnimes.find((anime: AnimeType) => anime.id == nextAnimeId)

    // update local state
    setSelectedAnime(nextAnime)

    // open the modal
    setAnimeDetailModalOpen(true)
  }

  const handleAnimeDetailBoxCloseEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {
    setAnimeDetailModalOpen(false)
  }

  /**
   * loading logic
   *  - display loading component until we done with fetching
   **/
  const isLoading: FetchStatusEnum = useSelector(mSelector.makeFetchStatusSelector())

  /**
   * no result feature
   *  - put 'clear all sort & filter btn to cancel all of them.
   **/
  const handleClearAllSortAndFilterBtn: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {
    dispatch(curCategorySearchKeywordActions.clear())
    dispatch(clearAllSortAndFilterActionCreator())
  }

  /**
   * render anime components
   *
   **/
  const renderAnimeComponents: () => React.ReactNode = () => {
    return curAnimes.map((anime: AnimeType, index: number) => {
      return (
        <Anime
          key={anime.id}
          anime={anime}
          curAnimeListRefs={curAnimeListRefs}
          index={index} // array index used for this array refs
          handleAnimeClickEvent={handleAnimeClickEvent}
        />
      )
    })
  }

  // styled components: you need to set className prop to make styled components work
  return (
    <div className={className}>
      {(isLoading === FetchStatusEnum.FETCHING &&
        <Loading />
      )}
      {((isLoading === FetchStatusEnum.FAILED || curAnimes.length === 0) &&
        <NoResultBox>
          <NoResultMessage>
            Opps, We don't have any anime here.
            </NoResultMessage>
          <ClearAllSortAndFilterBtn type="button" value="Clear All Sort & Filter" onClick={handleClearAllSortAndFilterBtn} />
        </NoResultBox>
      )}
      {(isLoading === FetchStatusEnum.SUCCESS && curAnimes.length > 0 &&
        <ItemList
          onTouchStart={handleTouchStartEvent}
          onTouchMove={handleTouchMoveEvent}
          onWheel={handleHorizontalWheelEvent}
        >
          {renderAnimeComponents()}
        </ItemList>
      )}
      {/** anime detail (only mobile & tablet) **/}
      {(curSelectedAnime && responsive.isLTETablet &&
        <AnimeDetailForSmall
          curSelectedAnime={curSelectedAnime}
          open={isAnimeDetailModalOpen}
          handleAnimeDetailBoxCloseEvent={handleAnimeDetailBoxCloseEvent}
        />
      )}
    </div>
  )
}

export default styled(SearchResult)`
  padding-top: 85px; // space for header controller
  height: 100%;
`

