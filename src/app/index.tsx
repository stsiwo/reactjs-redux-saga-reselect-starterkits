import { DomainPaginationType } from "states/types";

export enum FetchStatusEnum {
  INITIAL = "INITIAL",
  FETCHING = "FETCHING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
}

export declare type SortType = {
  key: string
  label: string
}

export type RequestTrackerBaseType = {
  ids: string[]
  pagination?: DomainPaginationType
}

export declare type RequestTrackerType  = {
  [key: string]: RequestTrackerBaseType
}
