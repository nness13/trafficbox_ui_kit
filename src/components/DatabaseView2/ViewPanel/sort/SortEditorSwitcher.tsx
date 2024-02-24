import React from 'react'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'
import { SimpleLightButton } from '@/components/Buttons/SimpleLightButton'
import { HiEllipsisVertical, HiTrash } from 'react-icons/hi2'

type props_type = {
	sort: any
	update_sort: (sort: any) => void,
	delete_sort: (id: string) => void
}
export function SortEditorSwitcher (props: props_type) {
	switch (props.sort.column.type.type) {
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
					<div>{props.sort.column.label}</div>
					<LightBlueTag>{props.sort.value}</LightBlueTag>
				</div>
				<div className="flex flex-row">
					<SimpleLightButton>
						<HiEllipsisVertical className="h-5 w-5"/>
					</SimpleLightButton>
					<SimpleLightButton onClick={() => props.delete_sort(props.sort._id)}>
						<HiTrash className="h-5 w-5"/>
					</SimpleLightButton>
				</div>
			</div>
			{/*<SelectWithBorder*/}
			{/*	multiply={false}*/}
			{/*	value={[props.sort.value].map(el => ({ key: el, value: el, label: el }))}*/}
			{/*	options={["ascending", "descending"].map(el => ({ key: el, value: el, label: el }))}*/}
			{/*	onSelect={(data) => props.update_sort({_id: props.sort._id, value: data[0]?.value as typeof props.sort.value})}*/}
			{/*/>*/}
		</div>
	)
}