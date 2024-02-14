import { useReducer } from 'react'
import { action_dispatcher } from '@/utils/reducer.utils'
import { produce } from 'immer'
import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseViewTypes'
import { useTableViewReducer } from '@/components/DatabaseView/Views/TableView/TableViewReducer'

const actions = {
	on_create_view: (state, action) => produce(state, draft => {

	}),
	on_delete_view: (state, action) => produce(state, draft => {

	}),
	onSelectView: (state, action) => produce(state, draft => {
		draft.selected_view = action.payload
	}),
} satisfies Record<string, (state: DatabaseViewContextProps, action: ActionType) => DatabaseViewContextProps>

type ActionEnum = keyof typeof actions
export type ActionType = {
	type: ActionEnum
	view_name: string
	payload: any,
}

const reducer = (state: DatabaseViewContextProps, action: ActionType): DatabaseViewContextProps =>
	actions[action.type]
		? actions[action.type](state, action)
		: state

export const useDatabaseViewReducer = (initialState: DatabaseViewContextProps): DatabaseViewContextProps => {
	const [state, dispatch] = useReducer(
		reducer,
		initialState
	)

	return produce(state, draft => {
		draft.actions = action_dispatcher(actions, dispatch) as any
		draft.views = state.views.map(view => {
			return useTableViewReducer({
				...view,
				rows: state.rows,
				columns: state.columns
			})
		})
	})
}