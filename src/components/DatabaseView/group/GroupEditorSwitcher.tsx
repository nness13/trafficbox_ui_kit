import { HiEllipsisVertical, HiTrash } from 'react-icons/hi2'
import React from 'react'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'

type props_type = {
	group: any,
	update_group: (group: any) => void,
	delete_group: (id: string) => void
}
export function GroupEditorSwitcher (props: props_type) {
	switch (props.group.column.type.type) {
		case "text":
			return <TextFilterEditor {...props}/>;
		default:
			return <TextFilterEditor {...props}/>
	}
}


export function TextFilterEditor (props: props_type) {

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row justify-between">
				<div className="flex flex-row gap-2 items-center">
					<div>{props.group.column.label}</div>
				</div>
				<div className="flex flex-row">
					<SimpleLightButton>
						<HiEllipsisVertical className="h-5 w-5"/>
					</SimpleLightButton>
					<SimpleLightButton onClick={() => props.delete_group(props.group._id)}>
						<HiTrash className="h-5 w-5"/>
					</SimpleLightButton>
				</div>
			</div>
		</div>
	)
}