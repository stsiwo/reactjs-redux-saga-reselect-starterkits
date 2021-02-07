import { takeEvery } from 'redux-saga/effects';
import { leftNavMenuWorkerWorker } from 'sideEffects/workers/leftNavMenuWorker';
import { toggleLeftNavMenuActionTypeName } from 'reducers/slices/ui';
/**
 *  watcher
 **/
export function* leftNavMenuWatcher() {
  console.log("start watching any request leftNavMenu action")
  yield takeEvery(
    toggleLeftNavMenuActionTypeName,
    leftNavMenuWorkerWorker,
  )
}

