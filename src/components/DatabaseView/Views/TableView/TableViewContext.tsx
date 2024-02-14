import { TableViewContextProps } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { createContext } from 'react'
import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'

export const initialTableViewContext: TableViewContextProps = {
	name: "Table",  // unique property
	type: "table",
	column_case: DefaultColumnCase,
	columns: [],
	rows: [],
	actionMenu: "",
	search:  {
		value: ""
	},
	filters: [],
	sort: [],
	groups: [],
	selected: [],
	pagination: {
		total: 0,
		current: 1,
		position: "bottom",
		pageSize: 10,
		pageSizeOptions: [2, 10, 20, 50, 100, 200, 400, 500, 1000],
		showSizeChanger: false,
	},


	filter_panel_status: false,
	sort_panel_status: false,
	groups_panel_status: false,

	actions: {
		onSelect: () => {},
		onEdit: () => {},
		set_search: () => {},
		toggle_filter_panel_status: () => {},
		toggle_sort_panel_status: () => {},
		toggle_group_panel_status: () => {},
	}
}

export const TableViewContext = createContext<TableViewContextProps>(initialTableViewContext)
