// @flow

import { all, fork } from 'redux-saga/effects';

import store, { storeSaga } from './store';

export default {
	store,
};

export function* saga(): any {
	yield all([fork(storeSaga)]);
}
