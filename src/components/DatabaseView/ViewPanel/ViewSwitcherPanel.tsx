import { ViewPopoverEditor } from '@/components/DatabaseView/ViewPanel/ViewPopoverEditor'
import { Tab } from '@/components/Buttons/Tab'
import { ViewsIcon } from '@/components/DatabaseView/ViewIcon'
import { ViewPopoverCreator } from '@/components/DatabaseView/ViewPanel/ViewPopoverCreator'
import { HiPlus } from 'react-icons/hi2'
import React, { memo } from 'react'
import { useDatabaseViewStore } from '@/components/DatabaseView/DatabaseViewStore'

export const ViewSwitcherPanel = memo(() => {
	const selected_view = useDatabaseViewStore(state => state.selected_view)
	const views = useDatabaseViewStore(state => state.views)
	const on_select_view = useDatabaseViewStore(state => state.on_select_view)

	return (
		<div className="flex">
			{views.map(view => {
				const is_select = view.id === selected_view
				return (
					<ViewPopoverEditor
						key={view.id}
						isActive={is_select}
					>
						<Tab
							className={`${is_select ? 'text-text_passive border-b-2 border-solid border-gray-900 dark:border-[#4e4d4b]' : ''}`}
							onClick={() => on_select_view(view.id)}
						>
							<ViewsIcon type={view.type}/>
							{view.name}
						</Tab>
					</ViewPopoverEditor>
				)
			})}
			<ViewPopoverCreator>
				<Tab>
					<HiPlus className="h-5 w-5"/>
				</Tab>
			</ViewPopoverCreator>
		</div>
	)
})