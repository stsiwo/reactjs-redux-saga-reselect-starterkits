import * as React from 'react';
import { PageLinkType, PaginationPropsType } from './types';
import { convertOffsetToPage, calculateMaxPageNumber, generatePaginationLink } from 'src/utils';
import styled from 'styled-components';
import { device } from 'ui/css/base';

const PaginationBox = styled.div`

  width: 100vw;
  position: fixed;
  bottom: 0;
  padding: 5px;

  @media ${device.laptop} {
  }
`

const PaginationContent = styled.div`
  text-align: center;
`

declare type PaginationBtnPropsType = {
  active?: boolean
}

const PaginationBtn = styled.button`
  margin: 0 5px;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 3px 3px;
  font-size: 1.2em; 
  font-weight: bold;
  cursor: pointer;
  transition: all 1s;
  width: 30px;
  height: 30px;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #fff;
    color: #000;
    transition: all 1s;
  }

  ${(props: PaginationBtnPropsType) => {
    if (props.active) {
      return `
        background-color: #fff;
        color: #000;
      `
    }
  }}
`

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
        <PaginationBtn 
          active={curPage == page.num}
          value={page.num} 
          key={page.num} 
          onClick={props.onClick}
        >
            {page.num}
        </PaginationBtn>
      )
    })
  }

  return (pageLinks && pageLinks.length > 0 &&
    <PaginationBox>
      <PaginationContent>
        <PaginationBtn value={1} key={1} onClick={props.onClick}>&laquo;</PaginationBtn>
        {renderPagination()}
        <PaginationBtn value={maxPage} key={maxPage} onClick={props.onClick}>&raquo;</PaginationBtn>
      </PaginationContent>
    </PaginationBox>
  );
}

export default Pagination 
