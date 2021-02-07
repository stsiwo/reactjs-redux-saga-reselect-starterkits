import * as React from 'react';

const Search: React.FunctionComponent<{}> = (props) => {

  return (
    <div className="search-wrapper">
      {/** left side bar: sort & filter **/} 
      <div className="search-controller-box">
      </div>
      {/** main: search result list with pagination **/} 
      <div className="search-result-box">
      </div>
    </div>
  )
}

export default Search

