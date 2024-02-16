import React, { FC } from 'react'
import { DatabaseViewPanel } from '@/components/DatabaseViewV2/ViewPanel/DatabaseViewPanel'
import { TableView } from '@/components/DatabaseView/Views/TableView/TableView'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import { DatabaseViewStateType } from '@/components/DatabaseView/DatabaseViewTypes'
import { databaseState } from '@/components/DatabaseViewV2/DatabaseState'
import { DatabaseViewProps } from '@/components/DatabaseViewV2/DatabaseViewTypes'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewStateType["selected_view"]>, any>

export const DatabaseView: FC<DatabaseViewProps> = (props) => {
	// console.log(databaseState.value.selected_view)
	// console.log(props)

	return (
		<>
			<DatabaseViewPanel/>
			{/*<View.div*/}
			{/*	{...view_props}*/}
			{/*	rows={rows}*/}
			{/*	columns={columns}*/}
			{/*/>*/}
		</>
	)
}
