import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { GroupEditorSwitcher } from '@/components/DatabaseView/ViewPanel/group/GroupEditorSwitcher'
export function GroupPopoverEditor ( props: { children: React.ReactNode, group: any } ) {
	const update_group = (group: any) => {
		// dispatch( context.actions.update_group(group) )
	}
	const delete_group = (id: string) => {
		// dispatch( context.actions.remove_group({id}) )
	}

	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<GroupEditorSwitcher
					group={props.group}
					update_group={update_group}
					delete_group={delete_group}
				/>
			</PopoverContent>
		</Popover>
	)
}
