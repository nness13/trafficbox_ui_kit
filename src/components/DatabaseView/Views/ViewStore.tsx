import {v4 as uuid_v4} from "uuid";
import {DefaultColumnCase} from "@/components/DatabaseView/ColumnCase";
import {
	ColumnCaseHandlers,
	ColumnType,
	filterType, groupType,
	RowType, sortType,
	ViewTypesType
} from "@/components/DatabaseView/DatabaseViewTypes";
import {makeAutoObservable} from "mobx";

export class ViewStore {
	id: string = uuid_v4()  // unique property
	name: string = "Table"  // unique property
	type: ViewTypesType = "table"
	column_case_handlers: ColumnCaseHandlers = DefaultColumnCase
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

	constructor(type?: ViewTypesType) {
		makeAutoObservable(this);
		if(type) this.type = type
	}

	toggle_sort_panel_status = () => {}

	toggle_filter_panel_status = (value: boolean) => {
		this.filter_panel_status = value
	}

	toggle_group_panel_status = (value: boolean) => {
		this.groups_panel_status = value
	}

	on_edit_view = (data: Partial<ViewStore>) => {
		if(data.name) this.name = data.name
		if(data.columns) this.columns = data.columns
		if(data.rows) this.rows = data.rows
	}
	onSelect = (id_list: string[]) => {
		this.selected = id_list
	}
	onEditRow = () => {}
	set_search = (value: string) => {
		this.search.value = value
	}
}
export const ViewState = new ViewStore()