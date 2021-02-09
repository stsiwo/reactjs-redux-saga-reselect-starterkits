import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeActionCreator, updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { mSelector } from 'src/selectors/selector';
import { AnimeType } from 'domain/anime';
import { DomainPaginationType } from 'states/types';
import Pagination from 'components/common/Pagination';
import { convertPageToOffset } from 'src/utils';
import { searchKeywordActions, curCategoryActions } from 'reducers/slices/app';
import { CategoryType } from 'domain/category';
import { fetchCategoryActionCreator } from 'reducers/slices/domain/categories';

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

const CategorySearchResultBox = styled.select``

const CategoryItem = styled.option``


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
  const curCategory = useSelector(mSelector.makeCurCategorySelector())
  const [curCategorySearchKeyword, setCategorySearchKeyword] = React.useState<string>("")
  const categories = useSelector(mSelector.makeCategoryWithFilterDataSelector(curCategorySearchKeyword))
  const handleCategorySearchChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    // filter category items and display those on the list
    const nextCategorySearchKeyword = e.currentTarget.value
    setCategorySearchKeyword(nextCategorySearchKeyword)
  }

  const [curCategoryId, setCurCategoryId] = React.useState<number>(-1) // put default value (-1) to avoid 'calling toSTring() of undefined'
  const handleCategorySelectChangeEvent: React.EventHandler<React.ChangeEvent<HTMLSelectElement>> = (e) => {
    console.log("select option changed")
    const nextCurCategoryId: number = parseInt(e.currentTarget.value)

    console.log(nextCurCategoryId)

    // search this category by id through 'categories'
    const nextCurCategory: CategoryType = categories.find((category: CategoryType) => category.id == nextCurCategoryId)

    console.log(nextCurCategory)

    // update curCategory (app state)
    dispatch(curCategoryActions.update(nextCurCategory))

    // update curCategoryId (local state)
    setCurCategoryId(nextCurCategoryId)
    
    // cancel pagination
    dispatch(updateAnimePaginationDataActions.clear())
  }

  const renderCategoryComponents: () => React.ReactNode = () => {
    return categories.map((category: CategoryType) => {
      return (
        <CategoryItem value={category.id}>
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
   * initial anime fetch (only once)
   *  
   **/
  React.useEffect(() => {
    dispatch(fetchAnimeActionCreator())
  }, [
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
          <input type="text" placeholder="any keyword here..." name="search-keyword" onChange={handleSearchKeywordChangeEvent}/>
        </div>
        <CategoryFilterBox>
          <CategorySearchInputBox>
            <input type="text" placeholder="filter your category here..." onChange={handleCategorySearchChangeEvent}/>
          </CategorySearchInputBox>
          <CategorySearchResultBox onChange={handleCategorySelectChangeEvent} value={curCategoryId.toString()}>
            {categories && categories.length > 0 && renderCategoryComponents()} 
          </CategorySearchResultBox>
        </CategoryFilterBox>
        <div>
          <label htmlFor="filters">Filters</label>
          <input type="radio" value="1" name="filter" /> Opt 1
          <input type="radio" value="2" name="filter" /> Opt 2
          <input type="radio" value="3" name="filter" /> Opt 3
        </div>
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

