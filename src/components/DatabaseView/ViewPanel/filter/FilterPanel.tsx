import React from 'react'
import { SortPopoverEditor } from '@/components/DatabaseView/ViewPanel/sort/SortPopoverEditor'
import { SortTag } from '@/components/DatabaseView/ViewPanel/sort/SortTag'
import { FilterPopoverEditor } from '@/components/DatabaseView/ViewPanel/filter/FilterPopoverEditor'
import { FilterTag } from '@/components/DatabaseView/ViewPanel/filter/FilterTag'
import { FilterTagAdd } from '@/components/DatabaseView/ViewPanel/filter/FilterTagAdd'
import { FilterPopoverCreator } from '@/components/DatabaseView/ViewPanel/filter/FilterPopoverCreator'
import {useActiveViewPartial, useDatabaseViewStore} from "@/components/DatabaseView/DatabaseViewStore";
import {ActiveViewState} from "@/components/DatabaseView2/DatabaseViewStore";

export function FilterPanel () {
	const active_view = ActiveViewState()

	// useEffect(() => {
	// 	context.onLoad()
	// }, [context.view.filters.list, context.view.sort.list])
	return (
		<div className={`flex items-center gap-2 p-1 transition-all overflow-hidden ${!active_view.filter_panel_status && 'h-0 !p-0'}`}>
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
}
