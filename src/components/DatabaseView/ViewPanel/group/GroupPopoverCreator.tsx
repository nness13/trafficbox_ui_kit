import React, {FC, useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
import { ColumnCaseIcon } from '@/components/DatabaseView/Views/ColumnCaseIcon'

export const GroupPopoverCreator: FC<{ children: React.ReactNode }> = observer(( props  ) => {
	const active_view = useViewContext()
	const columns = active_view.columns
	const [status, set_status] = useState(false)
	const [option_list, set_option_list] = useState(columns)
	useEffect(() => {
		set_option_list(columns)
	}, [columns])
	const on_create_group = (group: any) => {
		set_status(false)
		active_view.add_group(group)
	}
	const [group_text, set_group_text] = useState("")
	const onGroup = (e: any) => {
		set_group_text(e.currentTarget.value)
		set_option_list(
			columns.filter(c => c.label.includes(e.currentTarget.value))
		)
	}
	const handler = () => {
		set_status(active_view.groups_panel_status && !status)
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
					<Input type={"search"} name="search" value={group_text} onInput={onGroup} label="Group by ..." crossOrigin={undefined}/>
					{option_list.map((column: any) => (
						<ListItem
							key={column.key}
							onClick={() => on_create_group({
								column: column,
							})}
							className={"flex gap-2"}
							placeholder={""}
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