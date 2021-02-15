import { StateType } from "./types";
import { schema } from 'normalizr';
//import { tagData } from "./data/tag";
//import { categoryData } from "./data/category";
//import { blogData } from "./data/blog";
import { normalize } from 'normalizr';
import { FetchStatusEnum } from "src/app";

/**
 *
 * normalizr definition
 *
 **/

// category
//const categorySchemaEntity = new schema.Entity(
//  "categories",
//  {},
//  {
//    // need to override default value ('id')
//    idAttribute: "path",
//  }
//)
//
//// tags
//const tagSchemaEntity = new schema.Entity(
//  "tags",
//  {},
//  {
//    idAttribute: "name",
//  }
//)
//
//export const tagSchemaArray = new schema.Array(tagSchemaEntity)

// anime 
const animeSchemaEntity = new schema.Entity(
  "animes",
)
export const animeSchemaArray = new schema.Array(animeSchemaEntity)

// make connection btw blogs and categories
//categorySchemaEntity.define({
//  blogs: blogSchemaArray
//})

/**
 *
 * normalize blog data
 *
 **/
const normalizedResult = normalize(
  {},
  animeSchemaArray
)

/**
 *
 * initial state
 *
 **/
export const initialState: StateType = {
  ui: {
    leftNavMenu: false,
    rightNavMenu: false,
    searchModal: false,
  },
  app: {
    searchKeyword: "",
    fetchStatus: FetchStatusEnum.INITIAL,
    categoryFetchStatus: FetchStatusEnum.INITIAL,
    curCategory: {
      id: -1,
      attributes: {
        title: "", 
        description: "",
      }
    }, // set fake default category object to avoid null error for the 2nd arg in useEffect
    curCategorySearchKeyword: "",
    curSort: null,
    sortList: [
      {
        key:  "-createdAt", // asc
        label: "Recent"
      },
      {
        key:  "createdAt", // desc
        label: "Old"
      },
      {
        key:  "titles", // desc
        label: "Title Asc"
      },
      {
        key:  "-titles", // desc
        label: "Title Desc"
      },
      {
        key:  "averageRating", // desc
        label: "Higher Rating"
      },
      {
        key:  "-averageRating", // desc
        label: "Lower Rating"
      },
    ],
    requestTracker: {}
  },
  domain: {
    animes: {
      data: {},
      pagination: {
        limit: 10,
        offset: 0,
        total: 0,
      },
      curItems: [],
    },
    categories: [],
    //    categories: normalizedResult.entities.categories,
    //    tags: normalizedResult.entities.tags,
  },
}

