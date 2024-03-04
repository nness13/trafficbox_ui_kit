import {RowType} from "@/components/DatabaseView/DatabaseViewTypes";

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