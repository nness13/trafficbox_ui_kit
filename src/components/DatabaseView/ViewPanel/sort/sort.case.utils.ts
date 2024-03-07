import { ColumnCaseHandlers } from '@/components/DatabaseView/DatabaseViewTypes'
import moment from 'moment/moment'

export const TextSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
    return rows.sort((a, b) => {
        const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
        const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

        if(a_value < b_value) return -1
        if(a_value > b_value) return 1
        return 0
    })
}
export const NumberSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
    return rows.sort((a, b) => {
        const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
        const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

        return a_value-b_value
    })
}
export const ArraySort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
    return rows.sort((a, b) => {
        const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
        const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

        return a_value.length-b_value.length
    })
}
export const BooleanSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
    return rows.sort((a, b) => {
        const a_value = sort.value === "ascending" ? a[sort.column.key] : b[sort.column.key]
        const b_value = sort.value === "ascending" ? b[sort.column.key] : a[sort.column.key]

        if(a_value && !b_value) return -1
        if(!a_value && b_value) return 1
        return 0
    })
}
export const DatetimeSort: ColumnCaseHandlers[string]["sort"] = (rows, sort) => {
    return rows.sort((a, b) => {
        const a_value = sort.value === "ascending" ? moment(a[sort.column.key]) : moment(b[sort.column.key])
        const b_value = sort.value === "ascending" ? moment(b[sort.column.key]) : moment(a[sort.column.key])

        return a_value.diff(b_value)
    })
}