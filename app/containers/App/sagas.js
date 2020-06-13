/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import {
  all,
  call,
  put,
  takeEvery,
  select,
  delay,
} from 'redux-saga/effects';
import * as selectors from './selectors';
import * as actions from './duck';

export function* init() {
  yield put(actions.setLoading(true));
  yield delay(1000);
  const loadedState = localStorage.getItem('state');
  if (loadedState) {
    const stateObject = JSON.parse(loadedState);
    const todos = selectors.selectTodos(stateObject);
    let items = Object.values(todos);
    if (items.length === 0) return;
    items = items.sort((a, b) => b.created_at - a.created_at);
    for (let i = 0; i < items.length; ++i) {
      const {
        id,
        title,
        description,
        checked,
        created_at,
      } = items[i];
      yield put(
        actions.addTodo({
          id,
          title,
          description,
          checked,
          created_at,
        }),
      );
    }
  }
  yield put(actions.setLoading(false));
}

function* trySaveToLocalStorage(action) {
  const state = yield select();
  if (selectors.selectIsLoading(state)) return;
  localStorage.setItem('state', JSON.stringify(state));
}

export function* watchSaveToLocalStorage() {
  yield takeEvery(
    [actions.ADD_TODO, actions.CHECK_TODO, actions.DELETE_TODO],
    trySaveToLocalStorage,
  );
}

function* clearLocalStorage(action) {
  localStorage.clear();
}

export function* watchClearLocalStorage() {
  yield takeEvery(actions.CLEAR_LOCAL_STORAGE, clearLocalStorage);
}

export default function* root() {
  yield all([
    call(init),
    call(watchSaveToLocalStorage),
    call(watchClearLocalStorage),
  ]);
}
