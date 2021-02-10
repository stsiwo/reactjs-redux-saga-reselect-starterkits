import { combineReducers } from 'redux'
import { leftNavMenuSliceReducer, rightNavMenuSliceReducer, searchModalSliceReducer } from './slices/ui';
//import { blogDataSliceReducer } from './slices/domain/blogs';
//import { tagDataSliceReducer } from './slices/domain/tags';
//import { categoryDataSliceReducer } from './slices/domain/categories';
import { searchKeywordSliceReducer, fetchStatusSliceReducer, curCategorySliceReducer, categoryFetchStatusSliceReducer, curSortSliceReducer, sortListSliceReducer } from './slices/app';
import { updateAnimeDataSliceReducer, updateAnimePaginationDataSliceReducer, updateAnimeCurItemsDataSliceReducer } from './slices/domain/anime';
import { categoryDataSliceReducer } from './slices/domain/categories';

// ** REFACTOR to new approach **/

/**
 * new rootReducer
 **/
export const rootReducer = combineReducers({

  ui: combineReducers({
    leftNavMenu: leftNavMenuSliceReducer,
    rightNavMenu: rightNavMenuSliceReducer,
    searchModal: searchModalSliceReducer,
  }),

  app: combineReducers({
    searchKeyword: searchKeywordSliceReducer,
    fetchStatus: fetchStatusSliceReducer,
    categoryFetchStatus: categoryFetchStatusSliceReducer,
    curCategory: curCategorySliceReducer,
    curSort: curSortSliceReducer,
    sortList: sortListSliceReducer,
  }),

  domain: combineReducers({
    animes: combineReducers({
      data: updateAnimeDataSliceReducer, // naming wierd. just remove 'update' when #REFACTOR
      pagination: updateAnimePaginationDataSliceReducer, // naming wierd. just remove 'update' when #REFACTOR
      curItems: updateAnimeCurItemsDataSliceReducer, // naming wierd. just remove 'update' when #REFACTOR
    }),
    categories: categoryDataSliceReducer,
  })
})

