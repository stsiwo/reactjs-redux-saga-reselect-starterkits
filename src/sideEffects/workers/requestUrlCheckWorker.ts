import { RequestTrackerType } from "src/app";
import { select } from "redux-saga/effects";
import { mSelector } from "src/selectors/selector";

/**
 *
 * request url check worker. 
 *
 * This worker is a nested worker. called by 'requestDomainWorker' and 'DomainFilterWorker'.
 *
 * 
 * check the request url has requested in the past
 * if so, don't need to do anything since data exists in store 
 * if no, prep for request to backend api
 *
 * Issues:
 *
 *  #1: this logic does not work if two same request dispatched at the same time. (esp with takeEvery).
 *    - takeEvery pick every action and execute its worker. so if two same request (e.g., same endpoint) at the same time, 'requestList' state does not contain that url and allow to dispatch the two request. 
 *
 *    - workaround: change 'takeEvery' to 'takeLatest'.
 *      - takeLatest pick the action and cancel the previous action if it hasn't done yet.
 **/
export function* requestUrlCheckWorker(targetUrl: string) {

  // get requestList state from redux store 
  // * you need to use 'yield' with 'select'
  // does this 'yield' pause code here??
  const requestTrackerState: RequestTrackerType  = yield select(mSelector.makeRequestTrackerSelector())

  // check the target url already exist in requestList state
  // 'find' function return 'undefined' when it could not satisfied the condition.
  
  const isExist = Object.prototype.hasOwnProperty.call(requestTrackerState, targetUrl)

  if (!isExist) {
    // target url does not exist in requestUrl, so need to fetch from backend api
    return null 

  } else {
    // target url exists in requestUrl, so guide to cache (redux-store) because data already exist in it
    // don't need to do anything.
    return requestTrackerState[targetUrl]

  }
}
