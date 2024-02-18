import React, { memo, useState } from 'react'
import { Input, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { HiTrash } from 'react-icons/hi2'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'
import { useActiveViewSelector, useDatabaseViewStore } from '@/components/DatabaseViewV2/DatabaseViewStore'

export const ViewPopoverEditor = memo(( props: { children: React.ReactNode, isActive: boolean } ) => {
	const on_edit_view = useDatabaseViewStore(state => state.on_edit_view)
	const status = useDatabaseViewStore(state => state.view_editable_status)
	const set_status = useDatabaseViewStore(state => state.toggle_view_editable_status)
	const active_view_name = useDatabaseViewStore(state => useActiveViewSelector(state).name)

	const on_delete_view = () => {
		set_status(false)
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
						value={active_view_name}
						onInput={(e) => on_edit_view({ name: e.currentTarget.value })}
						crossOrigin={undefined}
					/>
					<SimpleLightButton onClick={on_delete_view}>
						<HiTrash className="w-5 h-5"/>
					</SimpleLightButton>
				</div>
			</PopoverContent>
		</Popover>
	)
})