import React, {FC} from 'react'
import {views} from "@/components/DatabaseView/Views/views";
import {ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import {DatabaseViewStore} from "@/components/DatabaseView/DatabaseViewStore";
import { TableViewProps } from '@/components/DatabaseView/Views/TableView/TableViewTypes'

export type actionContext = {
	loadData?: (pagination?: paginationType) => any
	createRow?: (item: any) => Promise<boolean>
	updateRow?: (item: RowType) => Promise<boolean>
	deleteRow?: (id_list: string[]) => Promise<boolean>
	actionMenu?: React.FC<ViewStore>
}
export type paginationType = {
	current_page: number,
	page_size: number,
	filters: filterType[],
	sort: sortType[]
}
export type DatabaseViewProps = Partial<DatabaseViewStateType> & {
	handleChange?: (state: DatabaseViewStore) => void
	rows: RowType[]
	columns: ColumnType[],
    totalRowCount?: number,
} & actionContext

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
export type RowActionHistoryType = {
	id: string,
	type: "create" | "update" | "delete",
	row_id: string,
	column: ColumnType,
	prevValue: any
	newValue: any
	api_sync: boolean
}
export type filterType = {
	id: string,
	column: ColumnType,
	condition: "equal" | "not_equal" | "contain" | "not_contain" | "lte" | "lt" | "gte" | "gt",
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
	ValueCase: FC<ValueCasePropsType>
	filter: (row: RowType, filter: filterType) => boolean
	sort: (rows: RowType[], sort: sortType) => RowType[]
	search: (rowValue: RowType[string], searchValue: ViewStore["search"]["value"]) => boolean
}>
export type ValueCasePropsType = {
	column: TableViewProps["columns"][number]
	row: TableViewProps["rows"][number]
	onEdit: Function
}
export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
}

export type DeepPartial2<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepPartial<T> = T extends object
	? T extends Array<infer U>
		? Array<U> | undefined
		: {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

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