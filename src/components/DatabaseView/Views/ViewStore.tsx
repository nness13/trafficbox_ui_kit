import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'
import { create, StateCreator } from 'zustand'
import { ViewStateActions, ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {v4 as uuid_v4} from "uuid";
import {ViewTypesType} from "@/components/DatabaseView/DatabaseViewTypes";

type viewType = ViewStateType & ViewStateActions
type stateCreate = StateCreator<viewType, [["zustand/devtools", never], ["zustand/immer", never]], []>

export const initialViewStore = (type: ViewTypesType = "table"): viewType => ({
	id: uuid_v4(),  // unique property
	name: type,  // unique property
	type: type,
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
	onEditRow: () => {},
})

const initializedViewStore: stateCreate = (set) => ({
	...initialViewStore(),

	on_edit_view: ({name}) => set((state) => {
		state.name = name
	}),
	onSelect: (selected) => set((state) => {
		state.selected = selected
	}, false, "ViewStore/onSelect"),
	toggle_filter_panel_status: (data) => set((state) => {
		console.log(data)
		state.filter_panel_status = data
	})
})

export const useViewStore = () => create<viewType>()(devtools(immer(
	initializedViewStore
), {
	name: "ViewStore"
}))