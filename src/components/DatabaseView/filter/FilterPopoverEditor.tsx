import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { DatabaseViewContext } from '@/components/DatabaseView/DatabaseView'
import { FilterEditorSwitcher } from '@/components/DatabaseView/filter/FilterEditorSwitcher'

export function FilterPopoverEditor ( props: { children: React.ReactNode, filter: any } ) {
	const context = useContext(DatabaseViewContext)
	const update_filter = (filter: any) => {
		// dispatch( context.actions.update_filter(filter) )
	}
	const delete_filter = (id: string) => {
		// dispatch( context.actions.remove_filter({id}) )
	}

	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<FilterEditorSwitcher filter={props.filter} update_filter={update_filter} delete_filter={delete_filter}/>
			</PopoverContent>
		</Popover>
	)
}
