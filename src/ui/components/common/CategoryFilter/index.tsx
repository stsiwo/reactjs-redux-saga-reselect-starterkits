import { CategoryType } from 'domain/category';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { curCategoryActions } from 'reducers/slices/app';
import { updateAnimePaginationDataActions } from 'reducers/slices/domain/anime';
import { fetchCategoryActionCreator } from 'reducers/slices/domain/categories';
import { mSelector } from 'src/selectors/selector';
import styled from 'styled-components';
import { BaseInputStyle, device } from 'ui/css/base';
import CloseI from '../icons/CloseI';

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


export declare type CategoryFilterPropsType = {
  className?: string
}

const CategoryFilter: React.FunctionComponent<CategoryFilterPropsType> = ({
  className
}) => {
  // redux dispatcher
  const dispatch = useDispatch()
  
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

  return (
    <div className={className}>
      <CategorySearchInputBox>
        <CategoryFilterTile>Category</CategoryFilterTile>
        <CategorySearchInput
          type="text"
          placeholder="search by category..."
          value={curCategorySearchKeyword}
          onChange={handleCategorySearchChangeEvent}
          onKeyDown={handleArrowKeyDownEvent}
          ref={categorySearchInputRef} />
        <CategoryResetIcon onClick={handleCategoryResetIconClick} />
        <CategorySearchResultBox >
          <CategorySearchInnerBox>
            {isCategorySuggestionShow && categories && categories.length > 0 && renderCategoryComponents()}
          </CategorySearchInnerBox>
        </CategorySearchResultBox>
      </CategorySearchInputBox>
    </div>
  )

}

export default styled(CategoryFilter)``

