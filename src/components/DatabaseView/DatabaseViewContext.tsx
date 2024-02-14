import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseViewTypes'
import { createContext, useContext } from 'react'

export const initialDatabaseViewContext: DatabaseViewContextProps = {
	selected_view: "1",
	columns: [],
	rows: [],
	views: [
		// useTableViewReducer(initialTableViewContext)
	],

	actions: {
		on_create_view: () => {},
		on_delete_view: () => {},
		onSelectView: () => {},
	}
}

export const DatabaseViewContext = createContext(initialDatabaseViewContext)
export const useDatabaseViewContext = () => useContext(DatabaseViewContext)
