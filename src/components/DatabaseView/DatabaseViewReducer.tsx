import { useReducer } from 'react'
import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseView'
import { action_dispatcher } from '@/utils/reducer.utils'

const actions = {
	onSelect: (state, action) => ({
		...state,
		selected: action.payload
	}),
} satisfies Record<string, (state: DatabaseViewContextProps, action: ActionType) => DatabaseViewContextProps>

type ActionEnum = keyof typeof actions
type ActionType = {
	type: ActionEnum
	payload: any
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

	const dispatch_actions = action_dispatcher(actions, dispatch)

	return {
		...state,
		...dispatch_actions
	}
}