import { takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { leftNavMenuWorkerWorker } from 'sideEffects/workers/leftNavMenuWorker';
import { toggleLeftNavMenuActionTypeName } from 'reducers/slices/ui';
import { fetchAnimeWorker } from 'sideEffects/workers/fetchAnimeWorker';
import { fetchAnimeActionTypeName } from 'reducers/slices/domain/anime';

/**
 * takeEvery: allows multiple worker instances to be started CONCURRENTLY.
 * takeLatest: cancel pending when there is a new one.

/**
 *  watcher
 **/
export function* leftNavMenuWatcher() {
  yield takeEvery(
    toggleLeftNavMenuActionTypeName,
    leftNavMenuWorkerWorker,
  )
}


export function* fetchAnimeWatcher() {
  yield throttle(
    500,
    fetchAnimeActionTypeName,
    fetchAnimeWorker,
  )
}

