import React from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ColumnValueTypeSwitcher } from '@/components/DatabaseView/Views/TableView/ColumnValueTypeSwitcher'
import { ColumnType, RowType } from '@/components/DatabaseView/DatabaseViewTypes'
import { useTableViewContext } from '@/components/DatabaseView/Views/TableView/TableViewContext'

type props_type = {
	row: RowType
	columns: ColumnType[]
}

export function TableRow (props: props_type) {
	const context = useTableViewContext()
	const isSelected = !!context.selected.find(s => s === props.row.id)

	const onSelected = (e: any) => {
		context.actions.onSelect(
			isSelected
				? context.selected.filter(s => s !== props.row.id)
				: [...context.selected, props.row.id]
		)
	}

	const onSelectedWithCtrl = (e: any) => {
		return e.ctrlKey && onSelected(e)
	}

	return (
		<TableRowContainer
			onClick={onSelectedWithCtrl}
			className={`hover:cursor-pointer hover:bg-blue-300 hover:bg-opacity-30 ${
				isSelected ? "bg-blue-300 bg-opacity-10" :	""		
			}`}
		>
			<TableCell>
				<TableCellItem>
					<TableCheckbox
						checked={isSelected}
						onChange={onSelected}
					/>
				</TableCellItem>
			</TableCell>
			{props.columns.map(column =>
				<TableCell key={props.row.id + column.key}>
					<TableCellItem>
						<ColumnValueTypeSwitcher
							column={column}
							row={props.row}
							onEdit={context.actions.onEdit}
						/>
					</TableCellItem>
				</TableCell>
			)}
		</TableRowContainer>
	)
}