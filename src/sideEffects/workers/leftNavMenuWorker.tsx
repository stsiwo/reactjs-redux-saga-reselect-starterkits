import { PayloadAction, Action } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { leftNavMenuActions } from "reducers/slices/ui";

/**
 * a worker (generator)    
 *  
 **/
export function* leftNavMenuWorkerWorker(action: PayloadAction<{}>) {

  yield put(
    leftNavMenuActions.toggle()
  )
}

