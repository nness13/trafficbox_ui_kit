import { FC } from 'react'
import { ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { ActionType } from '@/components/DatabaseView/DatabaseViewReducer'
import { Signal } from '@preact/signals-react'

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
	views: Signal<ViewStateType>[],

	// actions: {
	// 	on_create_view: Function,
	// 	on_delete_view: Function,
	// 	onSelectView: Function,
	// 	on_edit_view: Function
	// 	onSelect: Function
	// 	set_search: Function
	// 	onEdit: Function
	// 	toggle_filter_panel_status: Function
	// 	toggle_sort_panel_status: Function
	// 	toggle_group_panel_status: Function
	// }
}