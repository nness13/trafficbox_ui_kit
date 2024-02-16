import { Signal, signal } from '@preact/signals'
import { DefaultColumnCase } from '@/components/DatabaseView/ColumnCase'
import { viewState } from '@/components/DatabaseViewV2/Views/ViewState'
import { DatabaseViewStateType } from '@/components/DatabaseViewV2/DatabaseViewTypes'

export const databaseState: Signal<DatabaseViewStateType> = signal({
	selected_view: "1",
	columns: [],
	rows: [],
	views: [
		viewState,
	],
})

export const activeViewState = () => {
	const active_view = databaseState.value.views.find(view =>
		view.value.id === databaseState.value.selected_view
	)
	if(!active_view) throw new Error("Not Active View")
	return active_view.value
}