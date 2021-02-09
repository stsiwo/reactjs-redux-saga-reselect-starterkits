import { fetchAnimeActionTypeName } from 'reducers/slices/domain/anime';
import { fetchCategoryActionTypeName } from 'reducers/slices/domain/categories';
import { toggleLeftNavMenuActionTypeName } from 'reducers/slices/ui';
import { takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { fetchAnimeWorker } from 'sideEffects/workers/fetchAnimeWorker';
import { fetchCategoryWorker } from 'sideEffects/workers/fetchCategoryWorker';
import { leftNavMenuWorkerWorker } from 'sideEffects/workers/leftNavMenuWorker';

/**
 * takeEvery: allows multiple worker instances to be started CONCURRENTLY.
 * takeLatest: cancel pending when there is a new one.
 * throttle: type ahead stuff.

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

export function* fetchCategoryWatcher() {
  yield takeLatest(
    fetchCategoryActionTypeName,
    fetchCategoryWorker,
  )
}

