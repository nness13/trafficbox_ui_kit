import React from 'react'
import { TableViewProps } from '@/components/DatabaseViewV2/Views/TableView/TableViewTypes'

type propsType = {
	column: TableViewProps["columns"][number]
	row: TableViewProps["rows"][number]
	onEdit: Function
}
export const ColumnValueTypeSwitcher = (props: propsType) => {
	const value = props.row[props.column.key]
	return (
		<div>
			{value}
		</div>
	)
}