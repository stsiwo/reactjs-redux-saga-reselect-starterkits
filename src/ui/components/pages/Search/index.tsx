import SortI from 'components/common/icons/SortI';
import Loading from 'components/common/Loading';
import Pagination from 'components/common/Pagination';
import SwipeAnimation from 'components/common/SwipeAnimation';
import { AnimeType } from 'domain/anime';
import { CategoryType } from 'domain/category';
import { useOutsideClick } from 'hooks/outsideClick';
import { useResponsive } from 'hooks/responsive';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllSortAndFilterActionCreator, curCategoryActions, curSortActions, searchKeywordActions } from 'reducers/slices/app';
import { fetchAnimeActionCreator, updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { fetchCategoryActionCreator } from 'reducers/slices/domain/categories';
import { FetchStatusEnum, SortType } from 'src/app';
import { mSelector } from 'src/selectors/selector';
import { convertPageToOffset, toStringToDateToString } from 'src/utils';
import { DomainPaginationType } from 'states/types';
import styled from 'styled-components';
import { BaseInputBtnStyle, BaseInputStyle, device } from 'ui/css/base';
import CloseI from 'components/common/icons/CloseI';
import SearchController from 'components/common/SearchController';

const SearchBox = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #000;

  @media ${device.laptop} {
  }

`
const SearchResultBox = styled.div`

  padding-top: 85px; // space for header controller

  height: 100%;

  @media ${device.laptop} {
  }

`

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

const AnimeImage = styled.img`
  vertical-align: middle; //(image-vertical-align)
  max-height: 100%;
  max-width: auto;
  box-shadow: 0px 7px 15px -2px rgb(84, 84, 84);
`

declare type AnimeDetailBoxPropsType = {
  open?: boolean;
}
const AnimeDetailBox = styled.div`

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

    ${(props: AnimeDetailBoxPropsType) => {
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

// need this to center image vertically (image-vertical-align)
const AnimeImageHelper = styled.span`
  display: inline-block; //(image-vertical-align)
  height: 100%; //(image-vertical-align)
  vertical-align: middle; //(image-vertical-align)

`
const Anime = styled.div`

  // inline-flex: make the container inline, which means that the next element comes next horizontally. (not jump to next line)
  // flex: make the container block, which means that the next element comes next vertically.

  display: inline-block; //(image-vertical-align)
  margin: 10px;
  height: 90%; //(image-vertical-align)

  position: relative;

  &:hover > ${AnimeDetailBox} {
    opacity: 1;
    visibility: visible;
  }

  @media ${device.mobileOnly} {
  }

`


const Search: React.FunctionComponent<{}> = (props) => {

  // redux dispatcher
  const dispatch = useDispatch()

  // responsive
  const responsive = useResponsive()

  // common redux states 
  //   - required by useEffect for fetching
  const curSort = useSelector(mSelector.makeCurSortSelector())
  const curSearchKeyword = useSelector(mSelector.makeSearchKeywordSelector())
  const curCategory = useSelector(mSelector.makeCurCategorySelector())

  // category search keyword
  //   - put this in parent since it is required by useEffect for fetching
  const [curCategorySearchKeyword, setCategorySearchKeyword] = React.useState<string>(curCategory.attributes.title)

  /**
   * current anime list
   **/
  const curAnimes: AnimeType[] = useSelector(mSelector.makeAnimeDataSelector())

  /**
   * pagination
   **/
  const curPagination: DomainPaginationType = useSelector(mSelector.makeAnimePaginationDataSelector())

  /**
   * onClick event handler for pagination click
   *
   *  - update pagination object of this domain in store
   *  - useEffect takes care of re-fetching
   *
   *  - use boolean local state (isPageUpdated) to avoid re-rendering twice
   *  - 
   **/
  const [isPageUpdated, setPageUpdated] = React.useState<boolean>(false)
  const handlePaginationClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {

    // prep next pagiantion
    const nextPagination: DomainPaginationType = {
      limit: curPagination.limit,
      offset: convertPageToOffset(curPagination.total, curPagination.limit, parseInt(e.currentTarget.value)),
      total: curPagination.total
    }

    // update state
    dispatch(updateAnimePaginationDataActions.update(nextPagination))

    setPageUpdated((prev: boolean) => !prev)
  }


  /**
   * initial anime fetch (only once)
   *
   *  - don't put pagination data into 2nd argument. => this cause fetch twice every time you change sort | filter | keyword
   *  
   **/
  React.useEffect(() => {
    dispatch(fetchAnimeActionCreator())
  }, [
      curSearchKeyword,
      JSON.stringify(curSort),
      isPageUpdated,
      curCategory.id,
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

  const handleAnimeDetailCloseClick: React.EventHandler<React.MouseEvent<SVGElement>> = (e) => {
    setAnimeDetailModalOpen(false)
  }

  const handleAnimeDetailBoxCloseEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {
    setAnimeDetailModalOpen(false)
  }

  /**
   * anime list item horizontal scroll
   **/
  // laptop & desktop: we need to use onWheel
  const curScrollPosXRef = React.useRef<number>(0)
  const curAnimeListRefs = React.useRef<HTMLDivElement[]>([]);
  const handleHorizontalWheelEvent: React.EventHandler<React.WheelEvent<HTMLDivElement>> = (e) => {
    // deltaY is used to determine wheel is up or down 
    // return "+" value when scroll down
    // return "-" value when scroll up 
    if (curAnimeListRefs.current.length === 0) return false

    console.log("max scroll: " + (e.currentTarget.scrollWidth - e.currentTarget.clientWidth))
    const maxWidth = - (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)

    if (e.deltaY > 0) {
      // scroll down
      console.log("scroll down")

      if (curScrollPosXRef.current <= maxWidth) return false

      curScrollPosXRef.current -= 50 

      console.log(curScrollPosXRef.current)

      for (let i = 0; i < curAnimeListRefs.current.length; i++) {
        console.log("running?")
        curAnimeListRefs.current[i].style.transform = `translate3d(${curScrollPosXRef.current}px, 0, 0)`
        curAnimeListRefs.current[i].style.transition = `transform 1s`
      }

    } else if (e.deltaY < 0) {
      // scroll up 
      console.log("scroll up")

      if (curScrollPosXRef.current >= 0) return false

      curScrollPosXRef.current += 50 

      console.log(curScrollPosXRef.current)

      for (let i = 0; i < curAnimeListRefs.current.length; i++) {
        console.log("running?")

        curAnimeListRefs.current[i].style.transform = `translate3d(${curScrollPosXRef.current}px, 0, 0)`
        curAnimeListRefs.current[i].style.transition = `transform 1s`
      }

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

    const maxWidth = - (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)

    // 2. decide the right/left swipe based on the curTouchStart and curTouchEnd
    if (curTouchEnd > curTouchStart.current) {
      // right swipe

      console.log("right swipe => show left item")

      if (curScrollPosXRef.current >= 0) return false

      curScrollPosXRef.current += 50 

      console.log(curScrollPosXRef.current)

      for (let i = 0; i < curAnimeListRefs.current.length; i++) {
        console.log("running?")

        curAnimeListRefs.current[i].style.transform = `translate3d(${curScrollPosXRef.current}px, 0, 0)`
        curAnimeListRefs.current[i].style.transition = `transform 1s`
      }

    } else if (curTouchEnd < curTouchStart.current) {
      // left swipe
      console.log("left swipe => show right item")

      if (curScrollPosXRef.current <= maxWidth) return false

      curScrollPosXRef.current -= 50 

      console.log(curScrollPosXRef.current)

      for (let i = 0; i < curAnimeListRefs.current.length; i++) {
        console.log("running?")
        curAnimeListRefs.current[i].style.transform = `translate3d(${curScrollPosXRef.current}px, 0, 0)`
        curAnimeListRefs.current[i].style.transition = `transform 1s`
      }
    }
  }, [
    ])

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
    setCategorySearchKeyword("")
    dispatch(clearAllSortAndFilterActionCreator())
  }

  /**
   * render anime components
   *
   **/
  const renderAnimeComponents: () => React.ReactNode = () => {
    return curAnimes.map((anime: AnimeType, index: number) => {
      return (
        <Anime key={anime.id} ref={(el) => curAnimeListRefs.current[index] = el}>
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
              <AnimeDetailBox>
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
              </AnimeDetailBox>
            </React.Fragment>
          )}
        </Anime>
      )
    })
  }

  return (
    <SearchBox>
      {/** left side bar: sort & filter **/}
      <SearchController 
        curCategorySearchKeyword={curCategorySearchKeyword} 
        setCategorySearchKeyword={setCategorySearchKeyword} 
      />
      {/** main: search result list with pagination **/}
      <SearchResultBox >
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
      </SearchResultBox>
      {(curPagination &&
        <Pagination
          limit={curPagination.limit}
          offset={curPagination.offset}
          total={curPagination.total}
          btnNum={5}
          onClick={handlePaginationClickEvent}
        />
      )}
      {(curSelectedAnime && responsive.isLTETablet &&
        <AnimeDetailBox open={isAnimeDetailModalOpen}>
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
        </AnimeDetailBox>
      )}
      <SwipeAnimation />
    </SearchBox>
  )
}

export default Search

