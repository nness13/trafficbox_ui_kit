import {ColumnType, RowType} from '@/components/DatabaseView2/DatabaseViewTypes'
import {ViewStore} from "@/components/DatabaseView2/Views/ViewStore";
import {makeAutoObservable} from "mobx";

const view = new ViewStore()
export class DatabaseViewStore {
	selected_view: string | null = view.id
	columns: ColumnType[] = []
	rows: RowType[] = []
	views: ViewStore[] = [
		view
	]

	constructor() {
		makeAutoObservable(this);
	}

	on_select_view = (id: string) => {
		this.selected_view = id
	}
	on_create_view = (type: ViewStore["type"]) => {
		const new_view = new ViewStore()
		this.views.push(new_view)
		this.selected_view = new_view.id
	}
	on_delete_view = (id: string) => {

	}
	on_edit_active_view = (data: Partial<ViewStore>) => {
		const view = this.views.find(view => view.id === this.selected_view)
		if(!view) return;
		view.on_edit_view(data)
	}
}
export const DatabaseViewState = new DatabaseViewStore()
export const ActiveViewState = () => {
	return DatabaseViewState.views.find(view => view.id === DatabaseViewState.selected_view)
}