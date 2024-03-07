import React, {useEffect, useState} from 'react'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {v4 as uuidv4} from 'uuid';
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {createFilterType, filterType} from "@/components/DatabaseView/DatabaseViewTypes";
import {observer} from "mobx-react-lite";
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import { ColumnCaseIcon } from '@/components/DatabaseView/Views/ColumnCaseIcon'


export const FilterPopoverCreator = observer(( props: { children: React.ReactNode, variant: "v1" | "v2" } ) => {
	const active_view = useViewContext()
	const column_case_handlers = useColumnCaseContext()
	const [status, set_status] = useState(false)
	const [option_list, set_option_list] = useState(active_view.columns)
	useEffect(() => {
		set_option_list(active_view.columns)
	}, [active_view.columns])
	const on_create_filter = (filter: createFilterType) => {
		set_status(false)
		active_view.add_filter(filter)
	}
	const [filter_text, set_filter_text] = useState("")
	const onFilter = (e: any) => {
		set_filter_text(e.currentTarget.value)
		set_option_list(
			active_view.columns.filter(c => c.label.includes(e.currentTarget.value))
		)
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
					<Input type={"search"} name="search" value={filter_text} onInput={onFilter} label="Filter by ..." crossOrigin={undefined}/>
					{option_list.map((column: any) => (
						<ListItem
							placeholder={""}
							key={column.key}
							className={"flex gap-2"}
							onClick={() => on_create_filter({
								value: "",
								column: column,
								condition: "is"
							})}
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