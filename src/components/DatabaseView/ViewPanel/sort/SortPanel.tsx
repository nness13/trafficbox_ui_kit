import React from 'react'
import {observer} from "mobx-react-lite";
import {SortPopoverEditor} from '@/components/DatabaseView/ViewPanel/sort/SortPopoverEditor'
import {SortTag} from '@/components/DatabaseView/ViewPanel/sort/SortTag'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {SortPopoverCreator} from "@/components/DatabaseView/ViewPanel/sort/SortPopoverCreator";
import {SortTagAdd} from "@/components/DatabaseView/ViewPanel/sort/SortTagAdd";

export const SortPanel = observer(() => {
	const active_view = useViewContext()

	return (
		<div className={`flex items-center gap-2 transition-all overflow-hidden ${!active_view.sort_panel_status ? 'h-0 p-0' : 'p-1'}`}>
			{active_view.sort.map((sort, key) =>
				<SortPopoverEditor key={key} sort={sort}>
					<SortTag sort={sort}/>
				</SortPopoverEditor>
			)}
			<SortPopoverCreator variant={"v2"}>
				<SortTagAdd/>
			</SortPopoverCreator>
		</div>
	)
})