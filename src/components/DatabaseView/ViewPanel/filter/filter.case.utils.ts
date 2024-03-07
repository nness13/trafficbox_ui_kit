import { ColumnCaseHandlers } from '@/components/DatabaseView/DatabaseViewTypes'
import moment from 'moment/moment'

export const DefaultFilter: ColumnCaseHandlers[string]["filter"] = (row, filter)=> {
    const value = row[filter.column.key]
    switch (filter.condition) {
        case "is": return value === filter.value
        case "is_not": return value !== filter.value
        case "contain": return value.includes(filter.value)
        case "is_not_contain": return !value.includes(filter.value)
        case "within": return moment(value).isBetween(moment(filter.from), moment(filter.to))
    }
}