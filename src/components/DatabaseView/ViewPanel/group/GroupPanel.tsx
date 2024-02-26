import React from 'react'
import ReactDragListView from 'react-drag-listview'
import {GroupPopoverEditor} from '@/components/DatabaseView/ViewPanel/group/GroupPopoverEditor'
import {GroupTag} from '@/components/DatabaseView/ViewPanel/group/GroupTag'
import {GroupPopoverCreator} from '@/components/DatabaseView/ViewPanel/group/GroupPopoverCreator'
import {GroupTagAdd} from '@/components/DatabaseView/ViewPanel/group/GroupTagAdd'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";


export const GroupPanel = observer(() => {
	const active_view = useViewContext()

	const dragProps = {
		onDragEnd(fromIndex: number, toIndex:number) {
			const group_list = [...active_view.groups];
			const item = group_list.splice(fromIndex, 1)[0];
			group_list.splice(toIndex, 0, item);
			active_view.set_group(group_list)
		},
		nodeSelector: "ol"
	};
	return (
		<div className={`flex items-center gap-2 transition-all overflow-hidden ${!active_view.groups_panel_status ? 'h-0 p-0' : 'p-1'}`}>
			<ReactDragListView.DragColumn {...dragProps}>
				<div className="flex flex-row gap-2 items-center">
					{active_view.groups.map((group, key) =>
						<ol key={key}>
							<GroupPopoverEditor group={group}>
								<GroupTag group={group}/>
							</GroupPopoverEditor>
						</ol>
					)}
				</div>
			</ReactDragListView.DragColumn>
			<GroupPopoverCreator>
				<GroupTagAdd/>
			</GroupPopoverCreator>
		</div>
	)
})