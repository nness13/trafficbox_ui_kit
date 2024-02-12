import React, { FC, ReactNode, useContext } from 'react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseView'
import { Tooltip } from '@material-tailwind/react'
import { Button } from '@/components/Button'

export interface DatabaseViewPanelProps {
	children?: ReactNode;
}

export const DatabaseViewPanel: FC<DatabaseViewPanelProps> = ({ children }) => {
	const context = useContext(DatabaseViewContext)

	return (
		<div>
			DatabaseViewPanel
			<div className="w-full flex justify-between border-b border-border_line">
				<div className="flex">
			{/*		{context.views.map(view => {*/}
			{/*			const is_select = view.id === context.select_view*/}
			{/*			return (*/}
			{/*				<ViewPopoverEditor*/}
			{/*					key={view.id}*/}
			{/*					view={view}*/}
			{/*					isActive={is_select}*/}
			{/*				>*/}
			{/*					<Tab*/}
			{/*						className={`${is_select ? 'text-text_passive border-b-2 border-solid border-gray-900 dark:border-[#4e4d4b]' : ''}`}*/}
			{/*						onClick={() => context.onSelectView(view.id)}*/}
			{/*					>*/}
			{/*						<ViewsIcon type={view.view}/>*/}
			{/*						{view.name}*/}
			{/*					</Tab>*/}
			{/*				</ViewPopoverEditor>*/}
			{/*			)*/}
			{/*		})}*/}
			{/*		<ViewPopoverCreator>*/}
			{/*			<Tab>*/}
			{/*				<PlusIcon className="h-5 w-5"/>*/}
			{/*			</Tab>*/}
			{/*		</ViewPopoverCreator>*/}
				</div>
				<div className="flex">
			{/*		<Tab*/}
			{/*			className={`${context.view.filters.panel_status ? '!text-blue-500' : ''}`}*/}
			{/*			onClick={toggle_filter_panel_status}*/}
			{/*		>*/}
			{/*			Filter*/}
			{/*		</Tab>*/}

			{/*		<SortPopoverCreator>*/}
			{/*			<Tab className={`${context.view.sort.panel_status ? "!text-blue-500" : ''}`}>*/}
			{/*				Sort*/}
			{/*			</Tab>*/}
			{/*		</SortPopoverCreator>*/}

			{/*		{context.view.groups.list.length === 0*/}
			{/*			? <GroupPopoverCreator>*/}
			{/*				<Tab*/}
			{/*					className={`${context.view.groups.panel_status ? '!text-blue-500' : ''}`}*/}
			{/*					onClick={toggle_group_panel_status}*/}
			{/*				>*/}
			{/*					Group*/}
			{/*				</Tab>*/}
			{/*			</GroupPopoverCreator>*/}
			{/*			: <Tab*/}
			{/*				className={`${context.view.groups.panel_status ? '!text-blue-500' : ''}`}*/}
			{/*				onClick={toggle_group_panel_status}*/}
			{/*			>*/}
			{/*				Group*/}
			{/*			</Tab>*/}
			{/*		}*/}

			{/*		<SearchInput/>*/}
			{/*		<DatabaseFloatEditPanel/>*/}

			{/*		<Tab>*/}
			{/*			<EllipsisHorizontalIcon className="h-5 w-5"/>*/}
			{/*		</Tab>*/}
			{/*		<Tab*/}
			{/*			onClick={() => context.onLoad()}*/}
			{/*			className={select_view?.viewChanged ? "bg-light-green-600 hover:bg-light-green-700 hover:bg-opacity-100" : ""}*/}
			{/*		>*/}
			{/*			<Tooltip content={`Остання загрузка: ${moment(context.last_load_database_datetime).format(date_format)}`}>*/}
			{/*				{select_view?.viewChanged*/}
			{/*					? <CheckIcon className="h-5 w-5 text-white"/>*/}
			{/*					: <ArrowPathIcon className="h-5 w-5"/>*/}
			{/*				}*/}
			{/*			</Tooltip>*/}
			{/*		</Tab>*/}

			{/*		<ActionMenuPopover>*/}
			{/*			<Button className="w-fit">*/}
			{/*				<ChevronDownIcon className="w-5 h-5"/>*/}
			{/*				Дії*/}
			{/*			</Button>*/}
			{/*		</ActionMenuPopover>*/}
				</div>
			</div>
			{/*<FilterPanel/>*/}
			{/*<GroupPanel/>*/}
		</div>
	);
};



type propsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Tab = ({ className = '', ...rest_props }: propsType) =>
	<div
		{...rest_props}
		className={className+`
			flex
			flex-row
			items-center
			cursor-pointer
			p-2
			h-full
			rounded-tl-md
			rounded-tr-md
			text-text_passive
			hover:bg-gray-500
			hover:bg-opacity-20
		`}
	/>