import React, {memo} from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {ColumnValueTypeSwitcher} from '@/components/DatabaseView/Views/ColumnValueTypeSwitcher'
import {ColumnType, RowType} from '@/components/DatabaseView/DatabaseViewTypes'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";
import {v4 as uuidv4} from "uuid"

type props_type = {
	row: RowType
	columns: ColumnType[]
}

export const TableRow = observer((props: props_type) => {
	const active_view = useViewContext()
	const isSelected = !!active_view.selected.find(s => s === props.row.id)

	const onSelected = (e: any) => {
		active_view.onSelect(
			isSelected
				? active_view.selected.filter(s => s !== props.row.id)
				: [...active_view.selected, props.row.id]
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
					<ColumnValueTypeSwitcher
						column={column}
						row={props.row}
						onEdit={active_view.onEditRow}
					/>
				</TableCell>
			)}
		</TableRowContainer>
	)
})