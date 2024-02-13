import React, { useContext } from 'react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseView'
import ReactDragListView from 'react-drag-listview'
import { GroupPopoverEditor } from '@/components/DatabaseView/group/GroupPopoverEditor'
import { GroupTag } from '@/components/DatabaseView/group/GroupTag'
import { GroupPopoverCreator } from '@/components/DatabaseView/group/GroupPopoverCreator'
import { GroupTagAdd } from '@/components/DatabaseView/group/GroupTagAdd'


export function GroupPanel () {
	const context = useContext(DatabaseViewContext)
	const active_view = context.views.find(view => view.name === context.selected_view)!

	const dragProps = {
		onDragEnd(fromIndex: number, toIndex:number) {
			const group_list = [...active_view.groups];
			const item = group_list.splice(fromIndex, 1)[0];
			group_list.splice(toIndex, 0, item);
			// dispatch(context.reducer.actions.set_group(group_list))
		},
		nodeSelector: "ol"
	};
	return (
		<div className={`flex items-center gap-2 p-1 transition-all overflow-hidden ${!active_view.groups_panel_status && 'h-0 !p-0'}`}>
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
}
