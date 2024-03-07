import { ColumnCaseHandlers } from '@/components/DatabaseView/DatabaseViewTypes'

export const TextSearch: ColumnCaseHandlers[string]["search"] = (rowValue: string, searchValue) => {
    return rowValue.includes(searchValue)
}