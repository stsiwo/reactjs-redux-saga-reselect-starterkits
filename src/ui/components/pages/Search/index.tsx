import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeActionCreator, updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { mSelector } from 'src/selectors/selector';
import { AnimeType } from 'domain/anime';
import { DomainPaginationType } from 'states/types';
import Pagination from 'components/common/Pagination';
import { convertPageToOffset } from 'src/utils';
import { searchKeywordActions, curCategoryActions, curSortActions } from 'reducers/slices/app';
import { CategoryType } from 'domain/category';
import { fetchCategoryActionCreator } from 'reducers/slices/domain/categories';
import { SortType } from 'src/app';

const SearchBox = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`

const SearchControllerBox = styled.div`
  flex: 0 0 15%;
  background-color: yellow;
`

const SearchResultBox = styled.div`
  background-color: aqua;

`

const Anime = styled.a`
  width: 500px;
  height: 400px;

  flex: 0 0 200px;
`
const ItemList = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const CategoryFilterBox = styled.div``

const CategorySearchInputBox = styled.div``

const CategorySearchResultBox = styled.div`
  position: relative; // for CategoryItem styling
`

const CategorySearchInnerBox = styled.div`
  position: absolute;
`

declare type CategoryItemPropsType = {
  active: boolean
}

const CategoryItem = styled.div`
  background-color: #fff; 
  ${(props: CategoryItemPropsType) => (props.active) ? "background-color: red;" : ""}  
`

const SortBox = styled.div``

declare type SortItemPropsType = {
  active: boolean
}
const SortItem = styled.div`
  ${(props: SortItemPropsType) => (props.active) ? "background-color: red;" : ""}
`

const Search: React.FunctionComponent<{}> = (props) => {

  const dispatch = useDispatch()

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
          <label htmlFor={sort.key}>{sort.label}</label>
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
   * render anime components
   *
   **/
  const renderAnimeComponents: () => React.ReactNode = () => {
    return curAnimes.map((anime: AnimeType) => {
      return (
        <Anime key={anime.id}>
          <h2>{anime.attributes.titles.en}</h2>
          <img src={anime.attributes.posterImage.tiny} alt={`${anime.attributes.titles.en} post image`} />
        </Anime>
      )
    })
  }

  return (
    <SearchBox>
      {/** left side bar: sort & filter **/}
      <SearchControllerBox>
        <div>
          <label htmlFor="search-keyword">Search</label>
          <input type="text" placeholder="any keyword here..." name="search-keyword" onChange={handleSearchKeywordChangeEvent} />
        </div>
        <CategoryFilterBox>
          <CategorySearchInputBox>
            <input type="text" placeholder="filter your category here..." onChange={handleCategorySearchChangeEvent} onKeyDown={handleArrowKeyDownEvent} ref={categorySearchInputRef} />
          </CategorySearchInputBox>
          <CategorySearchResultBox >
            <CategorySearchInnerBox>
              {isCategorySuggestionShow && categories && categories.length > 0 && renderCategoryComponents()}
            </CategorySearchInnerBox>
          </CategorySearchResultBox>
        </CategoryFilterBox>
        <SortBox>
          <h3>Sort</h3>
          {renderSortItemComponents()}
        </SortBox>
      </SearchControllerBox>
      {/** main: search result list with pagination **/}
      <SearchResultBox>
        <ItemList>
          {renderAnimeComponents()}
        </ItemList>
        <Pagination
          limit={curPagination.limit}
          offset={curPagination.offset}
          total={curPagination.total}
          btnNum={5}
          onClick={handlePaginationClickEvent}
        />
      </SearchResultBox>
    </SearchBox>
  )
}

export default Search

