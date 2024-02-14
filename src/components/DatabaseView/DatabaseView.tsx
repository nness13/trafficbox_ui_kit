import React, { FC, useContext } from 'react'
import { DatabaseViewPanel } from '@/components/DatabaseView/DatabaseViewPanel'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import { TableView } from '@/components/DatabaseView/Views/TableView/TableView'
import { useDatabaseViewReducer } from '@/components/DatabaseView/DatabaseViewReducer'
import { DatabaseViewContextProps, DatabaseViewProps } from '@/components/DatabaseView/DatabaseViewTypes'
import {
	DatabaseViewContext,
	initialDatabaseViewContext,
	useDatabaseViewContext
} from '@/components/DatabaseView/DatabaseViewContext'
import { TableViewContext } from '@/components/DatabaseView/Views/TableView/TableViewContext'
import { initialTableViewState, useTableViewReducer } from '@/components/DatabaseView/Views/TableView/TableViewReducer'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewContextProps["selected_view"]>, any>
export const DatabaseViewWithContext: FC<DatabaseViewProps> = ({ ...props }) => {
	const databaseState = useDatabaseViewReducer({
		...initialDatabaseViewContext,
		views: [
			initialTableViewState
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
	console.log(context.selected_view)
	const view_props = context.views.find(view => view.id === context.selected_view)
	console.log(view_props)

	if(!view_props) return null;

	const View = views[view_props.type]
	// console.log({ view_props })
	return (
		<TableViewContext.Provider value={view_props}>
			<DatabaseViewPanel/>
			<View
				{...view_props}
				rows={context.rows}
				columns={context.columns}
			/>
		</TableViewContext.Provider>
	)
}