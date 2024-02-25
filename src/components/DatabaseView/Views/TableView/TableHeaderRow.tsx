import React, {memo} from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {ColumnType} from '@/components/DatabaseView/DatabaseViewTypes'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";

type props_type = {
	columns: ColumnType[]
}
export const TableHeaderRow = observer((props: props_type) => {
	const onSelect = useViewContext(state => state.onSelect)
	const selected = useViewContext(state => state.selected)
	const rows = useViewContext(state => state.rows)
	const column_case = useViewContext(state => state.column_case_handlers)

	function onSelectedAll () {
		const id_list = rows.map(row => row.id)
		onSelect(
			selected.length > 0
				? []
				: id_list
		)
	}

	return (//flex items-center
		<TableRowContainer className="rounded-md text-passive uppercase text-xs border-t border-b border-border_line">
			<TableCell>
				<TableCellItem>
					<TableCheckbox
						checked={selected?.length! > 0}
						onChange={onSelectedAll}
					/>
					{selected.length}
				</TableCellItem>
			</TableCell>
			{props.columns.map(column => {
				const { Icon } = column_case[column.type.type]
				return (
					<TableCell key={column.key}>
						<TableCellItem>
							<Icon className={"w-4 h-4"}/>
							<div className="whitespace-nowrap">{column.label}</div>
						</TableCellItem>
					</TableCell>
				)
			})}
		</TableRowContainer>
	)
})