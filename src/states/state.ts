import { StateType } from "./types";
import { schema } from 'normalizr';
//import { tagData } from "./data/tag";
//import { categoryData } from "./data/category";
//import { blogData } from "./data/blog";
import { normalize } from 'normalizr';

/**
 *
 * normalizr definition
 *
 **/

// category
const categorySchemaEntity = new schema.Entity(
  "categories",
  {},
  {
    // need to override default value ('id')
    idAttribute: "path",
  }
)

// tags
const tagSchemaEntity = new schema.Entity(
  "tags",
  {},
  {
    idAttribute: "name",
  }
)

export const tagSchemaArray = new schema.Array(tagSchemaEntity)

// blogs
const blogSchemaEntity = new schema.Entity(
  "blogs",
  {
    category: categorySchemaEntity,
    tags: tagSchemaArray,
  },
  {
    idAttribute: "path",
  }
)
export const blogSchemaArray = new schema.Array(blogSchemaEntity)

// make connection btw blogs and categories
categorySchemaEntity.define({
  blogs: blogSchemaArray
})

/**
 *
 * normalize blog data
 *
 **/
//const normalizedResult = normalize(
//  blogData,
//  blogSchemaArray
//)

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
  },
  domain: {
    //    blogs: normalizedResult.entities.blogs,
    //    categories: normalizedResult.entities.categories,
    //    tags: normalizedResult.entities.tags,
  },
}

