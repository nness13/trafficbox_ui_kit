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


const TableComponent = observer(() => {
	const store = useViewContext()

	return (
		<div>
			<ViewPanel/>
			<div className="overflow-auto max-h-[900px] min-h-[700px]">
				<TableContainer>
					<TableHeaderRow columns={store.columns}/>
					{store.rows.map((row, key) => (
						row?.children
							? <TableGroupRow
								group_id={0}
								key={key}
								row={row}
								columns={store.columns}
							/>
							: <TableRow
								key={key}
								row={row}
								columns={store.columns}
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
	useEffect(() => {
		if(view) view.on_edit_view({
			columns: props.columns,
			rows: props.rows
		})
	}, [])

	return (
		<StoreProvider store={props.store}>
			<TableComponent/>
		</StoreProvider>
	)
})
export const Table = memo(() => {
	return (
		<StoreProvider store={ViewState}>
			<TableComponent/>
		</StoreProvider>
	)
})