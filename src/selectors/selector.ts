import { StateType } from "states/types";
import { createSelector } from "@reduxjs/toolkit";
//import { BlogType } from "domain/blog";
import { getLatestDate, calculateMaxPageNumber, generatePaginationLink } from "src/utils";
import { denormalize } from "normalizr";
//import { TagType } from "domain/tag";
import { PaginationType, PageLinkType } from "components/common/Pagination/types";
import { PaginationSelectorType } from "src/selectors/types";
import { animeSchemaArray } from "states/state";
import isEmpty from 'lodash'
import { AnimeType } from "domain/anime";
import { CategoryType } from "domain/category";

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
          console.log("empty")
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

        console.log("category")
        console.log(categories)
        
        if (!categoryKeyword) {
          return categories
        }

        const filteredCategories = categories
          .filter((category: CategoryType) => {
            /**
             *
             * use String.indexOf(substring) instead of String.includes for older browsers and IE
             *
             * use String.prototype.indexOf, which returns -1 when a substring cannot be found
             *
             **/
            if (
              category.attributes.title.indexOf(categoryKeyword) !== -1
              //|| category.attributes.description.indexOf(categoryKeyword) !== -1
            ) {
              return true
            } else {
              return false
            }
          })

        console.log("after filter")
        console.log(filteredCategories)

        return filteredCategories
      },
    )
  },




  //
  //  // domain.blogs (search result)
  //  makeBlogDataBySearchSelector: () => {
  //    return createSelector(
  //      [
  //        // need to be domain to denormalize
  //        rsSelector.domain.getDomain,
  //        rsSelector.app.getSearchKeyword
  //      ],
  //      (domain, searchKeyword: string) => {
  //        /**
  //         * denormalize 
  //         *
  //         * this return { 'domain-name': [{ domain1 }, { domain2 }] in the format
  //         **/
  //        const denormalizedEntity = denormalize(
  //          Object.keys(domain.blogs),
  //          blogSchemaArray,
  //          domain,
  //        )
  //
  //        if (searchKeyword == "") return denormalizedEntity
  //
  //        const temp =  denormalizedEntity
  //          .filter((blog: BlogType) => {
  //            /**
  //             *
  //             * use String.indexOf(substring) instead of String.includes for older browsers and IE
  //             * 
  //             * use String.prototype.indexOf, which returns -1 when a substring cannot be found
  //             *
  //             **/
  //            if (
  //              blog.title.indexOf(searchKeyword) !== -1
  //              || blog.description.indexOf(searchKeyword) !== -1
  //              || blog.category.name.indexOf(searchKeyword) !== -1
  //              || blog.tags.filter((tag: TagType) => tag.name.indexOf(searchKeyword) !== -1).length > 0
  //            ) {
  //              return true
  //            } else {
  //              return false
  //            }
  //          })
  //
  //        log(temp)
  //
  //        return temp
  //
  //      },
  //    )
  //  },
  //
  //
  //  // domain.blogs (order: date desc)
  //  makeBlogDataDateDescSelector: () => {
  //    return createSelector(
  //      [
  //        // need to be domain to denormalize
  //        rsSelector.domain.getDomain
  //      ],
  //      (domain) => {
  //        /**
  //         * denormalize 
  //         *
  //         * this return { 'domain-name': [{ domain1 }, { domain2 }] in the format
  //         **/
  //        const denormalizedEntity = denormalize(
  //          Object.keys(domain.blogs),
  //          blogSchemaArray,
  //          domain,
  //        )
  //
  //        return denormalizedEntity
  //          // js sort function logic:
  //          //
  //          // coparison function: (a, b) => number
  //          //  a: first element (e.g., BlogType)
  //          //  b: second element (e.g., BlogType)
  //          //  return negative value (e.g., a-b) => a -> b ('a' comes first)
  //          //  return positive value (e.g., b-a)=> b -> a ('b' comes first)
  //
  //          // order: date desc (latest)
  //          .sort((a: BlogType, b: BlogType) => {
  //            return getLatestDate(b.createdAt, b.updatedAt).valueOf() - getLatestDate(a.createdAt, a.updatedAt).valueOf()
  //          })
  //
  //      },
  //    )
  //  },
  //
  //  // domain.blogs
  //  makeBlogDataByCategorySelector: (categoryPath: string) => {
  //    return createSelector(
  //      [
  //        // need to be domain to denormalize
  //        rsSelector.domain.getDomain
  //      ],
  //      (domain) => {
  //        /**
  //         * denormalize 
  //         *
  //         * this return { 'domain-name': [{ domain1 }, { domain2 }] in the format
  //         **/
  //        const denormalizedEntity = denormalize(
  //          Object.keys(domain.blogs),
  //          blogSchemaArray,
  //          domain,
  //        )
  //
  //        return denormalizedEntity
  //          // filter to get blogs of a given category
  //          .filter((blog: BlogType) => blog.category.path === categoryPath)
  //      },
  //    )
  //  },
  //
  //  // domain.blogs by category & pagination logic
  //  makeBlogDataByCategoryWithPaginationSelector: (categoryPath: string, curPage: number) => {
  //    return createSelector(
  //      [
  //        // need to be domain to denormalize
  //        rsSelector.domain.getDomain
  //      ],
  //      (domain) => {
  //        /**
  //         * denormalize 
  //         *
  //         * this return { 'domain-name': [{ domain1 }, { domain2 }] in the format
  //         **/
  //        const denormalizedEntity = denormalize(
  //          Object.keys(domain.blogs),
  //          blogSchemaArray,
  //          domain,
  //        )
  //
  //        // get blogs that blongs to the target category
  //        const filteredDenormalizedEntity = denormalizedEntity
  //          // filter to get blogs of a given category
  //          .filter((blog: BlogType) => blog.category.path === categoryPath)
  //
  //        // get total blogs #
  //        const total = filteredDenormalizedEntity.length
  //
  //        // limit is always 10 for this blog app
  //        const limit = 10
  //
  //        const btnNum = 5
  //
  //        // get maxPageNum of the pagination
  //        const maxPageNum = calculateMaxPageNumber(total, limit)
  //
  //        // get pageLinkType objects
  //        const pageLinks: PageLinkType[] = generatePaginationLink(total, limit, curPage, btnNum)
  //
  //        const pagination: PaginationType = {
  //          curPage: curPage,
  //          maxPage: maxPageNum,
  //          pageLinks: pageLinks
  //        }
  //
  //        console.log("cur page: " + curPage)
  //
  //        // paginate filtered-denormalized entity
  //        // logic: 
  //        //  page #1: 0 (index) - 10 (index)
  //        //  page #2: 10 - 20 
  //        //  page #3: 20 - 30 
  //        //
  //        // slice() can handle error when 2nd argument is beyond the the length of the array.
  //        //  - 1st arg: start (index)
  //        //  - 2nd arg: end (index)
  //        const startIndex = (curPage - 1) * 10 
  //        const endIndex = startIndex + 10 
  //        const paginatedEntity = filteredDenormalizedEntity.slice(startIndex, endIndex) 
  //
  //        return {
  //          entities: paginatedEntity,
  //          pagination: pagination
  //        }
  //      },
  //    )
  //  },
  //
  //  // domain.categories
  //  makeCategoryDataSelector: () => {
  //    return createSelector(
  //      [
  //        rsSelector.domain.getCategoryData
  //      ],
  //      (categoryData) => {
  //        /**
  //         * convert object-based domain (normalized) to array-based domain
  //         **/
  //        return Object.values(categoryData)
  //      },
  //    )
  //  },
  //
  //  // domain.categories
  //  makeTagDataSelector: () => {
  //    return createSelector(
  //      [
  //        rsSelector.domain.getTagData
  //      ],
  //      (tagData) => {
  //        /**
  //         * convert object-based domain (normalized) to array-based domain
  //         **/
  //        return Object.values(tagData)
  //      },
  //    )
  //  },
}

