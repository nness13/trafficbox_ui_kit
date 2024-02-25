import React, {useState} from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {TableRow} from '@/components/DatabaseView/Views/TableView/TableRow'
import {getAllCount, getTrustItemID} from '@/components/DatabaseView/DatabaseView.utils'
import {HiChevronDown, HiChevronRight} from 'react-icons/hi2'
import {ColumnValueTypeSwitcher} from '@/components/DatabaseView/Views/TableView/ColumnValueTypeSwitcher'
import {ColumnType, RowType} from '@/components/DatabaseView/DatabaseViewTypes'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";

type props_type = {
	group_id: number
	row: RowType
	columns: ColumnType[]
}

export const TableGroupRow = observer((props: props_type) => {
	const selected = useViewContext(state => state.selected)
	const onSelect = useViewContext(state => state.onSelect)
	const onEdit = useViewContext(state => state.onEditRow)

	const isSelected = !!selected.find(s => s === props.row.id)
	const onSelected = (e: any) => {
		const selected_id = [
			props.row.id,
			...getTrustItemID(props.row.children, 0)
		]
		onSelect(
			isSelected
				? selected.filter(s => !selected_id.includes(s))
				: [...selected, ...selected_id]
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
								onEdit={onEdit}
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
})