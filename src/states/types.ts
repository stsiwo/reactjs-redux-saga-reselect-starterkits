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


export declare type DomainStateType = {
  animes: NormalizedAnimeType 
  //  categories: NormalizedCategoryType
  //  tags: NormalizedTagType
}

export declare type StateType = {
  ui?: UiStateType
  app?: AppStateType
  domain?: DomainStateType
}
