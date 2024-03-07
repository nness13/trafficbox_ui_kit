import React, {FC, memo, useEffect} from 'react'
import {TableContainer} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {TableGroupRow} from '@/components/DatabaseView/Views/TableView/TableGroupRow'
import {TableRow} from '@/components/DatabaseView/Views/TableView/TableRow'
import {TableHeaderRow} from '@/components/DatabaseView/Views/TableView/TableHeaderRow'
import {use_view_effects, ViewPanel} from '@/components/DatabaseView/ViewPanel/ViewPanel'
import {StoreProvider, useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {ViewState, ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import {observer} from "mobx-react-lite";
import { ColumnType, editContext, RowType } from '@/components/DatabaseView/DatabaseViewTypes'
import {ActiveViewState} from "@/components/DatabaseView/DatabaseViewStore";
import {ColumnCaseProvider, useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import {DefaultColumnCase} from "@/components/DatabaseView/Views/ColumnCase";
import { EditProvider } from '@/components/DatabaseView/Views/EditContext'
import { useDatabaseSearch } from '@/components/DatabaseView/ViewPanel/search/SearchInput'
import { autorun } from 'mobx'


const TableComponent = observer((props: editContext) => {
	const viewContext = useViewContext()
	const defaultColumnCase = useColumnCaseContext()

	useEffect(() => {
		if(viewContext) {
			const {rows, columns} = use_view_effects( viewContext, defaultColumnCase )
			viewContext.on_edit_view({
				columns,
				rows
			})
		}
	}, [viewContext.init_columns, viewContext.init_rows])

	useEffect(() => {
		viewContext.row_action_history.map(action => {
			if(props.updateRow && action.type === "update") {
				props.updateRow({
					id: action.row_id,
					[action.column.key]: action.newValue
				}).then(status => {
					if(!status) {
						// Revert row data by action
						return status;
					}

					viewContext.set_row_action_history({
						id: action.id,
						api_sync: true
					})
				})
			}
		})
	}, [viewContext.row_action_history])

	return (
		<div>
			<ViewPanel/>
			<div className="overflow-auto max-h-[900px] min-h-[700px]">
				<TableContainer>
					<TableHeaderRow columns={viewContext.columns}/>
					{viewContext.rows.map((row, key) => (
						row?.children
							? <TableGroupRow
								group_id={0}
								key={key}
								row={row}
								columns={viewContext.columns}
							/>
							: <TableRow
								key={key}
								row={row}
								columns={viewContext.columns}
							/>
					))}
				</TableContainer>
			</div>
		</div>
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


type propsType = {
	store: ViewStore,
	rows: RowType[],
	columns: ColumnType[]
} & editContext
export const TableView: FC<propsType> = observer(({ updateRow, createRow, deleteRow, ...props }) => {
	const view = ActiveViewState()
	const editProps = { createRow, updateRow, deleteRow }

	if(!view) return null

	useEffect(() => {
		if(view) {
			view.on_edit_view({
				init_columns: props.columns,
				init_rows: props.rows
			})
		}
	}, [props.columns, props.rows])

	return (
		<StoreProvider store={props.store}>
				<ColumnCaseProvider store={DefaultColumnCase}>
					<TableComponent {...editProps}/>
				</ColumnCaseProvider>
		</StoreProvider>
	)
})
