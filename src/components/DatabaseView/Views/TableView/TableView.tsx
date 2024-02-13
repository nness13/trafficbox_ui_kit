import React, { createContext, FC, ReactNode } from 'react'
import { TableContainer } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { TableGroupRow } from '@/components/DatabaseView/Views/TableView/TableGroupRow'
import { TableRow } from '@/components/DatabaseView/Views/TableView/TableRow'
import { TableHeaderRow } from '@/components/DatabaseView/Views/TableView/TableHeaderRow'
import { useTableViewReducer } from '@/components/DatabaseView/Views/TableView/TableViewReducer'
import { ColumnType } from '@/components/DatabaseView/DatabaseView'
import _ from 'lodash'

export type TableViewProps = Partial<TableViewContextProps> & {
	rows: Record<string, any>[]
	columns: ColumnType[]
}

export type TableViewContextProps = {
	name: string, // unique property
	type: "table",
	rows: Record<string, any>[]
	columns: ColumnType[]
	actionMenu: ReactNode
	search: {
		value: string
	}
	filters: any[]
	sort: any[]
	groups: any[],
	selected: []
	pagination: {
		total: number,
		current: number,
		position: "bottom" | "top" | "left" | "right",
		pageSize: number,
		pageSizeOptions: [2, 10, 20, 50, 100, 200, 400, 500, 1000],
		showSizeChanger: boolean,
	},

	filter_panel_status: boolean
	sort_panel_status: boolean
	groups_panel_status: boolean

	actions: {
		onSelect: Function
		onEdit: Function
		set_search: Function
		toggle_filter_panel_status: Function
		toggle_sort_panel_status: Function
		toggle_group_panel_status: Function
	}
}
export const initialTableViewContext: TableViewContextProps = {
	name: "Table",  // unique property
	type: "table",
	columns: [],
	rows: [],
	actionMenu: "",
	search:  {
		value: ""
	},
	filters: [],
	sort: [],
	groups: [],
	selected: [],
	pagination: {
		total: 0,
		current: 1,
		position: "bottom",
		pageSize: 10,
		pageSizeOptions: [2, 10, 20, 50, 100, 200, 400, 500, 1000],
		showSizeChanger: false,
	},

	filter_panel_status: false,
	sort_panel_status: false,
	groups_panel_status: false,

	actions: {
		onSelect: () => {},
		onEdit: () => {},
		set_search: () => {},
		toggle_filter_panel_status: () => {},
		toggle_sort_panel_status: () => {},
		toggle_group_panel_status: () => {},
	}
}

export const TableViewContext = createContext<TableViewContextProps>(initialTableViewContext)

export const TableView = (props: TableViewContextProps) => {
	return (
		<div className="overflow-auto max-h-[900px] min-h-[700px]">
			<TableContainer>
				<TableHeaderRow columns={props.columns}/>
				{props.rows.map((row, key) => (
					row?.children
						? <TableGroupRow
							group_id={0}
							key={key}
							row={row}
							columns={props.columns}
						/>
						: <TableRow
							key={key}
							row={row}
							columns={props.columns}
						/>
				))}
			</TableContainer>
		</div>
	)
}

export const TableViewWithContext: FC<TableViewProps> = ({ ...props }) => {
	const state = useTableViewReducer({...initialTableViewContext, ...props})
	console.log(`Table State: `, state)

	return (
		<TableViewContext.Provider value={state}>
			<TableView {...state}/>
		</TableViewContext.Provider>
	)
}
