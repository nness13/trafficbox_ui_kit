import { createContext, useContext } from 'react'
import { initialDatabaseViewState } from '@/components/DatabaseView/DatabaseViewReducer'

export const DatabaseViewContext = createContext(initialDatabaseViewState)
export const useDatabaseViewContext = () => useContext(DatabaseViewContext)
export const useActiveViewContext = () => {
	const context = useDatabaseViewContext()
	const active_view = context.views.find(view => view.id === context.selected_view)
	if(!active_view) throw new Error("Active view")
	return active_view
}
