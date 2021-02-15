import { useOutsideClick } from 'hooks/outsideClick';
import { useResponsive } from 'hooks/responsive';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { curSortActions, searchKeywordActions } from 'reducers/slices/app';
import { updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { SortType } from 'src/app';
import { mSelector } from 'src/selectors/selector';
import styled from 'styled-components';
import { BaseInputBtnStyle, BaseInputStyle, device } from 'ui/css/base';
import CategoryFilter from '../CategoryFilter';
import SortI from '../icons/SortI';

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

const AdditionalControllerCloseBtn = styled.input`
  ${BaseInputBtnStyle}
  font-weight: bold;
  font-size: 1em;
  border: 1px solid #fff;
  padding: 7px;
  box-shadow: 0px 1px 3px 0px #fff;
  margin: 30px 5px;
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
  cursor: pointer;
`

export declare type SearchControllerPropsType = {
  className?: string
}

const SearchController: React.FunctionComponent<SearchControllerPropsType> = ({ 
  className,
}) => {

  // redux dispatcher
  const dispatch = useDispatch()
  
  // responsive
  const responsive = useResponsive()

  /**
   * keyword search feature
   **/
  const curSearchKeyword = useSelector(mSelector.makeSearchKeywordSelector())
  const handleSearchKeywordChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {

    // update keyword
    const nextKeyword: string = e.currentTarget.value
    dispatch(searchKeywordActions.update(nextKeyword))

    // cancel pagination
    dispatch(updateAnimePaginationDataActions.clear())

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
        <SortItem active={(curSort) ? curSort.key.localeCompare(sort.key) === 0 : false} key={sort.key}>
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
   * (mobile&tablet) anime search controller feature
   *
   *  - toggle category search & sort
   **/
  const [isAdditionalControllerOpen, setAdditionalControllerOpen] = React.useState<boolean>(false)
  const additionalControllerRef = React.useRef<HTMLDivElement>(null)
  const handleAdditionalControllerOpenIconClick: React.EventHandler<React.MouseEvent<SVGElement>> = (e) => {
    setAdditionalControllerOpen((prev: boolean) => !prev)
  }
  const handleAdditionalControllerCloseBtnClick: React.EventHandler<React.MouseEvent<HTMLInputElement>> = (e) => {
    setAdditionalControllerOpen(false);
  }
  // close this when users click outside
  useOutsideClick({
    callback: () => setAdditionalControllerOpen(false),
    ref: additionalControllerRef,
  })


  return (
      <div className={className}>
        <SearchInputBox>
          <SearchInput type="text" placeholder="search any anime..." name="search-keyword" value={curSearchKeyword} onChange={handleSearchKeywordChangeEvent} />
          {(responsive.isLTETablet &&
            <SortI color={"#fff"} onClick={handleAdditionalControllerOpenIconClick} />
          )}
        </SearchInputBox>
        <AdditionalControllerBox open={isAdditionalControllerOpen} ref={additionalControllerRef}>
          <CategoryFilter />
          <SortBox>
            <SortTitle>Sort</SortTitle>
            <SortItemList>
              {renderSortItemComponents()}
            </SortItemList>
          </SortBox>
          {(responsive.isLTETablet &&
            <AdditionalControllerCloseBtn type="button" value="Close" onClick={handleAdditionalControllerCloseBtnClick} />
          )}
        </AdditionalControllerBox>
      </div>
  )
}

export default styled(SearchController)`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  @media ${device.laptop} {
    flex: 0 0 15%;
  }
  z-index: 1000;
`


