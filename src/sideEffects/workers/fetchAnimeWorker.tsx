import { PayloadAction, Action } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import { leftNavMenuActions } from "reducers/slices/ui";
import { fetchStatusActions } from "reducers/slices/app";
import { FetchStatusEnum } from "src/app";
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { updateAnimeDataActions, updateAnimePaginationDataActions, updateAnimeCurItemsDataActions } from "reducers/slices/domain/anime";
import { normalize } from "normalizr";
import { animeSchemaArray } from "states/state";
import { mSelector } from "src/selectors/selector";
import { DomainPaginationType } from "states/types";

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
   * update status for anime data
   **/
  yield put(
    fetchStatusActions.update(FetchStatusEnum.FETCHING)
  )

  /**
   * fetch data
   **/
  try {

    // prep keyword if necessary
    let targetUrl = `https://kitsu.io/api/edge/anime?page[limit]=${curPagination.limit}&page[offset]=${curPagination.offset}`
    if (curKeyword) {
      targetUrl += `&filter[text]=${curKeyword}` 
    }

    console.log("keyword")
    console.log(curKeyword)
    console.log(targetUrl)

    // start fetching
    const response = yield call<(config: AxiosRequestConfig) => AxiosPromise>(axios, {
      method: "get",
      url: targetUrl,
    })

    console.log(response)
    console.log(response.data.data)

    /**
     * normalize response data
     **/
    const normalizedData = normalize(response.data.data, animeSchemaArray)
    console.log(normalizedData)

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

