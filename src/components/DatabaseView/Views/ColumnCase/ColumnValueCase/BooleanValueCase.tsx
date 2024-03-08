import { useViewContext } from '@/components/DatabaseView/Views/TableView/ViewContext'
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TableCellItem } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ValueCasePropsType } from '@/components/DatabaseView/DatabaseViewTypes'
import { Checkbox, Switch } from '@material-tailwind/react'


export const BooleanValueCase = (props: ValueCasePropsType) => {
    const active_view = useViewContext()

    const value = props.row[props.column.key] as boolean

    const [newValue, setNewValue] = useState(value)

    const on_input = (e: any) => {
        setNewValue(e.target.checked)
    }

    const onChange = () => {
        if(value === newValue) return;

        active_view.onEditRow({
            id: uuidv4(),
            type: "update",
            row_id: props.row.id,
            column: props.column,
            prevValue: value,
            newValue: newValue,
            api_sync: false,
        })
    }
    useEffect(() => {
        onChange()
    }, [newValue])

    return (
        <div className={"w-full h-full min-h-[24px] relative"}>
            <TableCellItem>
                <div className="w-full h-full min-h-[24px] flex items-center cursor-pointer">
                    <Switch crossOrigin={""} checked={newValue} onChange={on_input}/>
                </div>
            </TableCellItem>
        </div>
    )
}