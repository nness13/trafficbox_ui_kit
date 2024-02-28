import React from 'react'
import {FilterPopoverEditor} from '@/components/DatabaseView/ViewPanel/filter/FilterPopoverEditor'
import {FilterTag} from '@/components/DatabaseView/ViewPanel/filter/FilterTag'
import {FilterTagAdd} from '@/components/DatabaseView/ViewPanel/filter/FilterTagAdd'
import {FilterPopoverCreator} from '@/components/DatabaseView/ViewPanel/filter/FilterPopoverCreator'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";

export const FilterPanel = observer(() => {
	const active_view = useViewContext()


	return (
		<div className={`flex items-center gap-2 transition-all overflow-hidden ${!active_view.filter_panel_status ? 'h-0 p-0' : 'p-1'}`}>
			{active_view.filters.map((filter, key) =>
				<FilterPopoverEditor key={key} filter={filter}>
					<FilterTag filter={filter}/>
				</FilterPopoverEditor>
			)}
			<FilterPopoverCreator variant={"v2"}>
				<FilterTagAdd/>
			</FilterPopoverCreator>
		</div>
	)
})

