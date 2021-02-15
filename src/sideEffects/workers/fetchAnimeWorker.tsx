import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { normalize } from "normalizr";
import { fetchStatusActions, requestTrackerActions } from "reducers/slices/app";
import { updateAnimeCurItemsDataActions, updateAnimeDataActions, updateAnimePaginationDataActions } from "reducers/slices/domain/anime";
import { call, put, select } from "redux-saga/effects";
import { FetchStatusEnum, SortType, RequestTrackerBaseType } from "src/app";
import { mSelector } from "src/selectors/selector";
import { animeSchemaArray } from "states/state";
import { DomainPaginationType } from "states/types";
import { CategoryType } from "domain/category";
import { requestUrlCheckWorker } from "./requestUrlCheckWorker";
import isEmpty from 'lodash';

/**
 * a worker (generator)    
 *  
 **/
export function* fetchAnimeWorker(action: PayloadAction<{}>) {


  /**
   * get current pagination for this fetching
   **/
  // #DOUBT: is it ok to use memorized selector inside rs worker
  const curPagination: DomainPaginationType = yield select(mSelector.makeAnimePaginationDataSelector())

  /**
   * get current keyword for seach
   **/
  const curKeyword: string = yield select(mSelector.makeSearchKeywordSelector())

  /**
   * get current category for search
   **/
  const curCategory: CategoryType = yield select(mSelector.makeCurCategorySelector())

  /**
   * get current sort for search
   **/
  const curSort: SortType = yield select(mSelector.makeCurSortSelector())

  /**
   * check request url already done before.
   *
   *  - if so, we don't need to fetch again
   **/

  // prep keyword if necessary
  let targetUrl = `https://kitsu.io/api/edge/anime?page[limit]=${curPagination.limit}&page[offset]=${curPagination.offset}`
  if (curKeyword) {
    targetUrl += `&filter[text]=${curKeyword}`
  }
  if (curCategory && curCategory.id != -1) { // default category id is -1 so exclude this also
    targetUrl += `&filter[categories]=${curCategory.attributes.title}`
  }
  if (curSort) {
    targetUrl += `&sort=${curSort.key}`
  }

  // return empty object if does not exist
  const targetRequestTrackerBase: RequestTrackerBaseType = yield call(requestUrlCheckWorker, targetUrl)

  if (targetRequestTrackerBase) {
    // target url exists

    /**
     * update curItems of this request
     **/
    yield put(
      updateAnimeCurItemsDataActions.update(targetRequestTrackerBase.ids)
    )
    /**
     * update anime domain pagination in state
     **/

    yield put(
      updateAnimePaginationDataActions.update(targetRequestTrackerBase.pagination)
    )

  } else {
    // target url does not exist
    
    /**
     * update status for anime data
     **/
    yield put(
      fetchStatusActions.update(FetchStatusEnum.FETCHING)
    )

    /**
     * fetch data
     **/
    try {


      // start fetching
      const response = yield call<(config: AxiosRequestConfig) => AxiosPromise>(axios, {
        method: "get",
        url: targetUrl,
      })

      /**
       * normalize response data
       **/
      const normalizedData = normalize(response.data.data, animeSchemaArray)

      /**
       * update anime domain in state
       *
       **/
      yield put(
        updateAnimeDataActions.merge(normalizedData.entities.animes)
      )

      /**
       * update anime domain pagination in state
       *  - update only 'total'
       **/

      yield put(
        updateAnimePaginationDataActions.update({
          limit: curPagination.limit,
          offset: curPagination.offset,
          total: response.data.meta.count // total count path is 'response.data.meta.count'
        })
      )

      /**
       * update curItems of this request
       **/
      yield put(
        updateAnimeCurItemsDataActions.update(normalizedData.result)
      )

      /**
       * update requestTracker to keep this target url and result (curItems)
       **/
      yield put(
        requestTrackerActions.update({
          [targetUrl]: {
            ids: normalizedData.result,
            pagination: {
              limit: curPagination.limit,
              offset: curPagination.offset,
              total: response.data.meta.count // total count path is 'response.data.meta.count'
            } 
          }
        })
      )

      /**
       * update fetch status sucess
       **/
      yield put(
        fetchStatusActions.update(FetchStatusEnum.SUCCESS)
      )

    } catch (error) {

      console.log(error)

      /**
       * update fetch status failed
       **/
      yield put(
        fetchStatusActions.update(FetchStatusEnum.FAILED)
      )

    }
  }

}


