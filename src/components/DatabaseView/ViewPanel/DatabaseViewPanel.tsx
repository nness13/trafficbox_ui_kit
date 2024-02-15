import React, { FC, memo, ReactNode } from 'react'
import { useActiveViewContext, useDatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'
import { Button } from '@/components/Button'
import { HiChevronDown, HiEllipsisHorizontal } from 'react-icons/hi2'
import { SortPopoverCreator } from '@/components/DatabaseView/sort/SortPopoverCreator'
import { SearchInput } from '@/components/DatabaseView/search/SearchInput'
import { GroupPopoverCreator } from '@/components/DatabaseView/group/GroupPopoverCreator'
import { Tab } from '@/components/Buttons/Tab'
import { ViewSwitcherPanel } from '@/components/DatabaseView/ViewPanel/ViewSwitcherPanel'

export interface DatabaseViewPanelProps {
	children?: ReactNode;
}

export const DatabaseViewPanel: FC<DatabaseViewPanelProps> = memo(({ children }) => {
	const context = useDatabaseViewContext()
	const active_view = useActiveViewContext()

	return (
		<div>
			<div className="w-full flex justify-between border-b border-border_line">
				<ViewSwitcherPanel/>

				<div className="flex">
					<Tab
						className={`${active_view.filter_panel_status ? '!text-blue-500' : ''}`}
						onClick={() => context.actions.toggle_filter_panel_status(!active_view.filter_panel_status)}
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
								onClick={() => context.actions.toggle_group_panel_status()}
							>
								Group
							</Tab>
						</GroupPopoverCreator>
						: <Tab
							className={`${active_view.groups_panel_status ? '!text-blue-500' : ''}`}
							onClick={() => context.actions.toggle_group_panel_status()}
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
});