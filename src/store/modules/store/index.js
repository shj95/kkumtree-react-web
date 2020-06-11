import { all, call, put, takeLatest } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import * as api from '../../../api/store';
import { LIST_MAP, DETAIL, actionCreators } from './actions';

const initState = {
	isLoading: false,
	storeMapList: [
		{
			id: 0,
			name: '',
			address: '',
			telNumber: '',
			latitude: 0,
			longitude: 0,
			category: '',
			categoryImgUrl: '',
		},
	],
	storeDetail: {
		message: '',
		data: {
			stores: [
				{
					id: 0,
					name: '',
					address: '',
					telNumber: '',
					latitude: 0,
					longitude: 0,
					category: '',
					menus: [
						{
							id: 0,
							name: '',
							price: 0,
						},
					],
					benefits: [
						{
							id: 0,
							name: '',
							description: '',
						},
					],
				},
			],
		},
	},
};

export default handleActions(
	{
		[LIST_MAP.REQUESTED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = true;
			}),
		[LIST_MAP.SUCCEEDED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				draftState.storeMapList = action.payload.data.data.stores;
			}),
		[LIST_MAP.FAILED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				draftState.storeMapList = [];
			}),
		[DETAIL.REQUESTED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = true;
			}),
		[DETAIL.SUCCEEDED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				console.log(action.payload.data.data.store);
				draftState.storeDetail = action.payload.data.data.store;
			}),
		[DETAIL.FAILED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				draftState.storeDetail.data = null;
			}),
	},
	initState,
);

function* getStoresByLatLng({ payload: { lat, lng, diameter } }) {
	try {
		const action = yield call(api.getStoresByLatLng, { lat, lng, diameter });
		yield put(actionCreators.handleStoreMapListSuccess(action));
	} catch (err) {
		yield put(actionCreators.handleStoreMapListFailure({ lat, lng }));
	}
}

function* getStoreById({ payload: id }) {
	try {
		const action = yield call(api.getStoreById, id);
		yield put(actionCreators.handleStoreDetailSuccess(action));
	} catch (err) {
		yield put(actionCreators.handleStoreDetailFailure());
	}
}

export function* storeSaga() {
	yield all([
		takeLatest([LIST_MAP.REQUESTED], getStoresByLatLng),
		takeLatest([DETAIL.REQUESTED], getStoreById),
	]);
}
