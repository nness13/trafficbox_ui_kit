import React, {useState} from 'react'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {createSortType} from "@/components/DatabaseView/DatabaseViewTypes";
import {observer} from "mobx-react-lite";
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import { ColumnCaseIcon } from '@/components/DatabaseView/Views/ColumnCaseIcon'

export const SortPopoverCreator = observer(( props: { children: React.ReactNode, variant: "v1" | "v2" } ) => {
	const active_view = useViewContext()
	const [status, set_status] = useState(false)
	const on_create_sort = (sort: createSortType) => {
		set_status(false)
		active_view.add_sort(sort)
	}
	const handler = () => {
		if(props.variant === "v1") {
			active_view.toggle_filter_panel_status(!active_view.filter_panel_status && !status)
			set_status(active_view.filter_panel_status && !status)
		}
		if(props.variant === "v2") {
			set_status(!status)
		}
	}

	return (
		<Popover placement="bottom-start" open={status} handler={handler}>
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 max-h-[800px] overflow-auto z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div>
					<Input type={"search"} name="search" label="Filter by ..." crossOrigin={undefined}/>
					{active_view.columns.map((column: any) => (
						<ListItem
							placeholder={""}
							key={column.key}
							onClick={() => on_create_sort({
								column: column,
								value: "ascending",
							})}
							className={"flex gap-2"}
						>
							<ColumnCaseIcon column={column}/>
							<div>{column.label}</div>
						</ListItem>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
})