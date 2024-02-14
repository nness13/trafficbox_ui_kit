import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'
import { Input, ListItem, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'


export function GroupPopoverCreator ( props: { children: React.ReactNode } ) {
	const context = useContext(DatabaseViewContext)
	const active_view = context.views.find(view => view.name === context.selected_view)!
	const [status, set_status] = useState(false)
	const [option_list, set_option_list] = useState(active_view.columns)
	useEffect(() => {
		set_option_list(active_view.columns)
	}, [active_view.columns])
	const on_create_group = (group: any) => {
		set_status(false)
		// dispatch(context.actions.add_group(group))
	}
	const [group_text, set_group_text] = useState("")
	const onGroup = (e: any) => {
		set_group_text(e.currentTarget.value)
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
					<Input type={"search"} name="search" value={group_text} onInput={onGroup} label="Group by ..." crossOrigin={undefined}/>
					{option_list.map((el: any) => (
						<ListItem
							key={el.key}
							onClick={() => on_create_group({
								_id: uuidv4(),
								column: el,
							})}
							placeholder={""}
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