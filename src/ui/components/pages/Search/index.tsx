import Pagination from 'components/common/Pagination';
import { AnimeType } from 'domain/anime';
import { CategoryType } from 'domain/category';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { curCategoryActions, curSortActions, searchKeywordActions } from 'reducers/slices/app';
import { fetchAnimeActionCreator, updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { fetchCategoryActionCreator } from 'reducers/slices/domain/categories';
import { SortType } from 'src/app';
import { mSelector } from 'src/selectors/selector';
import { convertPageToOffset, toStringToDateToString } from 'src/utils';
import { DomainPaginationType } from 'states/types';
import styled from 'styled-components';
import AnimeDetailModal from 'components/common/AnimeDetailModal';
import { device, BaseInputStyle } from 'ui/css/base';
import { useResponsive } from 'hooks/responsive';
import SortI from 'components/common/icons/SortI';

const SearchBox = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #000;

  @media ${device.laptop} {
  }

`

const SearchControllerBox = styled.div`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  @media ${device.laptop} {
    flex: 0 0 15%;
  }
`

const SearchInputBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000; 
  position: relative; // need this to make z-index work;
  background-color: #000; // need this to make z-index work;

  padding: 5px;

  height: 50px;
`

const SearchInput = styled.input`
  ${BaseInputStyle}
`

const SearchResultBox = styled.div`

  padding-top: 85px; // space for header controller

  height: 100%;

  @media ${device.laptop} {
  }

`

const ItemList = styled.div`

  overflow: scroll;
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

const Anime = styled.div`

  // inline-flex: make the container inline, which means that the next element comes next horizontally. (not jump to next line)
  // flex: make the container block, which means that the next element comes next vertically.

  display: inline-block; //(image-vertical-align)
  cursor: pointer;
  margin: 10px 30px;
  height: 90%; //(image-vertical-align)

  position: relative;

`

// need this to center image vertically (image-vertical-align)
const AnimeImageHelper = styled.span`
  display: inline-block; //(image-vertical-align)
  height: 100%; //(image-vertical-align)
  vertical-align: middle; //(image-vertical-align)
`

const AnimeImage = styled.img`
  vertical-align: middle; //(image-vertical-align)
  max-height: 100%;
  max-width: auto;
`

const AnimeDetailBox = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  padding: 10px;

  word-break: break-all;
  white-space: normal;
  font-weight: bold;
`

const AnimeTitle = styled.h2`
  
`
const AnimeReleased = styled.p``

const AnimeAverageRating = styled.p``

const AnimeTrailerLink = styled.a`
  text-decoration: none;
  color: #fff;
`

const AnimeDescription = styled.p`
`

declare type AdditionalControllerBoxPropsType = {
  open: boolean
}


const AdditionalControllerBox = styled.div`

  background-color: #000;
  padding: 5px 0;
  
  @media ${device.lteTablet} {
    position: absolute;
    z-index: 900; 
    width: 100vw;
    text-align: center;

    ${(props: AdditionalControllerBoxPropsType) => {

    if (props.open) {
      return `
          visibility: visible; 
          transform: translateY(0%);
        `;
    } else {
      return `
          visibility: hidden;
          transform: translateY(-100%);
        `
    }
  }}
    transition: all 0.5s ease-in-out;
    padding: 5px 0 10px 0;
  }

  @media ${device.laptop} {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }

`


const CategoryFilterBox = styled.div``

const CategorySearchInputBox = styled.div`
  color: #fff;
`

const CategorySearchInput = styled.input`
 ${BaseInputStyle}
 text-align: center;
 font-size: 1em;
 
 @media ${device.lteTablet} {
  width: 90%;
 }

 @media ${device.laptop} {
 }
`

const CategorySearchResultBox = styled.div`
  position: relative; // for CategoryItem styling
  width: 90%;
  margin: 0 auto;
`

const CategorySearchInnerBox = styled.div`
  position: absolute;
  width: 100%;
  background-color: #000;
`
const CategoryFilterTile = styled.h3`
  @media ${device.laptop} {
    display: inline;
    margin: 0 8px 0 0;
  }
`


declare type CategoryItemPropsType = {
  active: boolean
}

const CategoryItem = styled.div`
  ${(props: CategoryItemPropsType) => (props.active) ? "background-color: #fff;" : "#000"}  
  ${(props: CategoryItemPropsType) => (props.active) ? "color: #000;" : "#fff"}  
`

const SortBox = styled.div`
  color: #fff;
`

const SortItemList = styled.div`
  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, 1fr); 
  }

  @media ${device.laptop} {
    display: inline-flex;
  }
`


declare type SortItemPropsType = {
  active: boolean
}
const SortItem = styled.div`
  background-color:${(props: SortItemPropsType) => (props.active) ? "#fff" : "#000"};
  color:${(props: SortItemPropsType) => (props.active) ? "#000" : "#fff"};
  padding: 5px;
  border: 1px solid #fff;
  width: 90%;
  margin: 0 auto;
  border-radius: 7px;

  @media ${device.mobileL} {
    width: 95%; 
  }

  @media ${device.laptop} {
    margin: 0 3px;
    border-radius: 0;
  }
`

const SortTitle = styled.h3`
  @media ${device.laptop} {
    display: inline;
    margin: 0 8px 0 0;
  }
`

const SortLabel = styled.label`
  display: block;
  width: 100%;
  white-space: nowrap;
  padding: 0 5px;
`

const Search: React.FunctionComponent<{}> = (props) => {

  // redux dispatcher
  const dispatch = useDispatch()

  // responsive
  const responsive = useResponsive()

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
   **/
  const handlePaginationClickEvent: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {

    // prep next pagiantion
    const nextPagination: DomainPaginationType = {
      limit: curPagination.limit,
      offset: convertPageToOffset(curPagination.total, curPagination.limit, parseInt(e.currentTarget.value)),
      total: curPagination.total
    }

    // update state
    dispatch(updateAnimePaginationDataActions.update(nextPagination))
  }

  /**
   * keyword search feature
   **/
  //const curSearchKeyword = useSelector(mSelector.makeSearchKeywordSelector())
  const handleSearchKeywordChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {

    // update keyword
    const nextKeyword: string = e.currentTarget.value
    dispatch(searchKeywordActions.update(nextKeyword))

    // cancel pagination
    dispatch(updateAnimePaginationDataActions.clear())
  }

  /**
   * category search feature
   **/
  const categorySearchInputRef = React.useRef<HTMLInputElement>(null)
  const curCategory = useSelector(mSelector.makeCurCategorySelector())
  const [curCategorySearchKeyword, setCategorySearchKeyword] = React.useState<string>("")
  const categories = useSelector(mSelector.makeCategoryWithFilterDataSelector(curCategorySearchKeyword))
  const handleCategorySearchChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    // filter category items and display those on the list
    setCategorySuggestionShow(true)
    const nextCategorySearchKeyword = e.currentTarget.value
    setCategorySearchKeyword(nextCategorySearchKeyword)
  }

  //const [curCategoryId, setCurCategoryId] = React.useState<number>(-1) // put default value (-1) to avoid 'calling toSTring() of undefined'
  const handleCategorySelectionClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {

    if (categorySearchInputRef.current) {
      const nextCurCategoryId: number = parseInt(e.currentTarget.getAttribute("data-value"))

      console.log(nextCurCategoryId)
      // search this category by id through 'categories'
      const nextCurCategory: CategoryType = categories.find((category: CategoryType) => category.id == nextCurCategoryId)

      // update category search input
      categorySearchInputRef.current.value = nextCurCategory.attributes.title

      console.log(nextCurCategory)

      // update curCategory (app state)
      dispatch(curCategoryActions.update(nextCurCategory))

      // update curCategoryId (local state)
      // setCurCategoryId(nextCurCategoryId)

      // cancel pagination
      dispatch(updateAnimePaginationDataActions.clear())

      setCategorySuggestionShow(false)
    }
  }

  const renderCategoryComponents: () => React.ReactNode = () => {
    return categories.map((category: CategoryType, index: number) => {
      return (
        <CategoryItem
          data-value={category.id}
          onClick={handleCategorySelectionClickEvent}
          active={(curSelectedCategorySuggestionItemIndex == index) ? true : false}
        /**ref={(el: any) => categorySuggestionListRef.current[index] = el}**/
        >
          {category.attributes.title}
        </CategoryItem>
      )
    })
  }

  // initial fetch categories (only once)
  React.useEffect(() => {
    dispatch(fetchCategoryActionCreator())
  }, [])

  /**
   * auto complete feature
   **/
  const [isCategorySuggestionShow, setCategorySuggestionShow] = React.useState<boolean>(false)
  const [curSelectedCategorySuggestionItemIndex, setSelectedCategorySuggestionItemIndex] = React.useState<number>(-1)
  const handleArrowKeyDownEvent: React.EventHandler<React.KeyboardEvent<HTMLInputElement>> = (e) => {

    // add boundary check of this categories array
    if (e.key == 'ArrowDown' && curSelectedCategorySuggestionItemIndex < (categories.length - 1)) {
      setSelectedCategorySuggestionItemIndex((prev: number) => ++prev)
    } else if (e.key == 'ArrowUp' && curSelectedCategorySuggestionItemIndex >= 0) {
      setSelectedCategorySuggestionItemIndex((prev: number) => --prev)
    } else if (e.key == 'Enter') {
      if (curSelectedCategorySuggestionItemIndex !== -1) {
        const nextCategorySearchKeyword = categories[curSelectedCategorySuggestionItemIndex].attributes.title
        const nextCurCategoryId = categories[curSelectedCategorySuggestionItemIndex].id
        e.currentTarget.value = nextCategorySearchKeyword
        setCategorySearchKeyword(nextCategorySearchKeyword)
        // search this category by id through 'categories'
        const nextCurCategory: CategoryType = categories.find((category: CategoryType) => category.id == nextCurCategoryId)

        console.log(nextCurCategory)

        // update curCategory (app state)
        dispatch(curCategoryActions.update(nextCurCategory))

        // update curCategoryId (local state)
        // setCurCategoryId(nextCurCategoryId)

        // cancel pagination
        dispatch(updateAnimePaginationDataActions.clear())

        setCategorySuggestionShow(false)
      }
    }
  }

  /**
   * sort feature
   **/
  const curSort = useSelector(mSelector.makeCurSortSelector())
  const sortList = useSelector(mSelector.makeSortListSelector())
  const handleSortItemChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {

    // get sort object by its id (e.currentTarget.value)
    const nextSort: SortType = sortList.find((sort: SortType) => sort.key === e.currentTarget.value)

    // dispatch to update it
    dispatch(curSortActions.update(nextSort))

    // cancel pagination
    dispatch(updateAnimePaginationDataActions.clear())
  }

  const renderSortItemComponents: () => React.ReactNode = () => {
    return sortList.map((sort: SortType) => {
      return (
        <SortItem active={(curSort) ? curSort.key.localeCompare(sort.key) === 0 : false}>
          <input
            type="radio"
            id={sort.key}
            value={sort.key}
            name="sort"
            style={{ display: "none" }}
            onChange={handleSortItemChangeEvent}
            checked={(curSort) ? curSort.key.localeCompare(sort.key) === 0 : false}
          />
          <SortLabel htmlFor={sort.key}>{sort.label}</SortLabel>
        </SortItem>
      )
    })
  }

  /**
   * initial anime fetch (only once)
   *  
   **/
  React.useEffect(() => {
    dispatch(fetchAnimeActionCreator())
  }, [
      // you don't need this (curSearchKeyword) when user change the query. 
      // we also update this pagination.
      //curSearchKeyword, 
      curPagination.limit,
      curPagination.offset,
      curPagination.total,
      curCategory.id,
    ])

  /**
   * detail modal feature
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

  /**
   * (mobile&tablet) anime search controller feature
   *
   *  - toggle category search & sort
   **/
  const [isAdditionalControllerOpen, setAdditionalControllerOpen] = React.useState<boolean>(false)
  const handleAdditionalControllerOpenIconClick: React.EventHandler<React.MouseEvent<SVGElement>> = (e) => {
    setAdditionalControllerOpen((prev: boolean) => !prev)
  }

  /**
   * anime list item horizontal scroll
   **/
  // laptop & desktop: we need to use onWheel
  const handleHorizontalWheelEvent: React.EventHandler<React.WheelEvent<HTMLDivElement>> = (e) => {
    // deltaY is used to determine wheel is up or down 
    // return "+" value when scroll down
    // return "-" value when scroll up 
    if (e.deltaY > 0) {
      // scroll down
      e.currentTarget.scrollBy({
        behavior: "smooth",
        left: 200,
      })
    } else {
      // scroll up
      e.currentTarget.scrollBy({
        behavior: "smooth",
        left: -200,
      })
    }
  }

  // mobile & tablet swipe
  const handleHorizontalScrollEvent: React.EventHandler<React.UIEvent<HTMLDivElement>> = (e) => {
    console.log("scrolled")
  }

  /**
   * render anime components
   *
   **/
  const renderAnimeComponents: () => React.ReactNode = () => {
    return curAnimes.map((anime: AnimeType) => {
      return (
        <Anime key={anime.id} data-anime-id={anime.id} onClick={handleAnimeClickEvent}>
          <AnimeImageHelper />
          {(responsive.isMobile &&
            <AnimeImage src={anime.attributes.posterImage.small} alt={`${anime.attributes.titles.en} post image`} />
          )}
          {(responsive.isTablet &&
            <AnimeImage src={anime.attributes.posterImage.medium} alt={`${anime.attributes.titles.en} post image`} />
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
                <AnimeTrailerLink href={`https://youtu.be/${anime.attributes.youtubeVideoId}`} target="_blank">
                  Watch The Trailer
                </AnimeTrailerLink>
                  
                <AnimeDescription>
                  {anime.attributes.description}
                </AnimeDescription>
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
      <SearchControllerBox>
        <SearchInputBox>
          <SearchInput type="text" placeholder="search any anime..." name="search-keyword" onChange={handleSearchKeywordChangeEvent} />
          {(responsive.isLTETablet &&
            <SortI color={"#fff"} onClick={handleAdditionalControllerOpenIconClick} />
          )}
        </SearchInputBox>
        <AdditionalControllerBox open={isAdditionalControllerOpen}>
          <CategoryFilterBox >
            <CategorySearchInputBox>
              <CategoryFilterTile>Category</CategoryFilterTile>
              <CategorySearchInput type="text" placeholder="search by category..." onChange={handleCategorySearchChangeEvent} onKeyDown={handleArrowKeyDownEvent} ref={categorySearchInputRef} />
              <CategorySearchResultBox >
                <CategorySearchInnerBox>
                  {isCategorySuggestionShow && categories && categories.length > 0 && renderCategoryComponents()}
                </CategorySearchInnerBox>
              </CategorySearchResultBox>
            </CategorySearchInputBox>
          </CategoryFilterBox>
          <SortBox>
            <SortTitle>Sort</SortTitle>
            <SortItemList>
              {renderSortItemComponents()}
            </SortItemList>
          </SortBox>
        </AdditionalControllerBox>
      </SearchControllerBox>
      {/** main: search result list with pagination **/}
      <SearchResultBox >
        <ItemList onScroll={handleHorizontalScrollEvent} onWheel={handleHorizontalWheelEvent}>
          {renderAnimeComponents()}
        </ItemList>
      </SearchResultBox>
      <Pagination
        limit={curPagination.limit}
        offset={curPagination.offset}
        total={curPagination.total}
        btnNum={5}
        onClick={handlePaginationClickEvent}
      />
      <AnimeDetailModal
        isOpen={isAnimeDetailModalOpen}
        anime={curSelectedAnime}
        onCloseClick={handleAnimeDetailCloseClick}
      />
    </SearchBox>
  )
}

export default Search

