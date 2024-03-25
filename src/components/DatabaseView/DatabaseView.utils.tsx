import { DeepPartial, RowType } from '@/components/DatabaseView/DatabaseViewTypes'

export function getAllCount(data: any[], index: number): number {
	return data?.reduce(
		(accum, element) => {
			if(!element.hasOwnProperty('children')) accum += 1
			else accum += getAllCount(element.children, index+1)
			return accum
		},
		0
	);
}
export function getSelectPureId(data: RowType[], index: number): string[] {
	return data.reduce(
		(accum, element) => {
			if(!element.hasOwnProperty('children')) accum.push(element.id)
			else {
				// accum.push(element.id)
				accum.push(
					...getSelectPureId(element.children, index + 1)
				)
			}
			return accum
		},
		[] as string[]
	);
}

export function merge<T extends object>(source: T, partial: DeepPartial<T>): T {
	const result: T = source as T;

	Object.keys(partial).forEach(key => {
		// @ts-ignore
		if (typeof partial[key] === 'object' && partial[key] !== null && !Array.isArray(partial[key])) {
			// @ts-ignore
			result[key] = merge(result[key] || {}, partial[key]);
		} else {
			// @ts-ignore
			result[key] = partial[key];
		}
	});
	return result;
}