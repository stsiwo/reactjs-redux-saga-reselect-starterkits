import { createSelector } from "@reduxjs/toolkit";
import { AnimeType } from "domain/anime";
import { CategoryType } from "domain/category";
import { denormalize } from "normalizr";
import { animeSchemaArray } from "states/state";
import { StateType } from "states/types";

export const rsSelector = {
  /**
 * selector function to retrieve data from redux store
 **/

  /**
   * check this: https://redux-toolkit.js.org/api/createEntityAdapter
   **/

  /**
   *
   * low level (pure) selector is always run (different from reselect) (no cache)
   *
   **/

  ui: {
    getLeftNavMenu: (state: StateType) => state.ui.leftNavMenu,
    getRightNavMenu: (state: StateType) => state.ui.rightNavMenu,
    getSearchModal: (state: StateType) => state.ui.searchModal,
  },

  app: {
    getSearchKeyword: (state: StateType) => state.app.searchKeyword,
    getFetchStatus: (state: StateType) => state.app.fetchStatus,
    getCurCategory: (state: StateType) => state.app.curCategory,
    getCurCategorySearchKeyword: (state: StateType) => state.app.curCategorySearchKeyword,
    getCurSort: (state: StateType) => state.app.curSort,
    getSortList: (state: StateType) => state.app.sortList,
    getRequestTracker: (state: StateType) => state.app.requestTracker,
  },

  domain: {
    getDomain: (state: StateType) => state.domain,
    getAnimeData: (state: StateType) => state.domain.animes.data,
    getAnimePaginationData: (state: StateType) => state.domain.animes.pagination,
    getAnimeCurItemsData: (state: StateType) => state.domain.animes.curItems,
    getCategoryData: (state: StateType) => state.domain.categories,
  }
}

/**
 * memorized selector note:
 *
 * it has cache (size 1) capability. so if its particular portion of state tree hasn't change, it returns cached value.
 *
 * However, if multiple component instances use the same memorized selector instance, you CAN'T use this cache features. since the memorized selector recognized that revieved arguments are different every time when it is called.
 *
 * Therefore, you have to give a copy of momerized selector to each component instance. (I'm not sure it is true when using redux-saga though)
 *
 **/

export const mSelector = {

  // ui.leftNavMenu
  makeLeftNavMenuSelector: () => {
    return createSelector(
      [
        rsSelector.ui.getLeftNavMenu
      ],
      (leftNavMenu) => {
        return leftNavMenu
      },
    )
  },

  // ui.rightNavMenu
  makeRightNavMenuSelector: () => {
    return createSelector(
      [
        rsSelector.ui.getRightNavMenu
      ],
      (rightNavMenu) => {
        return rightNavMenu
      },
    )
  },

  // ui.searchModal
  makeSearchModalSelector: () => {
    return createSelector(
      [
        rsSelector.ui.getSearchModal
      ],
      (searchModal) => {
        return searchModal
      },
    )
  },

  // app.searchKeyword
  makeSearchKeywordSelector: () => {
    return createSelector(
      [
        rsSelector.app.getSearchKeyword
      ],
      (keyword) => {
        return keyword
      },
    )
  },

  // app.fetchStatus
  makeFetchStatusSelector: () => {
    return createSelector(
      [
        rsSelector.app.getFetchStatus
      ],
      (fetchStatus) => {
        return fetchStatus
      },
    )
  },

  // app.curCategory
  makeCurCategorySelector: () => {
    return createSelector(
      [
        rsSelector.app.getCurCategory
      ],
      (curCategory) => {
        return curCategory
      },
    )
  },
  
  // app.curCategorySearchKeyword
  makeCurCategorySearchKeywordSelector: () => {
    return createSelector(
      [
        rsSelector.app.getCurCategorySearchKeyword
      ],
      (curCategorySearchKeyword) => {
        return curCategorySearchKeyword
      },
    )
  },

  // app.curSort
  makeCurSortSelector: () => {
    return createSelector(
      [
        rsSelector.app.getCurSort
      ],
      (curSort) => {
        return curSort
      },
    )
  },

  // app.sortList
  makeSortListSelector: () => {
    return createSelector(
      [
        rsSelector.app.getSortList
      ],
      (sortList) => {
        return sortList
      },
    )
  },

  // app.requestTracker
  makeRequestTrackerSelector: () => {
    return createSelector(
      [
        rsSelector.app.getRequestTracker
      ],
      (requestTracker) => {
        return requestTracker
      },
    )
  },

  // domain.animes
  makeAnimeDataSelector: () => {
    return createSelector(
      [
        // need to be domain to denormalize
        rsSelector.domain.getAnimeData,
        rsSelector.domain.getAnimePaginationData,
        rsSelector.domain.getAnimeCurItemsData,
      ],
      (animes, pagination, curItems) => {

        /**
         * return empty array before fetch
         **/
        if (Object.keys(animes).length === 0) {
          return []
        }

        /**
         * denormalize 
         *
         * this return { 'domain-name': [{ domain1 }, { domain2 }] in the format
         **/
        const denormalizedEntity = denormalize(
          Object.keys(animes), // ex, [0, 1, 2, 3, 4] ('result' prop of normalized data)
          animeSchemaArray,
          {
            animes: animes
          }, // entities prop of normalized data (ex, { animes: { "1": { ... }, "2": { ... }, ... }})
        )

        /**
         * filter items with paginaiton
         *
         *  - RE-IMPLEMENTATION REQUIRED:
         *    - if a user skip the some pages, for example, when the user click page # 4 after initial fetch, this logic does not work. especially, return empty array since the elements based on the index range does not exist.
         *    - solution: use 'result' prop of normalizr:)
         *
         *    
         *
         **/
        const filteredDenormalizedEntity = denormalizedEntity.filter((anime: AnimeType) => curItems.includes(anime.id) ? true : false)

        return filteredDenormalizedEntity
      },
    )
  },

  // domain.animes
  makeAnimePaginationDataSelector: () => {
    return createSelector(
      [
        // need to be domain to denormalize
        rsSelector.domain.getAnimePaginationData
      ],
      (pagination) => {
        return pagination
      },
    )
  },

  // domain.categories
  makeCategoryWithFilterDataSelector: (categoryKeyword: string) => {
    return createSelector(
      [
        // need to be domain to denormalize
        rsSelector.domain.getCategoryData,
      ],
      (categories) => {

        /**
         * if empty, return empty array to prevent display all categories at initial loading
         **/
        if (!categoryKeyword) {
          return []
        }
        
        const filteredCategories = categories
          .filter((category: CategoryType) => {
            /**
             *
             * use String.indexOf(substring) instead of String.includes for older browsers and IE
             *
             * use String.prototype.indexOf, which returns -1 when a substring cannot be found
             *
             * case insensitive
             *
             * only return max 5 items
             *
             **/
            if (
              category.attributes.title.toUpperCase().indexOf(categoryKeyword.toUpperCase()) !== -1
              //|| category.attributes.description.indexOf(categoryKeyword) !== -1
            ) {
              return true
            } else {
              return false
            }
          }).slice(0, 5)

        return filteredCategories
      },
    )
  },
}

