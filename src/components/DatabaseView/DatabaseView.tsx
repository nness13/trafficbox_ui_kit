import React, { createContext, FC, ReactNode, useContext } from 'react'
import { DatabaseViewPanel } from '@/components/DatabaseView/DatabaseViewPanel'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import {
	initialTableViewContext,
	TableView,
	TableViewContextProps
} from '@/components/DatabaseView/Views/TableView/TableView'
import { useDatabaseViewReducer } from '@/components/DatabaseView/DatabaseViewReducer'
import _ from 'lodash'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewContextProps["defaultView"]>, any>

export type DatabaseViewProps = Partial<DatabaseViewContextProps> & {
	rows: RowType[]
	columns: ColumnType[]
}

export type RowType = Record<string, any>
export type ColumnType = {
	key: string;
	label: string;
	type: {
		type: string;
		description: string;
	};
}

export type DatabaseViewContextProps = {
	defaultView: "table" | "card",
	columns: ColumnType[],
	rows: RowType[],
	views: [
		TableViewContextProps
	]
}
export const initialDatabaseViewContext: DatabaseViewContextProps = {
	defaultView: "table",
	columns: [],
	rows: [],
	views: [
		initialTableViewContext
	]
}

export const DatabaseViewContext = createContext<DatabaseViewContextProps>(initialDatabaseViewContext)

export const DatabaseViewWithContext: FC<DatabaseViewProps> = ({ ...props }) => {
	console.log(initialDatabaseViewContext, props, _.merge(initialDatabaseViewContext, props))
	const state = useDatabaseViewReducer(_.merge(initialDatabaseViewContext, props))
	console.log(state)

	return (
		<DatabaseViewContext.Provider value={state}>
			<DatabaseView/>
		</DatabaseViewContext.Provider>
	)
}

export const DatabaseView: FC = () => {
	const context = useContext(DatabaseViewContext)
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