import createAction from 'redux-actions/es/createAction';

import { generateActionNamesOf } from '../../utils';

const generateActionNames = generateActionNamesOf('reservation');

export const LIST_MAP = generateActionNames('LIST');
export const DETAIL = generateActionNames('DETAIL');

export const actionCreators = {
	requestStoreMapList: createAction(LIST_MAP.REQUESTED),
	handleStoreMapListSuccess: createAction(LIST_MAP.SUCCEEDED),
	handleStoreMapListFailure: createAction(LIST_MAP.FAILED),
	requestStoreDetail: createAction(DETAIL.REQUESTED),
	handleStoreDetailSuccess: createAction(DETAIL.SUCCEEDED),
	handleStoreDetailFailure: createAction(DETAIL.FAILED),
};
