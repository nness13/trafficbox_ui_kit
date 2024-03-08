import React from "react"
import { useColumnCaseContext } from '@/components/DatabaseView/Views/ColumnCase/ColumnCaseContext'
import { ColumnType } from '@/components/DatabaseView/DatabaseViewTypes'

export const ColumnCaseIcon = (props: {column: ColumnType}) => {
	const column_case_handlers = useColumnCaseContext()
	const ColumnHandler = column_case_handlers[props.column.type.type]
	if(!ColumnHandler) throw new Error(`column_case_handlers not contain column type ${props.column.type.type}`)
	return (
		<ColumnHandler.Icon className={"w-4 h-4"}/>
	)
}