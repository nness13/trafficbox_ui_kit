import React, {memo, useState} from 'react'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {ViewsIcon} from '@/components/DatabaseView/ViewIcon'
import {ViewTypesType} from '@/components/DatabaseView/DatabaseViewTypes'
import {useDatabaseViewStore} from "@/components/DatabaseView/DatabaseViewStore";
import {views} from "@/components/DatabaseView/Views/views";

export const ViewPopoverCreator = memo(( props: { children: React.ReactNode } ) => {
	const [status, set_status] = useState(false)
	const on_create_view_action = useDatabaseViewStore(state => state.on_create_view)
	const on_create_view = (type: ViewTypesType ) => {
		set_status(false)
		on_create_view_action(type)
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
					<Input type={"search"} name="search" label="View by ..." crossOrigin={undefined}/>
					{(Object.keys(views) as ViewTypesType[]).map((el) => (
						<ListItem
							key={el}
							onClick={() => on_create_view(el)}
							placeholder={""}
						>
							<ViewsIcon type={el}/>
							<div>{el}</div>
						</ListItem>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
})