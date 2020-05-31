// @flow
import { compose } from 'redux';

/**
 * 개발환경에서 ReduxDevTools를 사용가능하게 해준다.
 *
 * @param enable - true일 경우 development 환경, false일 경우 production 환경
 *
 * 참고 : https://github.com/zalmoxisus/redux-devtools-extension
 */
export function enableReduxDevTools(enable: boolean) {
	if (!enable || !window.__REDUX_DEVTOOLS_EXTENSION__) {
		return (fun: any) => fun;
	}
	return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const defaultActionSuffixes = ['REQUESTED', 'SUCCEEDED', 'FAILED'];

/**
 * 비동기 액션 플로우에 필요한 액션명을 자동으로 만든다.
 *
 * SUFFIX: 'module/ROOT_SUFFIX' 형태의 KV로 이루어진 객체를 반환한다.
 * suffixes를 입력하지 않은 경우 기본으로 REQUESTED, SUCCEEDED, FAILED 3종이 주입된다.
 *
 * @param module 모듈명
 * @param root 액션 기본 명칭
 * @param suffixes? 액션 플로우 단계명들
 * @returns 액션들의 이름이 담긴 객체
 */
export function generateActionNames(
	module: string,
	root: string,
	suffixes?: Array<string> = defaultActionSuffixes,
): { [string]: string } {
	return Object.assign(
		{},
		...suffixes.map(suffix => ({
			[suffix]: `${module}/${root}_${suffix}`,
		})),
	);
}

export function generateActionNamesOf(
	module: string,
): (root: string, suffixes?: Array<string>) => { [string]: string } {
	return generateActionNames.bind(null, module);
}

export function generateActionName(module: string, root: string): string {
	return `${module}/${root}`;
}

export function generateActionNameOf(module: string): (root: string) => string {
	return generateActionName.bind(null, module);
}

export function removeFalsy(obj: Object): Object {
	return Object.entries(obj)
		.filter(([_, v]) => v)
		.reduce((o, [k, v]) => ({ ...o, [k]: v }), {});
}
