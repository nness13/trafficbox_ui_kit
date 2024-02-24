import React from 'react'
import {Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'

export function SearchPopoverEditor ( props: { children: React.ReactNode, sort: any } ) {

	const update_sort = (sort: any) => {
		// dispatch( context.actions.update_sort(sort) )
	}
	const delete_sort = (id: string) => {
		// dispatch( context.actions.remove_sort({id}) )
	}

	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div></div>
				{/*<SortEditorSwitcher sort={props.sort} update_sort={update_sort} delete_sort={delete_sort}/>*/}
			</PopoverContent>
		</Popover>
	)
}
