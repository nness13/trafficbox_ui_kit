import React, { memo } from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ColumnValueTypeSwitcher } from '@/components/DatabaseView/Views/TableView/ColumnValueTypeSwitcher'
import { ColumnType, RowType } from '@/components/DatabaseView/DatabaseViewTypes'
import { useViewStore } from '@/components/DatabaseView/Views/ViewStore'

type props_type = {
	row: RowType
	columns: ColumnType[]
}

export const TableRow = memo((props: props_type) => {
	const onEdit = useViewStore(state => state.onEdit)
	const onSelect = useViewStore(state => state.onSelect)
	const selected = useViewStore(state => state.selected)
	const isSelected = !!selected.find(s => s === props.row.id)

	const onSelected = (e: any) => {
		onSelect(
			isSelected
				? selected.filter(s => s !== props.row.id)
				: [...selected, props.row.id]
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
							onEdit={onEdit}
						/>
					</TableCellItem>
				</TableCell>
			)}
		</TableRowContainer>
	)
})