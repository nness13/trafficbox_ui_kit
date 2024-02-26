import {FC} from 'react'
import {views} from "@/components/DatabaseView/Views/views";

export type DatabaseViewProps = Partial<DatabaseViewStateType> & {
	rows: RowType[]
	columns: ColumnType[]
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
}
export type filterType = {
	id: string,
	column: ColumnType,
	condition: "is" | "is_not" | "contain" | "is_not_contain",
	value: string | number,
}
export type createFilterType = Omit<filterType, "id">
export type updateFilterType = Pick<filterType, "id"> & DeepPartialWithOptionalRoot<filterType>
export type sortType = {
	id: string,
	column: ColumnType,
	value: "descending" | "ascending",
}
export type createSortType = Omit<sortType, "id">
export type updateSortType = Pick<sortType, "id"> & DeepPartialWithOptionalRoot<sortType>
export type groupType = {
	id: string,
	column: ColumnType,
}
export type createGroupType = Omit<groupType, "id">
export type updateGroupType = Pick<groupType, "id"> & DeepPartialWithOptionalRoot<groupType>
export type ViewTypesType = keyof typeof views


export type ColumnCaseHandlers = Record<string, {
	Icon: FC<any>
}>

export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
}

type DeepPartialWithOptionalRoot<T> = {
	[K in keyof T]?: T[K]
};