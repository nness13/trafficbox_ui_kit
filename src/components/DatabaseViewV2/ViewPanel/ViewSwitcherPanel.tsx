import { ViewPopoverEditor } from '@/components/DatabaseViewV2/ViewPanel/ViewPopoverEditor'
import { Tab } from '@/components/Buttons/Tab'
import { ViewsIcon } from '@/components/DatabaseView/ViewIcon'
import { ViewPopoverCreator } from '@/components/DatabaseViewV2/ViewPanel/ViewPopoverCreator'
import { HiPlus } from 'react-icons/hi2'
import React from 'react'
import { databaseState } from '@/components/DatabaseViewV2/DatabaseState'

export const ViewSwitcherPanel = () => {
	const context = databaseState.value
	const onSelectView = (id: string) => {
		context.selected_view = id
	}

	return (
		<div className="flex">
			{context.views.map(v => {
				const view = v.value
				const is_select = view.id === context.selected_view
				return (
					<ViewPopoverEditor
						key={view.name}
						view={v}
						isActive={is_select}
					>
						<Tab
							className={`${is_select ? 'text-text_passive border-b-2 border-solid border-gray-900 dark:border-[#4e4d4b]' : ''}`}
							onClick={() => onSelectView(view.id)}
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