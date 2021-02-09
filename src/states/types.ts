import { FetchStatusEnum } from "src/app/";
import { NormalizedAnimeType } from "domain/anime";

//import { NormalizedBlogType } from "domain/blog";
//import { NormalizedCategoryType } from "domain/category";
//import { NormalizedTagType } from "domain/tag";

export declare type UiStateType = {
  leftNavMenu?: boolean
  rightNavMenu?: boolean
  searchModal?: boolean
}

export declare type AppStateType = {
  searchKeyword: string
  fetchStatus: FetchStatusEnum
}

export declare type DomainPaginationType = {
  limit: number
  offset: number
  total: number
}

export declare type DomainStateSubType<D extends Record<string, any>> = {
  data: D
  pagination: DomainPaginationType
}


export declare type DomainStateType = {
  animes: DomainStateSubType<NormalizedAnimeType> 
  //  categories: NormalizedCategoryType
  //  tags: NormalizedTagType
}

export declare type StateType = {
  ui?: UiStateType
  app?: AppStateType
  domain?: DomainStateType
}
