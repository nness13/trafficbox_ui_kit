import React, {FC, memo, useEffect} from 'react'
import {TableContainer} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {TableGroupRow} from '@/components/DatabaseView/Views/TableView/TableGroupRow'
import {TableRow} from '@/components/DatabaseView/Views/TableView/TableRow'
import {TableHeaderRow} from '@/components/DatabaseView/Views/TableView/TableHeaderRow'
import {ViewPanel} from '@/components/DatabaseView/ViewPanel/ViewPanel'
import {StoreProvider, useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {ViewState, ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import {observer} from "mobx-react-lite";
import {ColumnType, RowType} from "@/components/DatabaseView/DatabaseViewTypes";
import {ActiveViewState} from "@/components/DatabaseView/DatabaseViewStore";
import {ColumnCaseProvider, useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import {use_filters} from "@/components/DatabaseView/ViewPanel/filter/FilterPanel";
import {DefaultColumnCase} from "@/components/DatabaseView/Views/ColumnCase";


const TableComponent = observer(() => {
	const view = useViewContext()
	const defaultColumnCase = useColumnCaseContext()

	useEffect(() => {
		console.log("set rows")
		if(view) {
			const filtered_rows = use_filters(view.init_rows, view.filters, defaultColumnCase)
			view.on_edit_view({
				columns: view.init_columns,
				rows: filtered_rows
			})
		}
	}, [view.init_columns, view.init_rows])

	return (
		<div>
			<ViewPanel/>
			<div className="overflow-auto max-h-[900px] min-h-[700px]">
				<TableContainer>
					<TableHeaderRow columns={view.columns}/>
					{view.rows.map((row, key) => (
						row?.children
							? <TableGroupRow
								group_id={0}
								key={key}
								row={row}
								columns={view.columns}
							/>
							: <TableRow
								key={key}
								row={row}
								columns={view.columns}
							/>
					))}
				</TableContainer>
			</div>
		</div>
	)
})

type propsType = {
	store: ViewStore,
	rows: RowType[],
	columns: ColumnType[]
}
export const TableView: FC<propsType> = observer((props) => {
	const view = ActiveViewState()

	if(!view) return null

	useEffect(() => {
		console.log("set init rows")
		if(view) {
			view.on_edit_view({
				init_columns: props.columns,
				init_rows: props.rows
			})
		}
	}, [props.columns, props.rows])


	// useEffect(() => autorun(() => {
	// 	console.log("set init rows")
	// 	if(view) {
	// 		view.on_edit_view({
	// 			init_columns: props.columns,
	// 			init_rows: props.rows
	// 		})
	// 	}
	// }), [])
	// useEffect(() => autorun(() => {
	// 	if(view) {
	// 		console.log("set rows")
	// 		view.on_edit_view({
	// 			columns: view.init_columns,
	// 			rows: view.init_rows
	// 		})
	// 	}
	// }), [])

	return (
		<StoreProvider store={props.store}>
			<ColumnCaseProvider store={DefaultColumnCase}>
				<TableComponent/>
			</ColumnCaseProvider>
		</StoreProvider>
	)
})
export const Table = memo(() => {
	return (
		<StoreProvider store={ViewState}>
			<ColumnCaseProvider store={DefaultColumnCase}>
				<TableComponent/>
			</ColumnCaseProvider>
		</StoreProvider>
	)
})