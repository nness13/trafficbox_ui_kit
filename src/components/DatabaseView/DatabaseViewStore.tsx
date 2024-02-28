import {ColumnType, RowType} from '@/components/DatabaseView/DatabaseViewTypes'
import {ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import {autorun, makeAutoObservable} from "mobx";
import {injectStores} from "@mobx-devtools/tools";

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
		makePersistable("DatabaseViewStore", this)
	}

	on_select_view = (id: string) => {
		this.selected_view = id
	}
	on_create_view = (type: ViewStore["type"]) => {
		const new_view = new ViewStore({type})
		this.views.push(new_view)
		this.selected_view = new_view.id
	}
	on_delete_view = (id: string) => {
		const view = this.views.find(view => view.id === this.selected_view)
		if(!view) return;
 		const view_index = this.views.indexOf(view)
		this.views.splice(view_index, 1)
		if(this.views.length > 0) this.selected_view = this.views[0].id
		else this.selected_view = null
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
injectStores({
	DatabaseViewState
});

function makePersistable(name: string, store: any) {
	// Відновлення стану з localStorage при завантаженні стору
	const savedState = localStorage.getItem(name);
	if (savedState) {
		const {views: cache_views, ...rest} = JSON.parse(savedState)
		Object.assign(store, rest);
		cache_views.map((cache_view: any, index: number) => {
			if(store.views[index]) Object.assign(store.views[index], cache_view)
			else store.views[index] = new ViewStore(cache_view)
		})
	}

	// Збереження стану в localStorage при зміні стору
	autorun(() => {
		localStorage.setItem(name, JSON.stringify(store));
	});
}
