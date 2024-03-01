import React from 'react'
import ReactDragListView from 'react-drag-listview'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";
import {ColumnTag} from "@/components/DatabaseView/ViewPanel/column_panel/ColumnTag";
import {ColumnPopoverEditor} from "@/components/DatabaseView/ViewPanel/column_panel/ColumnPopoverEditor";


export const ColumnPanel = observer(() => {
	const active_view = useViewContext()

	const dragProps = {
		onDragEnd(fromIndex: number, toIndex:number) {
			const column_list = [...active_view.columns];
			const item = column_list.splice(fromIndex, 1)[0];
			column_list.splice(toIndex, 0, item);
			active_view.set_columns(column_list)
		},
		nodeSelector: "ol"
	};
	return (
		<div className={`flex items-center gap-2 transition-all overflow-hidden ${!active_view.columns_panel_status ? 'h-0 p-0' : 'p-1'}`}>
			<ReactDragListView.DragColumn {...dragProps}>
				<div className="flex flex-row gap-2 items-center">
					{active_view.columns.map((column, key) =>
						<ol key={key}>
							<ColumnPopoverEditor column={column}>
								<ColumnTag column={column}/>
							</ColumnPopoverEditor>
						</ol>
					)}
				</div>
			</ReactDragListView.DragColumn>
		</div>
	)
})