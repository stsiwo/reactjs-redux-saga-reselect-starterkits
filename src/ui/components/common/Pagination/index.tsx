import * as React from 'react';
import "./style.scss"
import { PageLinkType, PaginationPropsType } from './types';

const Pagination: React.FunctionComponent<PaginationPropsType> = (props) => {

  /**
   * better use icon for << and >>
   **/
  const renderPagination: () => React.ReactNode = () => {
    return props.pageLinks.map((page: PageLinkType) => {
      return (
        <button 
          className={ props.curPage == page.num ? "pagination-btn pagination-btn-selected" : "pagination-btn" }
          value={page.num} 
          key={page.num} 
          onClick={props.onClick}
        >
            {page.num}
        </button>
      )
    })
  }

  return (props.pageLinks && props.pageLinks.length > 0 &&
    <div className="pagination-wrapper" >
      <div className="pagination-content" >
        <button className="pagination-btn" value={1} key={1} onClick={props.onClick}>&laquo;</button>
        {renderPagination()}
        <button className="pagination-btn" value={props.maxPage} key={props.maxPage} onClick={props.onClick}>&raquo;</button>
      </div>
    </div>
  );
}

export default Pagination;
