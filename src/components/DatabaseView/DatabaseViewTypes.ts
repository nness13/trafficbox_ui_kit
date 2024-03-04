import {FC} from 'react'
import {views} from "@/components/DatabaseView/Views/views";
import {ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import {DatabaseViewStore} from "@/components/DatabaseView/DatabaseViewStore";

export type DatabaseViewProps = Partial<DatabaseViewStateType> & {
	rows: RowType[]
	columns: ColumnType[]
	handle?: (state: DatabaseViewStore) => void
}

export type RowType = {
	id: string
	[key: string]: any
}
type ColumnCaseType = {
	type: string;
	description: string;
	[key: string]: any
}
export type ColumnType = {
	key: string;
	label: string;
	type: ColumnCaseType;
	options?: any[]
}
export type filterType = {
	id: string,
	column: ColumnType,
	condition: "is" | "is_not" | "contain" | "is_not_contain" | "within",
	value?: string | number | string[],
	from?: string,
	to?: string,
}
export type createFilterType = OmitId<filterType>
export type updateFilterType = DeepPartialWithOptionalRoot<filterType>
export type sortType = {
	id: string,
	column: ColumnType,
	value: "descending" | "ascending",
}
export type createSortType = Omit<sortType, "id">
export type updateSortType = DeepPartialWithOptionalRoot<sortType>
export type groupType = {
	id: string,
	column: ColumnType,
}
export type createGroupType = Omit<groupType, "id">
export type updateGroupType = Pick<groupType, "id"> & DeepPartialWithOptionalRoot<groupType>
export type ViewTypesType = keyof typeof views
export type ColumnCaseHandlers = Record<string, {
	Icon: FC<any>
	filter: (row: RowType, filter: filterType) => boolean
	sort: (rows: RowType[], sort: sortType) => RowType[]
	search: (rowValue: RowType[string], searchValue: ViewStore["search"]["value"]) => boolean
}>

export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
}

type OmitId<T> = T extends { id: string } ? Omit<T, "id"> : T;
// type DeepPartialWithOptionalRoot<T> = T extends { id: string }
// 	? {
// 		[K in keyof T]?: T[K]
// 	}
// 	: T
type DeepPartialWithOptionalRoot<T> =
	(T extends { id: string }
		? { [K in keyof T]?: T[K] }
		: never
	) & { id: string };