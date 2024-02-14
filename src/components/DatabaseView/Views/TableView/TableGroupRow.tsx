import React, { useState } from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import { TableRow } from '@/components/DatabaseView/Views/TableView/TableRow'
import { getAllCount, getTrustItemID } from '@/components/DatabaseView/DatabaseView.utils'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi2'
import { ColumnValueTypeSwitcher } from '@/components/DatabaseView/Views/TableView/ColumnValueTypeSwitcher'
import { useTableViewContext } from '@/components/DatabaseView/Views/TableView/TableViewContext'
import { ColumnType, RowType } from '@/components/DatabaseView/DatabaseViewTypes'

type props_type = {
	group_id: number
	row: RowType
	columns: ColumnType[]
}

export function TableGroupRow (props: props_type) {
	const context = useTableViewContext()
	const isSelected = !!context.selected.find(s => s === props.row.id)
	const onSelected = (e: any) => {
		const selected_id = [
			props.row.id,
			...getTrustItemID(props.row.children, 0)
		]
		context.actions.onSelect(
			isSelected
				? context.selected.filter(s => !selected_id.includes(s))
				: [...context.selected, ...selected_id]
		)
	}

	const onSelectedWithCtrl = (e: any) => {
		return e.ctrlKey && onSelected(e)
	}
	const [childrenStatus, set_childrenStatus] = useState(false)

	return (
		<>
			<TableRowContainer
				onClick={onSelectedWithCtrl}
				className={`hover:cursor-pointer hover:bg-blue-300 hover:bg-opacity-30 ${isSelected ? "bg-blue-300 bg-opacity-10" :	""}`}
			>
				<TableCell>
					<TableCellItem>
						<TableCheckbox
							checked={isSelected}
							onChange={onSelected}
						/>
						<div
							className="flex flex-row items-center"
							onClick={() => set_childrenStatus(!childrenStatus)}
							style={{ paddingLeft: props.group_id*20 }}
						>
							{getAllCount(props.row?.children, 0)}
							{childrenStatus
								? <HiChevronDown className="w-5 h-5"/>
								: <HiChevronRight className="w-5 h-5"/>
							}
							{props.row?.children?.length}
						</div>
					</TableCellItem>
				</TableCell>
				{props.columns.map((column, key) =>
					<TableCell key={key}>
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
			{childrenStatus &&
				props.row?.children?.map((row: any, key: any) => (
					row?.children
						? <TableGroupRow
							group_id={props.group_id+1}
							key={key}
							row={row}
							columns={props.columns}
						/>
						: <TableRow
							key={key}
							row={row}
							columns={props.columns}
						/>
				))
			}
		</>
	)
}

