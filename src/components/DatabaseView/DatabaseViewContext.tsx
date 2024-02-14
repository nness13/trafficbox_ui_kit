import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseViewTypes'
import { initialTableViewContext } from '@/components/DatabaseView/Views/TableView/TableViewContext'
import { createContext } from 'react'

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
