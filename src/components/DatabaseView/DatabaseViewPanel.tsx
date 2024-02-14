import React, { FC, ReactNode, useContext } from 'react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'
import { Button } from '@/components/Button'
import { ViewPopoverEditor } from '@/components/DatabaseView/ViewPopoverEditor'
import { ViewsIcon } from '@/components/DatabaseView/ViewIcon'
import { ViewPopoverCreator } from '@/components/DatabaseView/ViewPopoverCreator'
import { HiChevronDown, HiEllipsisHorizontal, HiPlus } from 'react-icons/hi2'
import { SortPopoverCreator } from '@/components/DatabaseView/sort/SortPopoverCreator'
import { SearchInput } from '@/components/DatabaseView/search/SearchInput'
import { GroupPopoverCreator } from '@/components/DatabaseView/group/GroupPopoverCreator'
import { Tab } from '@/components/Buttons/Tab'
import { DatabaseViewContextProps } from '@/components/DatabaseView/DatabaseViewTypes'

export interface DatabaseViewPanelProps {
	children?: ReactNode;
}

export const DatabaseViewPanel: FC<DatabaseViewPanelProps> = ({ children }) => {
	const context = useContext<DatabaseViewContextProps>(DatabaseViewContext)

	const active_view = context.views.find(view => view.id === context.selected_view)!

	return (
		<div>
			<div className="w-full flex justify-between border-b border-border_line">
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
				<div className="flex">
					<Tab
						className={`${active_view.filter_panel_status ? '!text-blue-500' : ''}`}
						onClick={() => active_view.actions.toggle_filter_panel_status(!active_view.filter_panel_status)}
					>
						Filter
					</Tab>

					<SortPopoverCreator>
						<Tab className={`${active_view.sort_panel_status ? "!text-blue-500" : ''}`}>
							Sort
						</Tab>
					</SortPopoverCreator>

					{active_view.groups.length === 0
						? <GroupPopoverCreator>
							<Tab
								className={`${active_view.groups_panel_status ? '!text-blue-500' : ''}`}
								onClick={() => active_view.actions.toggle_group_panel_status()}
							>
								Group
							</Tab>
						</GroupPopoverCreator>
						: <Tab
							className={`${active_view.groups_panel_status ? '!text-blue-500' : ''}`}
							onClick={() => active_view.actions.toggle_group_panel_status()}
						>
							Group
						</Tab>
					}


					<SearchInput/>

					<Tab>
						<HiEllipsisHorizontal className="h-5 w-5"/>
					</Tab>
					{/*<Tab*/}
					{/*	onClick={() => context.onLoad()}*/}
					{/*	className={select_view?.viewChanged ? "bg-light-green-600 hover:bg-light-green-700 hover:bg-opacity-100" : ""}*/}
					{/*>*/}
					{/*	<Tooltip content={`Остання загрузка: ${moment(context.last_load_database_datetime).format(date_format)}`}>*/}
					{/*		{select_view?.viewChanged*/}
					{/*			? <HiCheck className="h-5 w-5 text-white"/>*/}
					{/*			: <HiArrowPath className="h-5 w-5"/>*/}
					{/*		}*/}
					{/*	</Tooltip>*/}
					{/*</Tab>*/}

					{/*<ActionMenuPopover>*/}
						<Button className="w-fit">
							<HiChevronDown className="w-5 h-5"/>
							Дії
						</Button>
					{/*</ActionMenuPopover>*/}
				</div>
			</div>
			{/*<FilterPanel/>*/}
			{/*<GroupPanel/>*/}
		</div>
	);
};