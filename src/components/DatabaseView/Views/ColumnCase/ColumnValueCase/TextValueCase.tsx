import { useViewContext } from '@/components/DatabaseView/Views/TableView/ViewContext'
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TableCellItem } from '@/components/DatabaseView/Views/TableView/TableContainers'
import { ValueCasePropsType } from '@/components/DatabaseView/DatabaseViewTypes'


export const TextValueCase = (props: ValueCasePropsType) => {
    const active_view = useViewContext()

    const [status, setStatus] = useState(false)
    const value = props.row[props.column.key] as string

    const [newValue, setNewValue] = useState(value)

    const refInput = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (status && refInput.current) refInput.current.focus()
    }, [status])

    const on_input = (e: any) => {
        setNewValue(e.currentTarget.value)
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
    const open: React.MouseEventHandler<HTMLDivElement> = (e) => !e.ctrlKey && setStatus(true)

    return (
        <div className={"w-full h-full min-h-[24px] relative"}>
            <TableCellItem>
                <div className="w-full h-full min-h-[24px] flex items-center cursor-pointer" onClick={open}>
                    {value}
                </div>
            </TableCellItem>

            {status &&
                <div className={"min-w-[300px] w-full z-10 cursor-pointer flex items-center absolute top-0 left-0 rounded-xl shadow-[rgba(15,_15,_15,_0.05)_0_0_0_1px,_rgba(15,_15,_15,_0.1)_0_3px_6px,_rgba(15,_15,_15,_0.2)_0_9px_24px]"} >
					<textarea
                        className="border-none outline-none p-2 w-full"
                        onInput={on_input}
                        onBlur={() => {
                            onChange()
                            setStatus(false)
                        }}
                        ref={refInput}
                        value={newValue}
                    />
                </div>
            }
        </div>
    )
}