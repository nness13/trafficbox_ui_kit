import {initialViewStore} from '@/components/DatabaseView/Views/ViewStore'
import {
	ColumnType,
	DatabaseViewStateAndActionsType,
	RowType,
	ViewTypesType
} from '@/components/DatabaseView/DatabaseViewTypes'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {devtools} from 'zustand/middleware'
import {v4 as uuid_v4} from 'uuid'

const view1 = initialViewStore()

export const useDatabaseViewStore = create<DatabaseViewStateAndActionsType>()(devtools(immer(
	(set, getState, store) => ({
		selected_view: view1.id,
		columns: [] as ColumnType[],
		rows: [] as RowType[],
		views: [
			view1
		],

		on_select_view: (id: string) => set({ selected_view: id }),
		on_create_view: (type: ViewTypesType) => set((state) => {
			const view = initialViewStore(type)
			state.views.push( view )
			state.selected_view= view.id
		}),
		on_delete_view: (id: string) => set((state) => {
			state.views = state.views.filter(view => view.id !== id)
			if(state.views.length > 0)
				state.selected_view = state.views[0].id
		}),
		on_edit_view: ({ name }) => set((state) => {
			const active_view = useActiveViewSelector(state)
			if(active_view) active_view.name = name
		}, false, "database/edit_view")

	})
), {
	name: "DatabaseStore",
}))

export const useActiveViewSelector = (state: DatabaseViewStateAndActionsType) => {
	if(state.views.length <= 0) return initialViewStore()

	const active_view = state.views.find(view =>
		view.id === state.selected_view
	)
	if(active_view) return active_view

	return state.views[0]
}

export const useActiveViewPartial = () => useDatabaseViewStore(useActiveViewSelector)








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