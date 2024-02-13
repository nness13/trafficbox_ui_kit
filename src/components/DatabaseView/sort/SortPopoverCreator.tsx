import React, { useContext, useState } from 'react'
import { Input, ListItem, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseView'

export function SortPopoverCreator ( props: { children: React.ReactNode } ) {
	const context = useContext(DatabaseViewContext)
	const [status, set_status] = useState(false)
	const on_create_sort = (sort: any) => {
		set_status(false)
		// dispatch(context.actions.add_sort(sort))
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
					<Input type={"search"} name="search" label="Filter by ..." crossOrigin={undefined}/>
					{/*{context.view.view_columns.map((el: any) => (*/}
					{/*	<ListItem*/}
					{/*		placeholder*/}
					{/*		key={el.key}*/}
					{/*		onClick={() => on_create_sort({*/}
					{/*			_id: uuidv4(),*/}
					{/*			column: el,*/}
					{/*			value: "ascending",*/}
					{/*		})}*/}
					{/*	>*/}
					{/*		/!*<IconColumnType type={el.type.type}/>*!/*/}
					{/*		<div>{el.label}</div>*/}
					{/*	</ListItem>*/}
					{/*))}*/}
				</div>
			</PopoverContent>
		</Popover>
	)
}