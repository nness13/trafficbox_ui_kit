import React, { useContext } from 'react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'
import { SortPopoverEditor } from '@/components/DatabaseView/sort/SortPopoverEditor'
import { SortTag } from '@/components/DatabaseView/sort/SortTag'
import { FilterPopoverEditor } from '@/components/DatabaseView/filter/FilterPopoverEditor'
import { FilterTag } from '@/components/DatabaseView/filter/FilterTag'
import { FilterTagAdd } from '@/components/DatabaseView/filter/FilterTagAdd'
import { FilterPopoverCreator } from '@/components/DatabaseView/filter/FilterPopoverCreator'

export function FilterPanel () {
	const context = useContext(DatabaseViewContext)
	const active_view = context.views.find(view => view.name === context.selected_view)!

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
