import React, { FC } from 'react'
import { DatabaseViewPanel } from '@/components/DatabaseView/ViewPanel/DatabaseViewPanel'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import { TableView } from '@/components/DatabaseView/Views/TableView/TableView'
import {
	createViewState,
	initialDatabaseViewState,
	useDatabaseViewReducer
} from '@/components/DatabaseView/DatabaseViewReducer'
import { DatabaseViewStateType, DatabaseViewProps } from '@/components/DatabaseView/DatabaseViewTypes'
import {
	DatabaseViewContext,
	useActiveViewContext,
	useDatabaseViewContext
} from '@/components/DatabaseView/DatabaseViewContext'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewStateType["selected_view"]>, any>
export const DatabaseViewWithContext: FC<DatabaseViewProps> = ({ ...props }) => {
	const databaseState = useDatabaseViewReducer({
		...initialDatabaseViewState,
		views: [
			createViewState()
		],
		...props
	})

	// console.log(`Database State: `, databaseState)
	// console.log(`View search value: `, stateView.search.value)
	// 	<TableViewContext.Provider value={stateView}>
	return (
		<DatabaseViewContext.Provider value={databaseState}>
			<DatabaseView/>
		</DatabaseViewContext.Provider>
	)
}

export const DatabaseView: FC = () => {
	const context = useDatabaseViewContext()
	const view_props = useActiveViewContext()
	const {rows, columns} = context

	return (
		<>
			<DatabaseViewPanel/>
			{view_props
				? views[view_props.type]({
					...view_props,
					rows,
					columns
				})
				: null
			}
		</>
	)
}