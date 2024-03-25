import React, {FC, ReactNode, useEffect} from 'react'
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
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCase/ColumnCaseContext";
import {
	ColumnCaseHandlers,
	ColumnType,
	filterType,
	groupType,
	RowType,
	sortType
} from "@/components/DatabaseView/DatabaseViewTypes";
import {ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import _ from "lodash"
import {PaginationPanel} from "@/components/DatabaseView/ViewPanel/PaginationView";
import { use_view_effects } from '@/components/DatabaseView/ViewPanel/ViewPanel.utils'
import { ActionMenuPopover } from '@/components/DatabaseView/ViewPanel/ActionMenuPopover'

export interface DatabaseViewPanelProps {
	children?: ReactNode;
}

export const ViewPanel: FC<DatabaseViewPanelProps> = observer(() => {
	const viewContext = useViewContext()
	const defaultColumnCase = useColumnCaseContext()

	useEffect(() => {
		const {rows, columns} = use_view_effects( viewContext, defaultColumnCase )
		viewContext.on_edit_view({rows, columns})
	}, [viewContext.filters, viewContext.sort, viewContext.groups, viewContext.search.value]);

	return (
		<div>
			<div className="w-full flex justify-between border-b border-border_line">
				<PaginationPanel/>
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

					<ActionMenuPopover>
						<Button className="w-fit">
							<HiChevronDown className="w-5 h-5"/>
							Дії
						</Button>
					</ActionMenuPopover>
				</div>
			</div>
			<SortPanel/>
			<FilterPanel/>
			<GroupPanel/>
		</div>
	);
});