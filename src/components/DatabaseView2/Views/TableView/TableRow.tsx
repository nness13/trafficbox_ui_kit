import React, {memo} from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView2/Views/TableView/TableContainers'
import {ColumnValueTypeSwitcher} from '@/components/DatabaseView2/Views/TableView/ColumnValueTypeSwitcher'
import {ColumnType, RowType} from '@/components/DatabaseView2/DatabaseViewTypes'
import {useViewContext} from "@/components/DatabaseView2/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";

type props_type = {
	row: RowType
	columns: ColumnType[]
}

export const TableRow = observer((props: props_type) => {
	const onSelect = useViewContext(state => state.onSelect)
	const onEdit = useViewContext(state => state.onEditRow)
	const selected = useViewContext(state => state.selected)
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