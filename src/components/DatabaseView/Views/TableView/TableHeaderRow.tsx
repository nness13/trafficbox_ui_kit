import React from 'react'
import {
	TableCell,
	TableCellItem,
	TableCheckbox,
	TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ColumnType } from '@/components/DatabaseView/DatabaseViewTypes'
import { useActiveViewContext, useDatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'

type props_type = {
	columns: ColumnType[]
}
export function TableHeaderRow (props: props_type) {
	const viewState = useActiveViewContext()
	const context = useDatabaseViewContext()

	function onSelectedAll () {
		context.actions.onSelect(
			viewState.selected.length > 0 ? [] : context.rows.map(row => row.id)
		)
	}

	return (//flex items-center
		<TableRowContainer className="rounded-md text-passive uppercase text-xs border-t border-b border-border_line">
			<TableCell>
				<TableCellItem>
					<TableCheckbox
						checked={viewState.selected?.length! > 0}
						onChange={onSelectedAll}
					/>
					{viewState.selected.length}
				</TableCellItem>
			</TableCell>
			{props.columns.map(column => {
				// console.log(context.column_case, column.type.type)
				const { Icon } = viewState.column_case[column.type.type]
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
}