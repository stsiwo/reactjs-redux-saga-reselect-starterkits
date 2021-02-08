import { PayloadAction, Action } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { leftNavMenuActions } from "reducers/slices/ui";
import { fetchStatusActions } from "reducers/slices/app";
import { FetchStatusEnum } from "src/app";
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

/**
 * a worker (generator)    
 *  
 **/
export function* fetchAnimeWorker(action: PayloadAction<{}>) {

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
    const data = yield call<(config: AxiosRequestConfig) => AxiosPromise>(axios, {
      method: "get",
      url: "https://kitsu.io/api/edge/anime",
    })

    console.log(data)


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


