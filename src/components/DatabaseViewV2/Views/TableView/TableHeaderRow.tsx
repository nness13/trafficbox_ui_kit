import React, { memo } from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ColumnType } from '@/components/DatabaseView/DatabaseViewTypes'
import { useViewState } from '@/components/DatabaseViewV2/Views/ViewState'

type props_type = {
	columns: ColumnType[]
}
export const TableHeaderRow = memo((props: props_type) => {
	const onSelect = useViewState(state => state.onSelect)
	const selected = useViewState(state => state.selected)
	const rows = useViewState(state => state.rows)
	const column_case = useViewState(state => state.column_case)

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