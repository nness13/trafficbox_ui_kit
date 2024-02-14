
import { ReactNode } from 'react'
import { ColumnCase, ColumnType } from '@/components/DatabaseView/DatabaseViewTypes'

export type TableViewProps = Partial<TableViewContextProps> & {
	rows: Record<string, any>[]
	columns: ColumnType[]
}

export type TableViewContextProps = {
	name: string, // unique property
	type: "table",
	column_case: ColumnCase,
	columns: ColumnType[]
	rows: Record<string, any>[]
	actionMenu: ReactNode
	search: {
		value: string
	}
	filters: any[]
	sort: any[]
	groups: any[],
	selected: []
	pagination: {
		total: number,
		current: number,
		position: "bottom" | "top" | "left" | "right",
		pageSize: number,
		pageSizeOptions: [2, 10, 20, 50, 100, 200, 400, 500, 1000],
		showSizeChanger: boolean,
	},

	filter_panel_status: boolean
	sort_panel_status: boolean
	groups_panel_status: boolean

	actions: {
		onSelect: Function
		onEdit: Function
		set_search: Function
		toggle_filter_panel_status: Function
		toggle_sort_panel_status: Function
		toggle_group_panel_status: Function
	}
}