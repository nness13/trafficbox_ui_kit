import { ReactNode } from 'react'
import { ColumnCase, ColumnType } from '@/components/DatabaseView/DatabaseViewTypes'

export type TableViewProps = Partial<ViewStateType> & {
	rows: Record<string, any>[]
	columns: ColumnType[]
}

export type ViewStateType = {
	id: string, // unique property
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
	selected: string[]
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
}

export type ViewStateActions = {
	on_edit_view: (payload: {name: string}) => void
	onSelect: (payload: string[]) => void
	onEdit: (payload: any) => void
	toggle_filter_panel_status: (payload: any) => void
	toggle_sort_panel_status: (payload: any) => void
	toggle_group_panel_status: (payload?: any) => void
}