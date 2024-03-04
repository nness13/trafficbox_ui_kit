import {v4 as uuid_v4} from "uuid";
import {
	ColumnType,
	createFilterType,
	createGroupType,
	createSortType,
	filterType,
	groupType,
	RowType,
	sortType,
	updateFilterType,
	updateGroupType,
	updateSortType,
	ViewTypesType
} from "@/components/DatabaseView/DatabaseViewTypes";
import {makeAutoObservable} from "mobx";


export class ViewStore {
	id: string = uuid_v4()  // unique property
	name: string = "Table"  // unique property
	type: ViewTypesType = "table"
	init_columns: ColumnType[] = []
	init_rows: RowType[] = []
	columns: ColumnType[] = []
	rows: RowType[] = []
	actionMenu: string = ""
	search =  {
		value: ""
	}
	filters: filterType[] = []
	sort: sortType[] = []
	groups: groupType[] = []
	selected: Array<ViewStore["id"]> = []
	pagination = {
		total: 0,
		current: 1,
		position: "bottom",
		pageSize: 10,
		pageSizeOptions: [2, 10, 20, 50, 100, 200, 400, 500, 1000],
		showSizeChanger: false,
	}

	filter_panel_status: boolean = false
	sort_panel_status: boolean = false
	groups_panel_status: boolean = false
	columns_panel_status: boolean = false

	constructor(props?: Partial<ViewStore>) {
		makeAutoObservable(this);
		if(props) {
			Object.keys(props)
				.map(key =>
					(this as any)[key] = (props as any)[key]
				)
		}
	}

	set_pagination = (pagination: Partial<ViewStore["pagination"]>) => {
		Object.keys(pagination).map(key => (this as any).pagination[key] = (pagination as any)[key] )

	}
	toggle_sort_panel_status = (value: boolean) => {
		this.sort_panel_status = value
	}

	toggle_columns_panel_status = (value: boolean) => {
		this.columns_panel_status = value
	}

	toggle_filter_panel_status = (value: boolean) => {
		this.filter_panel_status = value
	}

	toggle_group_panel_status = (value: boolean) => {
		this.groups_panel_status = value
	}

	on_edit_view = (data: Partial<ViewStore>) => {
		Object.keys(data).map(key => (this as any)[key] = (data as any)[key] )
	}
	onSelect = (id_list: string[]) => {
		this.selected = id_list
	}
	onEditRow = () => {}
	set_search = (value: string) => {
		this.search.value = value
	}
	update_column = (column: updateGroupType) => {
		const find_column = this.columns.find(f => f.key === column.id)
		if(!find_column) return;
		// if(column.column) find_column. = column.column
	}
	remove_column = (id: ColumnType["key"]) => {
		const index = this.columns.findIndex(column => column.key === id)
		this.columns.splice(index, 1)
	}
	set_columns = (columns: ColumnType[]) => {
		this.columns = columns
	}
	add_filter = (filter: createFilterType) => {
		this.filters.push({
			id: uuid_v4(),
			...filter
		})
		this.filters = [...this.filters]
	}
	update_filter = (filter: updateFilterType) => {
		const find_filter = this.filters.find(f => f.id === filter.id)
		if(!find_filter) return;
		Object.keys(filter).map(key => (find_filter as any)[key] = (filter as any)[key] )
		this.filters = [...this.filters]
	}
	remove_filter = (id: filterType["id"]) => {
		const index = this.filters.findIndex(filter => filter.id === id)
		this.filters.splice(index, 1)
		this.filters = [...this.filters]
	}
	add_group = (group: createGroupType) => {
		this.groups.push({
			id: uuid_v4(),
			...group
		})
		this.groups = [...this.groups]
	}
	update_group = (group: updateGroupType) => {
		const find_group = this.groups.find(f => f.id === group.id)
		if(!find_group) return;
		if(group.column) find_group.column = group.column
		this.groups = [...this.groups]
	}
	remove_group = (id: groupType["id"]) => {
		const index = this.groups.findIndex(group => group.id === id)
		this.groups.splice(index, 1)
		this.groups = [...this.groups]
	}
	set_group = (groups: groupType[]) => {
		this.groups = groups
	}
	add_sort = (sort: createSortType) => {
		this.sort.push({
			id: uuid_v4(),
			...sort
		})
		this.sort = [...this.sort]
	}
	update_sort = (sort: updateSortType) => {
		const find_sort = this.sort.find(f => f.id === sort.id)
		if(!find_sort) return;
		if(sort.column) find_sort.column = sort.column
		if(sort.value) find_sort.value = sort.value
		this.sort = [...this.sort]
	}
	remove_sort = (id: sortType["id"]) => {
		const index = this.sort.findIndex(sort => sort.id === id)
		this.sort.splice(index, 1)
		this.sort = [...this.sort]
	}
	set_sort = (sort: sortType[]) => {
		this.sort = sort
	}
}
export const ViewState = new ViewStore()