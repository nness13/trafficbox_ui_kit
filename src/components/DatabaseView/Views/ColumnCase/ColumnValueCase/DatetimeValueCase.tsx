import React from 'react'
import { TableCellItem } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ValueCasePropsType } from '@/components/DatabaseView/DatabaseViewTypes'
import moment from 'moment'
import { datetime_format } from '@/config/consts'


export const DatetimeValueCase = (props: ValueCasePropsType) => {
    const value = props.row[props.column.key] as string

    return (
        <div className={"w-full h-full min-h-[24px] relative"}>
            <TableCellItem>
                <div className="w-full h-full min-h-[24px] flex items-center cursor-pointer">
                    {moment(value).format(datetime_format)}
                </div>
            </TableCellItem>
        </div>
    )
}