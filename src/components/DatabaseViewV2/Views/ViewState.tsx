import { signal } from '@preact/signals'
import type { Signal } from '@preact/signals'
import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'
import { ViewStateType } from '@/components/DatabaseViewV2/Views/TableViewTypes'

export const viewState: Signal<ViewStateType> = signal({
	id: "1",  // unique property
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
})
