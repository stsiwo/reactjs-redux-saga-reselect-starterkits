import { combineReducers } from 'redux';
import { categoryFetchStatusSliceReducer, curCategorySearchKeywordSliceReducer, curCategorySliceReducer, curSortSliceReducer, fetchStatusSliceReducer, requestTrackerSliceReducer, searchKeywordSliceReducer, sortListSliceReducer } from './slices/app';
import { updateAnimeCurItemsDataSliceReducer, updateAnimeDataSliceReducer, updateAnimePaginationDataSliceReducer } from './slices/domain/anime';
import { categoryDataSliceReducer } from './slices/domain/categories';
import { leftNavMenuSliceReducer, rightNavMenuSliceReducer, searchModalSliceReducer } from './slices/ui';

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
    curCategorySearchKeyword: curCategorySearchKeywordSliceReducer,
    curSort: curSortSliceReducer,
    sortList: sortListSliceReducer,
    requestTracker: requestTrackerSliceReducer,
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

