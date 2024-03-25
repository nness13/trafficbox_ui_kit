import { ColumnCaseHandlers } from '@/components/DatabaseView/DatabaseViewTypes'
import moment from 'moment/moment'

export const DefaultFilter: ColumnCaseHandlers[string]["filter"] = (row, filter)=> {
    const value = row[filter.column.key]
    switch (filter.condition) {
        case "equal": return value === filter.value
        case "not_equal": return value !== filter.value
        case "contain": return value.includes(filter.value)
        case "not_contain": return !value.includes(filter.value)
        case "lt": return moment(value).isBetween(moment(filter.from), moment(filter.to))
        case "lte": return moment(value).isBetween(moment(filter.from), moment(filter.to))
        case "gt": return moment(value).isBetween(moment(filter.from), moment(filter.to))
        case "gte": return moment(value).isBetween(moment(filter.from), moment(filter.to))
    }
}