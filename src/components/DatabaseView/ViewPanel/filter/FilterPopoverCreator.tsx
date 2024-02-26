import React, {useEffect, useState} from 'react'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {v4 as uuidv4} from 'uuid';
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {createFilterType, filterType} from "@/components/DatabaseView/DatabaseViewTypes";
import {observer} from "mobx-react-lite";


export const FilterPopoverCreator = observer(( props: { children: React.ReactNode } ) => {
	const active_view = useViewContext()
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

	return (
		<Popover placement="bottom-start" open={status} handler={() => set_status(!status)}>
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 max-h-[800px] overflow-auto z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div>
					<Input type={"search"} name="search" value={filter_text} onInput={onFilter} label="Filter by ..." crossOrigin={undefined}/>
					{option_list.map((el: any) => (
						<ListItem
							placeholder={""}
							key={el.key}
							className={"flex gap-2"}
							onClick={() => on_create_filter({
								value: "",
								column: el,
								condition: "is"
							})}
						>
							{active_view.column_case_handlers[el.type.type].Icon({className: "w-4 h-4"})}
							{/*<IconColumnType type={el.type.type}/>*/}
							<div>{el.label}</div>
						</ListItem>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
})