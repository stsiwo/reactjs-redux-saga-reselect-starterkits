import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import { useDispatch } from 'react-redux';
import { fetchAnimeActionCreator } from 'reducers/slices/domain/anime';

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

const Search: React.FunctionComponent<{}> = (props) => {

  const dispatch = useDispatch()

  React.useEffect(() => {

    dispatch(fetchAnimeActionCreator())

  }, [])

  return (
    <SearchBox>
      {/** left side bar: sort & filter **/}
      <SearchControllerBox>
        <div>
          <label htmlFor="search-keyword">Search</label>
          <input type="text" placeholder="any keyword here..." name="search-keyword"/>
        </div>
        <div>
          <label htmlFor="filters">Filters</label>
          <input type="radio" value="1" name="filter" /> Opt 1
          <input type="radio" value="2" name="filter" /> Opt 2
          <input type="radio" value="3" name="filter" /> Opt 3
        </div>
      </SearchControllerBox>
      {/** main: search result list with pagination **/}
      <SearchResultBox>
        
      </SearchResultBox>
    </SearchBox>
  )
}





export default Search

