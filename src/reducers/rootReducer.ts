import { combineReducers } from 'redux'
import { leftNavMenuSliceReducer, rightNavMenuSliceReducer, searchModalSliceReducer } from './slices/ui';
//import { blogDataSliceReducer } from './slices/domain/blogs';
//import { tagDataSliceReducer } from './slices/domain/tags';
//import { categoryDataSliceReducer } from './slices/domain/categories';
import { searchKeywordSliceReducer } from './slices/app';

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
  }),

  domain: combineReducers({
    //    blogs: blogDataSliceReducer,
    //    tags: tagDataSliceReducer,
    //    categories: categoryDataSliceReducer,
  })
})

