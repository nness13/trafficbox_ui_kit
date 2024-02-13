import React, { useContext } from 'react'
// import { IconColumnType } from '@/app/[components]/[components_layout]/main_layout/views/components/IconColumnSwitcher'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import { TableViewContext } from '@/components/DatabaseView/Views/TableView/TableView'
import { ColumnType } from '@/components/DatabaseView/DatabaseView'

type props_type = {
	columns: ColumnType[]
}
export function TableHeaderRow (props: props_type) {
	const context = useContext(TableViewContext)

	function onSelectedAll () {
		context.actions.onSelect(
			context.selected?.length! > 0 ? [] : context.rows.map(row => row.id)
		)
	}

	return (//flex items-center
		<TableRowContainer className="rounded-md text-passive uppercase text-xs border-t border-b border-border_line">
			<TableCell>
				<TableCellItem>
					<TableCheckbox
						checked={context.selected?.length! > 0}
						onChange={onSelectedAll}
					/>
					{context.selected.length}
				</TableCellItem>
			</TableCell>
			{props.columns.map(column => (
				<TableCell key={column.key}>
					<TableCellItem>
						{/*<IconColumnType type={column.type.type}/>*/}
						<div className="whitespace-nowrap">{column.label}</div>
					</TableCellItem>
				</TableCell>
			))}
		</TableRowContainer>
	)
}