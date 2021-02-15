import Pagination from 'components/common/Pagination';
import SearchController from 'components/common/SearchController';
import SearchResult from 'components/common/SearchResult';
import SwipeAnimation from 'components/common/SwipeAnimation';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeActionCreator, updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { mSelector } from 'src/selectors/selector';
import { convertPageToOffset } from 'src/utils';
import { DomainPaginationType } from 'states/types';
import styled from 'styled-components';
import { device } from 'ui/css/base';

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

const Search: React.FunctionComponent<{}> = (props) => {

  // redux dispatcher
  const dispatch = useDispatch()

  // common redux states 
  //   - required by useEffect for fetching
  const curSort = useSelector(mSelector.makeCurSortSelector())
  const curSearchKeyword = useSelector(mSelector.makeSearchKeywordSelector())
  const curCategory = useSelector(mSelector.makeCurCategorySelector())

  // category search keyword
  //   - put this in parent since it is required by useEffect for fetching
  const [curCategorySearchKeyword, setCategorySearchKeyword] = React.useState<string>(curCategory.attributes.title)

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
   *    - this is because pagination need to be updated during fetching worker (redux-saga)
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
   * anime list item horizontal scroll
   **/
  return (
    <SearchBox>
      {/** left side bar: sort & filter **/}
      <SearchController 
        curCategorySearchKeyword={curCategorySearchKeyword} 
        setCategorySearchKeyword={setCategorySearchKeyword} 
      />
      {/** main: search result list **/}
      <SearchResult 
        curCategorySearchKeyword={curCategorySearchKeyword} 
        setCategorySearchKeyword={setCategorySearchKeyword} 
      />
      {/** pagination **/}
      {(curPagination &&
        <Pagination
          limit={curPagination.limit}
          offset={curPagination.offset}
          total={curPagination.total}
          btnNum={5}
          onClick={handlePaginationClickEvent}
        />
      )}
      <SwipeAnimation />
    </SearchBox>
  )
}

export default Search

