import React, {memo} from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {ColumnType} from '@/components/DatabaseView/DatabaseViewTypes'
import {useViewContextReducer} from "@/components/DatabaseView/Views/ViewStoreContext";

type props_type = {
	columns: ColumnType[]
}
export const TableHeaderRow = memo((props: props_type) => {
	const onSelect = useViewContextReducer(state => state.onSelect)
	const selected = useViewContextReducer(state => state.selected)
	const rows = useViewContextReducer(state => state.rows)
	const column_case = useViewContextReducer(state => state.column_case)

	function onSelectedAll () {
		onSelect(
			selected.length > 0 ? [] : rows.map(row => row.id)
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