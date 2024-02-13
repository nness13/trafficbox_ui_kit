import { useReducer } from 'react'
import { action_dispatcher } from '@/utils/reducer.utils'
import { TableViewContextProps } from '@/components/DatabaseView/Views/TableView/TableView'
import { produce } from "immer"

const actions = {
	onSelect: (state, action) => produce(state, draft => {
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
} satisfies Record<string, (state: TableViewContextProps, action: ActionType) => TableViewContextProps>

type ActionEnum = keyof typeof actions
type ActionType = {
	type: ActionEnum
	payload: any
}

export const useTableViewReducer = (initialState: TableViewContextProps): TableViewContextProps => {
	const reducer = (state: TableViewContextProps, action: ActionType): TableViewContextProps =>
		actions[action.type]
			? actions[action.type](state, action)
			: state

	const [state, dispatch] = useReducer(
		reducer,
		initialState
	)


	return {
		...state,
		actions: action_dispatcher(actions, dispatch, state.name) as any
	}
}