import { all, call, put, takeLatest } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import * as api from '../../../api/store';
import { LIST_MAP, DETAIL, actionCreators } from './actions';

const initState = {
	isLoading: false,
	storeMapList: {
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
					categoryImgUrl: '',
				},
			],
		},
	},
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

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

export default handleActions(
	{
		[LIST_MAP.REQUESTED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = true;
			}),
		[LIST_MAP.SUCCEEDED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				draftState.storeMapList = action.payload.data.stores;
			}),
		[LIST_MAP.FAILED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				// draftState.storeMapList.data = [];
				// TODO : API 나오면 제거
				draftState.storeMapList.data.stores = [...Array(20).keys()].map(v => {
					return {
						id: v,
						name: ['엽떡', '김밥천국', '곱창나라', '콩시콩뼈 감자탕', '돈냉', '맛있는 음식점'][
							Math.floor(Math.random() * 6)
						],
						address: '서울시 무슨구 무슨동 123-12',
						telNumber: '02-123-4567',
						latitude: action.payload.lat + getRandomArbitrary(-0.01, 0.01),
						longitude: action.payload.lng + getRandomArbitrary(-0.01, 0.01),
						category: 'BAKERY',
						categoryImgUrl: 'http://image.url',
					};
				});
			}),
		[DETAIL.REQUESTED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = true;
			}),
		[DETAIL.SUCCEEDED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				draftState.storeDetail = action.payload.data.stores;
			}),
		[DETAIL.FAILED]: (state, action) =>
			produce(state, draftState => {
				draftState.isLoading = false;
				// draftState.storeDetail.data = null;
				// TODO : API 나오면 제거
				draftState.storeDetail.data.store = {
					id: 1,
					name: '엽떡',
					address: '서울시 무슨구 무슨동 123-12',
					telNumber: '02-123-4567',
					latitude: 37.0,
					longitude: 127.0,
					category: 'BAKERY',
					menus: [
						{
							id: 1,
							name: '떡볶이',
							price: 6000,
						},
					],
					benefits: [
						{
							id: 1,
							name: '떡 추가',
							description: '떡을 더 줌',
						},
					],
				};
			}),
	},
	initState,
);

function* getStoresByLatLng({ payload: { lat, lng } }) {
	try {
		const action = yield call(api.getStoresByLatLng, { lat, lng });
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
