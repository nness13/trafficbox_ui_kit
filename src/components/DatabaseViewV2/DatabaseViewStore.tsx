import { initialViewState } from '@/components/DatabaseViewV2/Views/ViewState'
import {
	DatabaseViewActionsType,
	DatabaseViewStateAndActionsType,
	DatabaseViewStateType
} from '@/components/DatabaseViewV2/DatabaseViewTypes'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

export const useDatabaseViewStore = create<DatabaseViewStateAndActionsType>()(devtools(immer(
	(set, getState, store) => ({
		selected_view: "1",
		columns: [],
		rows: [],
		views: [
			initialViewState("Table")
		],

		view_editable_status: false,
		toggle_view_editable_status: (status) => set(state => {
			state.view_editable_status = status
		}),

		on_select_view: () => set({ selected_view: "" }),
		on_edit_view: ({ name }) => set((state) => {
			const active_view = useActiveViewSelector(state)
			if(active_view) active_view.name = name
		}, false, "database/edit_view")

	})
), {
	name: "DatabaseStore",
}))

export const useActiveViewSelector = (state: DatabaseViewStateAndActionsType) => {
	const active_view = state.views.find(view => view.id === state.selected_view)
	if(!active_view) throw new Error("Not found active view")
	return active_view
}

export const useActiveViewPatrial = () => useDatabaseViewStore(useActiveViewSelector)








// const state = getState()
// console.log(state)
// const first_view_state = state.views[0]
// const newGetState = () => first_view_state
// type first_view_state_type = typeof first_view_state
// const new_set = (callback: (view_state: first_view_state_type) => first_view_state_type) => {
// 	const new_view_state = callback(first_view_state)
//
// 	set((state) => {
// 		state.views[0] = new_view_state
// 	})
// }