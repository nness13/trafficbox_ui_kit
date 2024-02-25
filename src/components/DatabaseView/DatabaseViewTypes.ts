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
export type ColumnType = {
	key: string;
	label: string;
	type: {
		type: string;
		description: string;
	};
}

export type ViewTypesType = keyof typeof views


export type ColumnCase = Record<string, { Icon: FC<any> }>

export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
}