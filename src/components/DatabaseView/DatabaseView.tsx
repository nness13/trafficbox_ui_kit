import React, { createContext, FC, useContext } from 'react'
import { DatabaseViewPanel } from '@/components/DatabaseView/DatabaseViewPanel'
import { CardView } from '@/components/DatabaseView/Views/CardView'
import {
	initialTableViewContext, TableView,
	TableViewContextProps,
	TableViewWithContext
} from '@/components/DatabaseView/Views/TableView/TableView'
import { useDatabaseViewReducer } from '@/components/DatabaseView/DatabaseViewReducer'
import _ from 'lodash'
import { useTableViewReducer } from '@/components/DatabaseView/Views/TableView/TableViewReducer'
import { produce } from 'immer'

const views = {
	table: TableView,
	card: CardView,
} satisfies Record<NonNullable<DatabaseViewContextProps["selected_view"]>, any>

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

export type ViewTypesType = "table" | "card"
export const ViewTypesEnum = {
	"table": "table",
	"card": "card",
} satisfies Record<ViewTypesType, ViewTypesType>

export type DatabaseViewContextProps = {
	selected_view: string,
	columns: ColumnType[],
	rows: RowType[],
	views: TableViewContextProps[],

	actions: {
		on_create_view: Function,
		on_edit_view: Function,
		on_delete_view: Function,
		onSelectView: Function,
	}
}
export const initialDatabaseViewContext: DatabaseViewContextProps = {
	selected_view: "Table",
	columns: [],
	rows: [],
	views: [
		initialTableViewContext
	],

	actions: {
		on_create_view: () => {},
		on_edit_view: () => {},
		on_delete_view: () => {},
		onSelectView: () => {},
	}
}

export const DatabaseViewContext = createContext<DatabaseViewContextProps>(initialDatabaseViewContext)

export const DatabaseViewWithContext: FC<DatabaseViewProps> = ({ ...props }) => {
	const stateView = useTableViewReducer(initialTableViewContext)
	const stateDatabase = useDatabaseViewReducer({ ...initialDatabaseViewContext, ...props })

	console.log(`Database State: `, stateDatabase)
	console.log(`View search value: `, stateView.search.value)

	return (
		<DatabaseViewContext.Provider value={stateDatabase}>
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