import * as React from 'react';
import "./style.scss"
import { PageLinkType, PaginationPropsType } from './types';
import { convertOffsetToPage, calculateMaxPageNumber, generatePaginationLink } from 'src/utils';

const Pagination: React.FunctionComponent<PaginationPropsType> = (props) => {

  const curPage = convertOffsetToPage(props.total, props.limit, props.offset)

  const maxPage = calculateMaxPageNumber(props.total, props.limit)

  const pageLinks = generatePaginationLink(props.total, props.limit, curPage, props.btnNum)

  /**
   * better use icon for << and >>
   **/
  const renderPagination: () => React.ReactNode = () => {
    return pageLinks.map((page: PageLinkType) => {
      return (
        <button 
          className={ curPage == page.num ? "pagination-btn pagination-btn-selected" : "pagination-btn" }
          value={page.num} 
          key={page.num} 
          onClick={props.onClick}
        >
            {page.num}
        </button>
      )
    })
  }

  return (pageLinks && pageLinks.length > 0 &&
    <div className="pagination-wrapper" >
      <div className="pagination-content" >
        <button className="pagination-btn" value={1} key={1} onClick={props.onClick}>&laquo;</button>
        {renderPagination()}
        <button className="pagination-btn" value={maxPage} key={maxPage} onClick={props.onClick}>&raquo;</button>
      </div>
    </div>
  );
}

export default Pagination;
