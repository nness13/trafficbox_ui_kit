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
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import ReactDragListView from 'trafficbox-drag-listview'
import {getSelectPureId} from "@/components/DatabaseView/DatabaseView.utils";

type props_type = {
    columns: ColumnType[]
}
export const TableHeaderRow = observer((props: props_type) => {
    const active_view = useViewContext()
    const onSelect = useViewContext(state => state.onSelect)
    const selected = useViewContext(state => state.selected)
    const rows = useViewContext(state => state.rows)
    const column_case_handlers = useColumnCaseContext()

    function onSelectedAll() {
        const selected_id = getSelectPureId(active_view.rows, 0)
        onSelect(
            selected.length > 0
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
                            checked={selected?.length! > 0}
                            onChange={onSelectedAll}
                        />
                        {selected.length}
                    </TableCellItem>
                </TableCell>

                {props.columns.map(column => {
                    const {Icon} = column_case_handlers[column.type.type]
                    return (
                        <TableCell key={column.key}>
                            <TableCellItem>
                                <Icon className={"w-4 h-4"}/>
                                <div className="whitespace-nowrap">{column.label}</div>
                            </TableCellItem>
                        </TableCell>
                    )
                })}
            {/*</TableRowContainer>*/}
        </ReactDragListView.DragColumn>
    )
})