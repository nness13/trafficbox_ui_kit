import { createContext, useContext } from 'react'
import { initialTableViewState } from '@/components/DatabaseView/Views/TableView/TableViewReducer'

export const TableViewContext = createContext(initialTableViewState)
export const useTableViewContext = () => useContext(TableViewContext)
