import { FC } from 'react'
import { ViewStateType } from '@/components/DatabaseViewV2/Views/TableView/TableViewTypes'
import { ViewStateActions } from '@/components/DatabaseViewV2/Views/TableView/TableViewTypes'

export type DatabaseViewProps = Partial<DatabaseViewStateType> & {
	rows: RowType[]
	columns: ColumnType[]
}

export type RowType = Record<string, any>
export type ColumnType = {
	key: string;
	label: string;
	type: {
		type: string;
		description: string;
	};
}

export type ViewTypesType = "table" | "card"
export const ViewTypesEnum = {
	"table": "table",
	"card": "card",
} satisfies Record<ViewTypesType, ViewTypesType>

export type ColumnCase = Record<string, { Icon: FC<any> }>

export type DatabaseViewStateType = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
	views: (ViewStateType & ViewStateActions)[],
	view_editable_status: boolean,
}
export type DatabaseViewActionsType = {
	on_select_view: (payload?: any) => void
	on_edit_view: (payload: {name: string}) => void
	toggle_view_editable_status: (status: boolean ) => void,
}

export type DatabaseViewStateAndActionsType = DatabaseViewStateType & DatabaseViewActionsType