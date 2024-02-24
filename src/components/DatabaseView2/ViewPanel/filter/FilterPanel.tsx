import React from 'react'
import {SortPopoverEditor} from '@/components/DatabaseView2/ViewPanel/sort/SortPopoverEditor'
import {SortTag} from '@/components/DatabaseView2/ViewPanel/sort/SortTag'
import {FilterPopoverEditor} from '@/components/DatabaseView2/ViewPanel/filter/FilterPopoverEditor'
import {FilterTag} from '@/components/DatabaseView2/ViewPanel/filter/FilterTag'
import {FilterTagAdd} from '@/components/DatabaseView2/ViewPanel/filter/FilterTagAdd'
import {FilterPopoverCreator} from '@/components/DatabaseView2/ViewPanel/filter/FilterPopoverCreator'
import {useViewContext} from "@/components/DatabaseView2/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";

export const FilterPanel = observer(() => {
	const active_view = useViewContext()

	// useEffect(() => {
	// 	context.onLoad()
	// }, [context.view.filters.list, context.view.sort.list])
	return (
		<div className={`flex items-center gap-2 transition-all overflow-hidden ${!active_view.filter_panel_status ? 'h-0 p-0' : 'p-1'}`}>
			{active_view.sort.map((sort, key) =>
				<SortPopoverEditor key={key} sort={sort}>
					<SortTag sort={sort}/>
				</SortPopoverEditor>
			)}
			{active_view.sort.length > 0 ? '|' : ''}
			{active_view.filters.map((filter, key) =>
				<FilterPopoverEditor key={key} filter={filter}>
					<FilterTag filter={filter}/>
				</FilterPopoverEditor>
			)}
			<FilterPopoverCreator>
				<FilterTagAdd/>
			</FilterPopoverCreator>
		</div>
	)
})