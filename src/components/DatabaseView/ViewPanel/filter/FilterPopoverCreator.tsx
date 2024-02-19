import React, {useEffect, useState} from 'react'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {v4 as uuidv4} from 'uuid';
import {useActiveViewPartial} from "@/components/DatabaseView/DatabaseViewStore";


export function FilterPopoverCreator ( props: { children: React.ReactNode } ) {
	const active_view = useActiveViewPartial()
	const [status, set_status] = useState(false)
	const [option_list, set_option_list] = useState(active_view.columns)
	useEffect(() => {
		set_option_list(active_view.columns)
	}, [active_view.columns])
	const on_create_filter = (filter: any) => {
		set_status(false)
		// dispatch(context.actions.add_filter(filter))
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
							onClick={() => on_create_filter({
								_id: uuidv4(),
								value: "",
								column: el,
								condition: "is"
							})}
						>
							{/*<IconColumnType type={el.type.type}/>*/}
							<div>{el.label}</div>
						</ListItem>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}