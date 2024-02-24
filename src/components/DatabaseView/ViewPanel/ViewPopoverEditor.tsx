import React, { memo, useState } from 'react'
import {Input, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import { HiTrash } from 'react-icons/hi2'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'
import { useActiveViewSelector, useDatabaseViewStore } from '@/components/DatabaseView/DatabaseViewStore'
import {InputOnBlur} from "@/components/Inputs/InputOnBlur";
import {ActiveViewState, DatabaseViewState} from "@/components/DatabaseView2/DatabaseViewStore";

export const ViewPopoverEditor = memo(( props: { children: React.ReactNode, isActive: boolean } ) => {
	const on_edit_view = DatabaseViewState.on_edit_active_view
	const active_view_name = ActiveViewState().name
	const active_view_id = ActiveViewState().id
	const on_delete_view_action = DatabaseViewState.on_delete_view

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