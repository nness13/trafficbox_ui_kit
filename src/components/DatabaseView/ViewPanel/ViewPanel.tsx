import { ViewPopoverEditor } from '@/components/DatabaseView/ViewPopoverEditor'
import { Tab } from '@/components/Buttons/Tab'
import { ViewsIcon } from '@/components/DatabaseView/ViewIcon'
import { ViewPopoverCreator } from '@/components/DatabaseView/ViewPopoverCreator'
import { HiPlus } from 'react-icons/hi2'
import React, { useContext } from 'react'
import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseViewTypes'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'

export const ViewPanel = () => {
	const context = useContext<DatabaseViewContextProps>(DatabaseViewContext)

	return (
		<div className="flex">
			{context.views.map(view => {
				const is_select = view.id === context.selected_view
				return (
					<ViewPopoverEditor
						key={view.name}
						view={view}
						isActive={is_select}
					>
						<Tab
							className={`${is_select ? 'text-text_passive border-b-2 border-solid border-gray-900 dark:border-[#4e4d4b]' : ''}`}
							onClick={() => context.actions.onSelectView(view.id)}
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
}