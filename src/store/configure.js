//@flow
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import { enableReduxDevTools } from './utils';
import reducers, { saga } from './modules';

const sagaMiddleware = createSagaMiddleware();

/**
 * Redux 환경을 구성해준다.
 *
 * @returns {Store<any, Action> & *} - 스토어 객체
 */
export default function configure(history: any) {
	// eslint-disable-next-line no-undef
	const isDev = process.env.NODE_ENV === 'development';
	const store = createStore(
		combineReducers({
			...reducers,
			router: connectRouter(history),
		}),
		enableReduxDevTools(isDev)(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
	);
	sagaMiddleware.run(saga);
	return store;
}
