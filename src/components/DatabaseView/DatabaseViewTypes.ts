import { FC } from 'react'
import { TableViewContextProps } from '@/components/DatabaseView/Views/TableView/TableViewTypes'

export type DatabaseViewProps = Partial<DatabaseViewContextProps> & {
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

export type DatabaseViewContextProps = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
	views: TableViewContextProps[],

	actions: {
		on_create_view: Function,
		on_edit_view: Function,
		on_delete_view: Function,
		onSelectView: Function,
	}
}