import React, {FC, ReactNode, useEffect} from 'react'
import {autorun} from "mobx";
import {observer} from "mobx-react-lite";
import {Button} from '@/components/Button'
import {Badge} from "@material-tailwind/react";
import {HiChevronDown, HiEllipsisHorizontal} from 'react-icons/hi2'
import {SearchInput} from '@/components/DatabaseView/ViewPanel/search/SearchInput'
import {Tab} from '@/components/Buttons/Tab'
import {FilterPanel} from "@/components/DatabaseView/ViewPanel/filter/FilterPanel";
import {GroupPanel} from "@/components/DatabaseView/ViewPanel/group/GroupPanel";
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {SortPanel} from "@/components/DatabaseView/ViewPanel/sort/SortPanel";
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import {ColumnCaseHandlers, filterType, RowType} from "@/components/DatabaseView/DatabaseViewTypes";

export interface DatabaseViewPanelProps {
	children?: ReactNode;
}

export const ViewPanel: FC<DatabaseViewPanelProps> = observer(() => {
	const viewContext = useViewContext()
	const defaultColumnCase = useColumnCaseContext()
	useEffect(() => autorun(() => {
		console.log("changed filters")
		const filtered_rows = use_filters(viewContext.init_rows, viewContext.filters, defaultColumnCase)
		viewContext.on_edit_view({
			rows: filtered_rows
		})
	}), []);
	return (
		<div>
			<div className="w-full flex justify-end border-b border-border_line">
				<div className="flex">
					<Tab
						style={viewContext.filter_panel_status ? {color: "rgb(33 150 243)" } : {}}
						onClick={() => viewContext.toggle_filter_panel_status(!viewContext.filter_panel_status)}
					>
						{viewContext.filters.length
							? <Badge content={viewContext.filters.length}>
								Filters
							</Badge>
							: <div>
								Filters
							</div>
						}
					</Tab>

					<Tab
						style={viewContext.sort_panel_status ? {color: "rgb(33 150 243)" } : {}}
						onClick={() => viewContext.toggle_sort_panel_status(!viewContext.sort_panel_status)}
					>
						{viewContext.sort.length
							? <Badge content={viewContext.sort.length}>
								Sort
							</Badge>
							: <div>
								Sort
							</div>
						}
					</Tab>

					<Tab
						style={viewContext.groups_panel_status ? {color: "rgb(33 150 243)" } : {}}
						onClick={() => viewContext.toggle_group_panel_status(!viewContext.groups_panel_status)}
					>
						{viewContext.groups.length
							? <Badge content={viewContext.groups.length}>
								Group
							</Badge>
							: <div>
								Group
							</div>
						}
					</Tab>

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
			<SortPanel/>
			<FilterPanel/>
			<GroupPanel/>
		</div>
	);
});


export const use_filters = (rows: RowType[], filters: filterType[], DefaultColumnCase: ColumnCaseHandlers, rows2?: RowType[]) => {
	return rows.filter(row => {
		return filters.every(filter => {
			return DefaultColumnCase[filter.column.type.type].filter(row, filter)
		})
	})
}