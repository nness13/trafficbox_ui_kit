import React, { memo } from 'react'
import { TableContainer } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { TableGroupRow } from '@/components/DatabaseView/Views/TableView/TableGroupRow'
import { TableRow } from '@/components/DatabaseView/Views/TableView/TableRow'
import { TableHeaderRow } from '@/components/DatabaseView/Views/TableView/TableHeaderRow'
import { ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { ViewPanel } from '@/components/DatabaseView/ViewPanel/ViewPanel'
import {ItemProvider} from "@/components/DatabaseView/Views/TableView/ItemTestContext";

export const Table = memo((props: ViewStateType) => {
	return (
		<TableView {...props}/>
	)
})

export const TableView = memo((props: ViewStateType) => {

	return (
		<>
			<ViewPanel/>
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
		</>
	)
})