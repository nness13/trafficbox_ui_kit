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
	label: string;
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
	value: any,
}
export type sortType = {
	id: string,
	column: ColumnType,
	value: "descending" | "ascending",
}
export type groupType = {
	id: string,
	column: ColumnType,
}

export type ViewTypesType = keyof typeof views


export type ColumnCaseHandlers = Record<string, {
	Icon: FC<any>
}>

export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
}