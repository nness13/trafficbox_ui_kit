import React from 'react'
import { TableCellItem } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ValueCasePropsType } from '@/components/DatabaseView/DatabaseViewTypes'


export const IdValueCase = (props: ValueCasePropsType) => {
    const value = props.row[props.column.key] as number
    return (
        <div className={"w-full h-full min-h-[24px] relative"}>
            <TableCellItem>
                <div className="w-full h-full min-h-[24px] flex items-center cursor-pointer">
                    {value}
                </div>
            </TableCellItem>
        </div>
    )
}