import { takeEvery, take, all, spawn, call } from 'redux-saga/effects'
import { leftNavMenuWatcher, fetchAnimeWatcher} from './watchers';

export function* rootSaga() {
  console.log("start rootSaga ...")


  /**
   *
   * register watchers
   *
   **/
  const sagas: any[] = [
    leftNavMenuWatcher,
    fetchAnimeWatcher,
  ];

  /**
   * keep everything (e.g., child tasks) alive 
   *   - disconnect all children watchers with this rootSaga 
   **/

  yield all(sagas.map((saga) =>
    spawn(function*() {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );

  console.log("end rootSaga ...")
}
