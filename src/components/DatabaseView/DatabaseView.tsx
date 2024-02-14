import React, { FC, useContext } from 'react'
import { DatabaseViewPanel } from '@/components/DatabaseView/DatabaseViewPanel'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import { TableView } from '@/components/DatabaseView/Views/TableView/TableView'
import { useDatabaseViewReducer } from '@/components/DatabaseView/DatabaseViewReducer'
import { useTableViewReducer } from '@/components/DatabaseView/Views/TableView/TableViewReducer'
import { initialTableViewContext, TableViewContext } from '@/components/DatabaseView/Views/TableView/TableViewContext'
import { DatabaseViewContextProps, DatabaseViewProps } from '@/components/DatabaseView/DatabaseViewTypes'
import { DatabaseViewContext, initialDatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewContextProps["selected_view"]>, any>

export const DatabaseViewWithContext: FC<DatabaseViewProps> = ({ ...props }) => {
	const stateView = useTableViewReducer(initialTableViewContext)
	console.log(props)
	const stateDatabase = useDatabaseViewReducer({ ...initialDatabaseViewContext, ...props })

	console.log(`Database State: `, stateDatabase)
	// console.log(`View search value: `, stateView.search.value)

	return (
		<DatabaseViewContext.Provider value={stateDatabase}>
			<TableViewContext.Provider value={stateView}>
				<DatabaseView/>
			</TableViewContext.Provider>
		</DatabaseViewContext.Provider>
	)
}

export const DatabaseView: FC = () => {
	const context = useContext(DatabaseViewContext)
	console.log(context)
	const view_props = context.views.find(view => view.name === "Table")
	const View = views[view_props?.type!]

	return (
		<>
			<DatabaseViewPanel/>
			<View
				{...view_props!}
				rows={context.rows}
				columns={context.columns}
			/>
		</>
	)
}