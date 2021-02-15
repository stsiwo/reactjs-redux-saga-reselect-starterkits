import * as React from 'react';
import styled from 'styled-components';
import { device, BaseInputStyle, BaseInputBtnStyle } from 'ui/css/base';
import CloseI from '../icons/CloseI';
import { useSelector, useDispatch } from 'react-redux';
import { mSelector } from 'src/selectors/selector';
import { searchKeywordActions, curCategoryActions, curSortActions } from 'reducers/slices/app';
import { updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { CategoryType } from 'domain/category';
import { fetchCategoryActionCreator } from 'reducers/slices/domain/categories';
import { SortType } from 'src/app';
import { useResponsive } from 'hooks/responsive';
import { useOutsideClick } from 'hooks/outsideClick';
import SortI from '../icons/SortI';

const SearchControllerBox = styled.div`
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

const CategoryResetIcon = styled(CloseI)`
  width: 25px;
  height: 25px;
  vertical-align: middle;
  cursor: pointer;

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
  background-color: ${(props: CategoryItemPropsType) => (props.active) ? "#000" : "#fff"};
  color: ${(props: CategoryItemPropsType) => (props.active) ? "#fff" : "#000"};  

  padding: 5px;
  border: 1px solid #000;
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

export declare type SearchControllerPropsType = {
  curCategorySearchKeyword: string,
  setCategorySearchKeyword: React.Dispatch<React.SetStateAction<string>>
}
const SearchController: React.FunctionComponent<SearchControllerPropsType> = ({ 
  curCategorySearchKeyword,
  setCategorySearchKeyword
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
   * category search feature
   **/
  const categorySearchInputRef = React.useRef<HTMLInputElement>(null)
  const curCategory = useSelector(mSelector.makeCurCategorySelector())
  const categories = useSelector(mSelector.makeCategoryWithFilterDataSelector(curCategorySearchKeyword))
  const handleCategorySearchChangeEvent: React.EventHandler<React.ChangeEvent<HTMLInputElement>> = (e) => {
    // filter category items and display those on the list
    setCategorySuggestionShow(true)
    const nextCategorySearchKeyword = e.currentTarget.value
    setCategorySearchKeyword(nextCategorySearchKeyword)
  }

  // reset category selection
  const handleCategoryResetIconClick: React.EventHandler<React.MouseEvent<SVGElement>> = (e) => {
    setCategorySearchKeyword("")
    dispatch(curCategoryActions.clear())
  }

  //const [curCategoryId, setCurCategoryId] = React.useState<number>(-1) // put default value (-1) to avoid 'calling toSTring() of undefined'
  const handleCategorySelectionClickEvent: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {

    if (categorySearchInputRef.current) {
      const nextCurCategoryId: number = parseInt(e.currentTarget.getAttribute("data-value"))

      console.log(nextCurCategoryId)
      // search this category by id through 'categories'
      const nextCurCategory: CategoryType = categories.find((category: CategoryType) => category.id == nextCurCategoryId)

      // set current category search text (local state)
      setCategorySearchKeyword(nextCurCategory.attributes.title)

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
          key={category.id}
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
      <SearchControllerBox>
        <SearchInputBox>
          <SearchInput type="text" placeholder="search any anime..." name="search-keyword" value={curSearchKeyword} onChange={handleSearchKeywordChangeEvent} />
          {(responsive.isLTETablet &&
            <SortI color={"#fff"} onClick={handleAdditionalControllerOpenIconClick} />
          )}
        </SearchInputBox>
        <AdditionalControllerBox open={isAdditionalControllerOpen} ref={additionalControllerRef}>
          <CategoryFilterBox >
            <CategorySearchInputBox>
              <CategoryFilterTile>Category</CategoryFilterTile>
              <CategorySearchInput
                type="text"
                placeholder="search by category..."
                value={curCategorySearchKeyword}
                onChange={handleCategorySearchChangeEvent}
                onKeyDown={handleArrowKeyDownEvent}
                ref={categorySearchInputRef} />
              <CategoryResetIcon onClick={handleCategoryResetIconClick}/>
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
          {(responsive.isLTETablet &&
            <AdditionalControllerCloseBtn type="button" value="Close" onClick={handleAdditionalControllerCloseBtnClick} />
          )}
        </AdditionalControllerBox>
      </SearchControllerBox>
  )
}

export default SearchController 


