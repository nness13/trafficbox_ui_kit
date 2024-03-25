import {
    ColumnCaseHandlers,
    ColumnType,
    filterType, groupType,
    RowType,
    sortType
} from '@/components/DatabaseView/DatabaseViewTypes'
import { ViewStore } from '@/components/DatabaseView/Views/ViewStore'
import _ from 'lodash'

export const use_filters = (rows: RowType[], filters: filterType[], DefaultColumnCase: ColumnCaseHandlers, rows2?: RowType[]) => {
    return rows.filter(row => {
        return filters.every(filter => {
            return DefaultColumnCase[filter.column.type.type].filter(row, filter)
        })
    })
}
export const use_sort = (rows: RowType[], sorts: sortType[], DefaultColumnCase: ColumnCaseHandlers, rows2?: RowType[]) => {
    if(sorts.length === 0) return rows
    return DefaultColumnCase[sorts[0].column.type.type].sort(rows, sorts[0])
}
export const use_search = (rows: RowType[], columns: ColumnType[], search: ViewStore["search"], DefaultColumnCase: ColumnCaseHandlers, rows2?: RowType[]) => {
    if(search.value.length === 0) return rows
    return rows.filter(row =>
        columns.find(column => DefaultColumnCase[column.type.type].search(row[column.key], search.value) )
    )
}
export const use_view_effects = (viewContext: ViewStore, defaultColumnCase: ColumnCaseHandlers): { rows: RowType[], columns: ColumnType[] } => {
    const rows_after_filters = use_filters(viewContext.init_rows, viewContext.filters, defaultColumnCase)
    const rows_after_search = use_search(rows_after_filters, viewContext.columns, viewContext.search, defaultColumnCase)
    const rows_after_sort = use_sort(rows_after_search, viewContext.sort, defaultColumnCase)

    const columns = viewContext.groups.length > 0
        ? [
            ...viewContext.groups.map(group => group.column),
            ...viewContext.init_columns.filter(c =>
                !viewContext.groups.find(group => c.key === group.column.key)
            )
        ]
        : viewContext.init_columns

    const group_rows = viewContext.groups.length > 0
        ? groupByGroups(viewContext.groups, rows_after_sort)
            .map((values) =>
                generateGroupRow(columns, values)
            )
        : rows_after_sort

    return {
        columns,
        rows: group_rows as RowType[]
    }
}

type generateGroupRowType = {
    children: groupByGroupsType["values"]
    [k: string]: any
}
function generateGroupRow (columns: ColumnType[], children: groupByGroupsType, parent?: string ): generateGroupRowType {
    const parent_text = parent ? parent+">" : ""
    return columns.reduce(
        (def_row, column) => {
            const is_same: RowType | false = def_row.children.every(el => el[column.key] === def_row.children[0][column.key])
                ? def_row.children[0]
                : false

            if(column.type.type !== "id") def_row[column.key] = is_same ? is_same[column.key] : ``
            if(column.type.type === "id") def_row[column.key] = `${parent_text}${children.by!}>${children.group}`
            return def_row
        },
        {
            children:
                children.nextIsGroup
                    ? children.values.map(row => generateGroupRow( columns, row, `${parent_text}${children.by}>${children.group}` ) )
                    : children.values
        } as generateGroupRowType
    )
}
type groupByGroupsType = {
    by: string,
    group: string,
    nextIsGroup: boolean,
    values: groupByGroupsType[]
} | {
    by: null,
    group: null,
    nextIsGroup: boolean,
    values: any[]
}
function groupByGroups(groups: groupType[], rows: any): groupByGroupsType[] {
    const [group, next_group] = groups

    return _(rows)
        .groupBy(row => row[group.column.key])
        .map((values, key) => ({
            by: group.column.key,
            group: key,
            nextIsGroup: !!next_group,
            values: next_group
                ? groupByGroups(groups.slice(1), values)
                : values
        }))
        .value() as groupByGroupsType[]
}

