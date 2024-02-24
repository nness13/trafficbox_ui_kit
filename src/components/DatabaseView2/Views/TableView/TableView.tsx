import React, {FC, memo, useEffect} from 'react'
import {TableContainer} from '@/components/DatabaseView2/Views/TableView/TableContainers'
import {TableGroupRow} from '@/components/DatabaseView2/Views/TableView/TableGroupRow'
import {TableRow} from '@/components/DatabaseView2/Views/TableView/TableRow'
import {TableHeaderRow} from '@/components/DatabaseView2/Views/TableView/TableHeaderRow'
import {ViewPanel} from '@/components/DatabaseView2/ViewPanel/ViewPanel'
import {StoreProvider, useViewContext} from "@/components/DatabaseView2/Views/TableView/ViewContext";
import {ViewState, ViewStore} from "@/components/DatabaseView2/Views/ViewStore";
import {observer} from "mobx-react-lite";
import {ColumnType, RowType} from "@/components/DatabaseView2/DatabaseViewTypes";


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
	useEffect(() => {
		props.store.columns = props.columns
		props.store.rows = props.rows
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