import { useReducer } from 'react'
import { action_dispatcher } from '@/utils/reducer.utils'
import { produce } from "immer"
import { TableViewContextProps } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'

export const initialTableViewState: TableViewContextProps = {
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

	actions: {
		on_edit_view: () => {},
		onSelect: () => {},
		onEdit: () => {},
		set_search: () => {},
		toggle_filter_panel_status: () => {},
		toggle_sort_panel_status: () => {},
		toggle_group_panel_status: () => {},
	}
}

const actions = {
	onSelect: (state, action) => produce(state, draft => {
		console.log("onSelect action", action.payload)
		draft.selected = action.payload
	}),
	toggle_filter_panel_status: (state, action) => produce(state, draft => {
		draft.filter_panel_status = action.payload
	}),
	toggle_sort_panel_status: (state, action) => produce(state, draft => {
		draft.sort_panel_status = action.payload
	}),
	set_search: (state, action) => produce(state, draft => {
		draft.search.value = action.payload
	}),
	on_edit_view: (state, action: ActionType) => produce(state, draft => {
		draft.name = action.payload.name
	}),
} satisfies Record<string, (state: TableViewContextProps, action: ActionType) => TableViewContextProps>

type ActionEnum = keyof typeof actions
type ActionType = {
	type: ActionEnum
	payload: any
}
 const reducer = (state: TableViewContextProps, action: ActionType): TableViewContextProps =>
	actions[action.type]
		? actions[action.type](state, action)
		: state

export const useTableViewReducer = (initialState: TableViewContextProps): TableViewContextProps => {
	const [state, dispatch] = useReducer(
		reducer,
		initialState
	)

	return produce(state, draft => {
		draft.actions = action_dispatcher(actions, dispatch, state.name) as any
	})
}