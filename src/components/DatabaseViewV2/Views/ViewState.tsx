import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'
import { create, StateCreator } from 'zustand'
import { ViewStateActions, ViewStateType } from '@/components/DatabaseViewV2/Views/TableView/TableViewTypes'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type viewType = ViewStateType & ViewStateActions
type stateCreate = StateCreator<viewType, [["zustand/devtools", never], ["zustand/immer", never]], []>

export const initialViewState = (name?: string): viewType => ({
	id: "1",  // unique property
	name: name || "Table",  // unique property
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
	toggle_filter_panel_status: () => {},

	sort_panel_status: false,
	toggle_sort_panel_status: () => {},

	groups_panel_status: false,
	toggle_group_panel_status: () => {},

	on_edit_view: () => {},
	onSelect: () => {},
	onEdit: () => {},
})

const initializedViewState: stateCreate = (set) => ({
	...initialViewState("Table"),

	on_edit_view: ({name}) => set((state) => {
		state.name = name
	}),
	onSelect: (selected) => set((state) => {
		state.selected = selected
	}, false, "ViewStore/onSelect"),
	onEdit: (data) => set((state) => {
	}),
})

export const useViewState = create<viewType>()(devtools(immer(
	initializedViewState
), {
	name: "ViewStore"
}))
