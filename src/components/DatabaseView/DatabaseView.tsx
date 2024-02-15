import React, { FC, useEffect, useMemo, useState } from 'react'
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
import { ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewStateType["selected_view"]>, any>
export const DatabaseViewWithContext: FC<DatabaseViewProps> = ({ ...props }) => {
	const context = useMemo(() => ({
		...initialDatabaseViewState,
		views: [
			createViewState()
		],
		...props
	}), [initialDatabaseViewState, props])

	const databaseState = useDatabaseViewReducer(context)

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
	const [View, setView] = useState<{div: FC<ViewStateType>}>({div: () => <div></div>})
	console.log(View)

	useEffect(() => {
		if(views[view_props.type]) setView({ div: views[view_props.type] })
	}, [view_props.type])

	return (
		<>
			<DatabaseViewPanel/>
			<View.div
				{...view_props}
				rows={rows}
				columns={columns}
			/>
		</>
	)
}