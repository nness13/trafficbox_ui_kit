import React, { FC } from 'react'
import { TableContainer } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { TableGroupRow } from '@/components/DatabaseView/Views/TableView/TableGroupRow'
import { TableRow } from '@/components/DatabaseView/Views/TableView/TableRow'
import { TableHeaderRow } from '@/components/DatabaseView/Views/TableView/TableHeaderRow'
import { TableViewProps, ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { useActiveViewContext } from '@/components/DatabaseView/DatabaseViewContext'

export const TableView = (props: ViewStateType) => {
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
	const viewState = useActiveViewContext()
	// const state = useTableViewReducer({...initialTableViewState, ...props})
	// console.log(`Table State: `, state)

	return (
		// <TableViewContext.Provider value={state}>
			<TableView {...viewState}/>
		// </TableViewContext.Provider>
	)
}
