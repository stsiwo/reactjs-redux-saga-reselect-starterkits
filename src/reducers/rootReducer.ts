import { combineReducers } from 'redux'
import { leftNavMenuSliceReducer, rightNavMenuSliceReducer, searchModalSliceReducer } from './slices/ui';
//import { blogDataSliceReducer } from './slices/domain/blogs';
//import { tagDataSliceReducer } from './slices/domain/tags';
//import { categoryDataSliceReducer } from './slices/domain/categories';
import { searchKeywordSliceReducer, fetchStatusSliceReducer } from './slices/app';
import { updateAnimeDataSliceReducer } from './slices/domain/anime';

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
  }),

  domain: combineReducers({
    animes: updateAnimeDataSliceReducer,
    //    tags: tagDataSliceReducer,
    //    categories: categoryDataSliceReducer,
  })
})

