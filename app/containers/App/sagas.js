import { all, call, takeEvery } from 'redux-saga/effects'

export function* init() {
  console.log('Hello Sagas!')
}

export default function* root() {
  yield all([
    call(init),
  ]);
}
