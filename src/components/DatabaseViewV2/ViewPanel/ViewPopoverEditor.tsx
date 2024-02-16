import React, { memo, useContext, useState } from 'react'
import { Input, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { HiTrash } from 'react-icons/hi2'
import { DatabaseViewContext, useDatabaseViewContext } from '@/components/DatabaseView/DatabaseViewContext'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'
import { ViewStateType } from '@/components/DatabaseView/Views/TableView/TableViewTypes'
import { activeViewState, databaseState } from '@/components/DatabaseViewV2/DatabaseState'
import { effect, Signal } from '@preact/signals-react'

export const ViewPopoverEditor = ( props: { children: React.ReactNode, view: Signal<ViewStateType>, isActive: boolean } ) => {
	const context = databaseState.value
	const active_view = activeViewState()
	const [status, set_status] = useState(false)
	console.log(context.selected_view)
	// effect(() => console.log(context.selected_view))
	const on_edit_view = (name: string) => {
		console.log(name)
		active_view.name = name
		// context.actions.on_edit_view({ name })
	}
	const on_delete_view = () => {
		set_status(false)
		const {name} = props.view.value
		// context.actions.on_delete_view({ name })
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
						value={props.view.value.name}
						onInput={(e) => on_edit_view(e.currentTarget.value)}
						crossOrigin={undefined}
					/>
					<SimpleLightButton onClick={on_delete_view}>
						<HiTrash className="w-5 h-5"/>
					</SimpleLightButton>
				</div>
			</PopoverContent>
		</Popover>
	)
}