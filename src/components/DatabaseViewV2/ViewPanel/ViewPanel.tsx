import React, { FC, memo, ReactNode } from 'react'
import { Button } from '@/components/Button'
import { HiChevronDown, HiEllipsisHorizontal } from 'react-icons/hi2'
import { SortPopoverCreator } from '@/components/DatabaseViewV2/ViewPanel/sort/SortPopoverCreator'
import { SearchInput } from '@/components/DatabaseViewV2/ViewPanel/search/SearchInput'
import { GroupPopoverCreator } from '@/components/DatabaseViewV2/ViewPanel/group/GroupPopoverCreator'
import { Tab } from '@/components/Buttons/Tab'
import { useViewState } from '@/components/DatabaseViewV2/Views/ViewState'

export interface DatabaseViewPanelProps {
	children?: ReactNode;
}

export const ViewPanel: FC<DatabaseViewPanelProps> = memo(() => {
	const filter_panel_status = useViewState(state => state.filter_panel_status)
	const toggle_filter_panel_status = useViewState(state => state.toggle_filter_panel_status)
	const sort_panel_status = useViewState(state => state.sort_panel_status)
	const groups = useViewState(state => state.groups)
	const groups_panel_status = useViewState(state => state.groups_panel_status)
	const toggle_group_panel_status = useViewState(state => state.toggle_group_panel_status)


	return (
		<div>
			<div className="w-full flex justify-end border-b border-border_line">
				<div className="flex">
					<Tab
						className={`${filter_panel_status ? '!text-blue-500' : ''}`}
						onClick={() => toggle_filter_panel_status(!filter_panel_status)}
					>
						Filter
					</Tab>

					<SortPopoverCreator>
						<Tab className={`${sort_panel_status ? "!text-blue-500" : ''}`}>
							Sort
						</Tab>
					</SortPopoverCreator>

					{groups.length === 0
						? <GroupPopoverCreator>
							<Tab
								className={`${groups_panel_status ? '!text-blue-500' : ''}`}
								onClick={() => toggle_group_panel_status()}
							>
								Group
							</Tab>
						</GroupPopoverCreator>
						: <Tab
							className={`${groups_panel_status ? '!text-blue-500' : ''}`}
							onClick={() => toggle_group_panel_status()}
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