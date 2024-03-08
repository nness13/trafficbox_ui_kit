import React from 'react'
import {
    TableCell,
    TableCellItem,
    TableCheckbox,
    TableRowContainer
} from '@/components/DatabaseView/Views/TableView/TableContainers'
import {ColumnType} from '@/components/DatabaseView/DatabaseViewTypes'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCase/ColumnCaseContext";
import ReactDragListView from 'trafficbox-drag-listview'
import {getSelectPureId} from "@/components/DatabaseView/DatabaseView.utils";
import { ColumnCaseIcon } from '@/components/DatabaseView/Views/ColumnCase/ColumnCaseIcon'

type props_type = {
    columns: ColumnType[]
}
export const TableHeaderRow = observer((props: props_type) => {
    const active_view = useViewContext()
    const column_case_handlers = useColumnCaseContext()

    function onSelectedAll() {
        const selected_id = getSelectPureId(active_view.rows, 0)
        active_view.onSelect(
          active_view.selected.length > 0
                ? []
                : selected_id
        )
    }

    const dragProps = {
        onDragEnd(fromIndex: number, toIndex: number) {
            const column_list = [...active_view.columns];
            const item = column_list.splice(fromIndex-1, 1)[0];
            column_list.splice(toIndex-1, 0, item);
            active_view.set_columns(column_list)
        },
        nodeSelector: "ol",
    };

    return (//flex items-center
        <ReactDragListView.DragColumn {...dragProps} className="table-row h-full rounded-md text-passive uppercase text-xs border-t border-b border-border_line">
            {/*<TableRowContainer*/}
            {/*    className="rounded-md text-passive uppercase text-xs border-t border-b border-border_line">*/}
                <TableCell>
                    <TableCellItem>
                        <TableCheckbox
                          checked={active_view.selected?.length! > 0}
                          onChange={onSelectedAll}
                        />
                        {active_view.selected.length}
                    </TableCellItem>
                </TableCell>

                {props.columns.map(column => {
                    return (
                        <TableCell key={column.key}>
                            <TableCellItem>
                                <ColumnCaseIcon column={column}/>
                                <div className="whitespace-nowrap">
                                    {column.label}
                                </div>
                            </TableCellItem>
                        </TableCell>
                    )
                })}
            {/*</TableRowContainer>*/}
        </ReactDragListView.DragColumn>
    )
})