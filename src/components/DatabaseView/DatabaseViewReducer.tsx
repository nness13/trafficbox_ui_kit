import { useReducer } from 'react'
import { action_dispatcher } from '@/utils/reducer.utils'
import { produce } from 'immer'
import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseViewTypes'

const actions = {
	on_create_view: (state, action) => produce(state, draft => {}),
	on_edit_view: (state, action) => produce(state, draft => {}),
	on_delete_view: (state, action) => produce(state, draft => {}),
	onSelectView: (state, action) => produce(state, draft => {}),
} satisfies Record<string, (state: DatabaseViewContextProps, action: ActionType) => DatabaseViewContextProps>

type ActionEnum = keyof typeof actions
export type ActionType = {
	type: ActionEnum
	view_name: string
	payload: any,
}

export const useDatabaseViewReducer = (initialState: DatabaseViewContextProps): DatabaseViewContextProps => {
	const reducer = (state: DatabaseViewContextProps, action: ActionType): DatabaseViewContextProps =>
		actions[action.type]
			? actions[action.type](state, action)
			: state

	const [state, dispatch] = useReducer(
		reducer,
		initialState
	)

	return produce(state, draft => {
		draft.actions = action_dispatcher(actions, dispatch) as any
	})
}