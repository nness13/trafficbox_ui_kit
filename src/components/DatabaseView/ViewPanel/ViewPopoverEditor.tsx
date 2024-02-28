import React, {memo, useState} from 'react'
import {Input, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {HiTrash} from 'react-icons/hi2'
import {SimpleLightButton} from '@/components/Buttons/SimpleLightButton'
import {ActiveViewState, DatabaseViewState} from '@/components/DatabaseView/DatabaseViewStore'
import {InputOnBlur} from "@/components/Inputs/InputOnBlur";
import {observer} from "mobx-react-lite";

export const ViewPopoverEditor = observer(( props: { children: React.ReactNode, isActive: boolean } ) => {
	const { on_edit_active_view, on_delete_view: on_delete_view_action } = DatabaseViewState
	const {name, id} = ActiveViewState()!

	const [status, set_status] = useState(false)

	const on_delete_view = () => {
		set_status(false)
		on_delete_view_action(id)
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
					<Input
						name="name"
						label="Name view"
						value={name}
						onInput={(e) => on_edit_active_view({ name: e.currentTarget.value })}
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