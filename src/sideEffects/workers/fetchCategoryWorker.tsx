import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { categoryFetchStatusActions } from "reducers/slices/app";
import { categoryDataActions } from "reducers/slices/domain/categories";
import { call, put } from "redux-saga/effects";
import { FetchStatusEnum } from "src/app";

/**
 * a worker (generator)    
 *
 *  - only run this once to get all categories and store it in the store.
 *  
 **/
export function* fetchCategoryWorker(action: PayloadAction<{}>) {


  /**
   * update status for anime data
   **/
  yield put(
    categoryFetchStatusActions.update(FetchStatusEnum.FETCHING)
  )

  /**
   * fetch data
   **/
  try {

    // prep keyword if necessary
    
    /**
     * grab all categories
     *  - might be better way to do this category filtering #PERFORMANCE
     **/
    const targetUrl = `https://kitsu.io/api/edge/categories?page[limit]=300`

    // start fetching
    const response = yield call<(config: AxiosRequestConfig) => AxiosPromise>(axios, {
      method: "get",
      url: targetUrl,
    })

    /**
     * update categories domain in state
     *
     **/
    yield put(
      categoryDataActions.update(response.data.data)
    )

    /**
     * update fetch status sucess
     **/
    yield put(
      categoryFetchStatusActions.update(FetchStatusEnum.SUCCESS)
    )

  } catch (error) {

    console.log(error)

    /**
     * update fetch status failed
     **/
    yield put(
      categoryFetchStatusActions.update(FetchStatusEnum.FAILED)
    )
  }
}



