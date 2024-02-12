import { useReducer } from 'react'
import { action_dispatcher } from '@/utils/reducer.utils'
import { TableViewContextProps } from '@/components/DatabaseView/Views/TableView/TableView'

const actions = {
	onSelect: (state, action) => ({
		...state,
		selected: action.payload
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

	const dispatch_actions = action_dispatcher(actions, dispatch)

	return {
		...state,
		...dispatch_actions
	}
}