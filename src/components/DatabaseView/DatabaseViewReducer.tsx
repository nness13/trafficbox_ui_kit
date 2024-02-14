import { useReducer } from 'react'
import { action_dispatcher } from '@/utils/reducer.utils'
import { Draft, produce } from 'immer'
import { DatabaseViewStateType } from '@/components/DatabaseView/DatabaseViewTypes'
import { ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'

export const createViewState = (): ViewStateType => {
	return {
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
	}
}
export const initialDatabaseViewState: DatabaseViewStateType = {
	selected_view: "1",
	columns: [],
	rows: [],
	views: [],

	actions: {
		on_create_view: () => {},
		on_delete_view: () => {},
		onSelectView: () => {},

		on_edit_view: () => {},
		onSelect: () => {},
		set_search: () => {},
		onEdit: () => {},
		toggle_filter_panel_status: () => {},
		toggle_sort_panel_status: () => {},
		toggle_group_panel_status: () => {},
	}
}
const active_view_selector = (state: DatabaseViewStateType | Draft<DatabaseViewStateType>) => state.views.find(view => view.id === state.selected_view)
const view_selector = (state: DatabaseViewStateType, id: string) => state.views.find(view => view.id === id)

const database_view_actions = {
	on_create_view: (state, action) => produce(state, draft => {

	}),
	on_edit_view: (state, action: ActionType) => produce(state, draft => {
		const view = view_selector(draft, state.selected_view)
		if(view) view.name = action.payload.name
	}),
	on_delete_view: (state, action) => produce(state, draft => {

	}),
	onSelectView: (state, action) => produce(state, draft => {
		draft.selected_view = action.payload
	}),
	onSelect: (state, action) => produce(state, draft => {
		console.log("onSelect action", action.payload)
		const view = view_selector(draft, state.selected_view)
		if(view) view.selected = action.payload
	}),
	set_search: (state, action) => produce(state, draft => {
		const view = view_selector(draft, state.selected_view)
		if(view) view.search.value = action.payload
	}),
	onEdit: (state, action) => produce(state, draft => {
		const view = view_selector(draft, state.selected_view)
		if(view) view.search.value = action.payload
	}),
	toggle_filter_panel_status: (state, action) => produce(state, draft => {
		const view = view_selector(draft, state.selected_view)
		if(view) view.filter_panel_status = action.payload
	}),
	toggle_sort_panel_status: (state, action) => produce(state, draft => {
		const view = view_selector(draft, state.selected_view)
		if(view) view.sort_panel_status = action.payload
	}),
	toggle_group_panel_status: (state, action) => produce(state, draft => {
		const view = view_selector(draft, state.selected_view)
		if(view) view.sort_panel_status = action.payload
	}),
} satisfies {
	[key in keyof DatabaseViewStateType["actions"]]: (state: DatabaseViewStateType, action: ActionType) => DatabaseViewStateType
}


type ActionEnum = keyof typeof database_view_actions
export type ActionType = {
	type: ActionEnum
	payload: any,
}

const reducer = (state: DatabaseViewStateType, action: ActionType): DatabaseViewStateType =>
	database_view_actions[action.type]
		? database_view_actions[action.type](state, action)
		: state

export const useDatabaseViewReducer = (initialState: DatabaseViewStateType): DatabaseViewStateType => {
	const [state, dispatch] = useReducer(
		reducer,
		initialState
	)

	return produce(state, draft => {
		draft.actions = action_dispatcher(database_view_actions, dispatch)
	})
}