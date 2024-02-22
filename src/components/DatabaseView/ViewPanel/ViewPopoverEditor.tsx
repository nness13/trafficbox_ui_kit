import React, { memo, useState } from 'react'
import {Input, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import { HiTrash } from 'react-icons/hi2'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'
import { useActiveViewSelector, useDatabaseViewStore } from '@/components/DatabaseView/DatabaseViewStore'
import {InputOnBlur} from "@/components/Inputs/InputOnBlur";

export const ViewPopoverEditor = memo(( props: { children: React.ReactNode, isActive: boolean } ) => {
	const on_edit_view = useDatabaseViewStore(state => state.on_edit_view)
	const active_view_name = useDatabaseViewStore(state => useActiveViewSelector(state).name)
	const active_view_id = useDatabaseViewStore(state => useActiveViewSelector(state).id)
	const on_delete_view_action = useDatabaseViewStore(state => state.on_delete_view)

	const [status, set_status] = useState(false)

	const on_delete_view = () => {
		set_status(false)
		on_delete_view_action(active_view_id)
	}
	const open = (e: any) => {
		if(props.isActive){
			e.preventDefault()
			e.stopPropagation()
			set_status(true)
		}
	}

	return (
		<Popover
			placement="bottom-start"
			open={status}
			handler={(s) => status && set_status(s)}
		>
			<PopoverHandler
				onClick={open}
			>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 max-h-[800px] overflow-auto z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div className="flex flex-row gap-2 items-center">
					<InputOnBlur
						name="name"
						label="Name view"
						value={active_view_name}
						onDone={(value) => on_edit_view({ name: value })}
						crossOrigin={""}
					/>
					<SimpleLightButton onClick={on_delete_view}>
						<HiTrash className="w-5 h-5"/>
					</SimpleLightButton>
				</div>
			</PopoverContent>
		</Popover>
	)
})