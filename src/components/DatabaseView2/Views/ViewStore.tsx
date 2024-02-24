import {v4 as uuid_v4} from "uuid";
import {DefaultColumnCase} from "@/components/DatabaseView2/ColumnCase";
import {ColumnCase, ColumnType, RowType, ViewTypesType} from "@/components/DatabaseView2/DatabaseViewTypes";
import {makeAutoObservable} from "mobx";

export class ViewStore {
	id: string = uuid_v4()  // unique property
	name: string = "Table"  // unique property
	type: ViewTypesType = "table"
	column_case: ColumnCase = DefaultColumnCase
	columns: ColumnType[] = []
	rows: RowType[] = []
	actionMenu: string = ""
	search =  {
		value: ""
	}
	filters: string[] = []
	sort: string[] = []
	groups: string[] = []
	selected: string[] = []
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

	on_edit_view = (data: Partial<{ name: string }>) => {
		if(data.name) this.name = data.name
	}
	onSelect = (id_list: string[]) => {
		this.selected = id_list
	}
	onEditRow = () => {}
}
export const ViewState = new ViewStore()