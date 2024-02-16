import React from 'react'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'
import { HiArrowDown, HiArrowUp } from 'react-icons/hi2'

type props_type = {
	sort: any
}
export const SortTag = (props: props_type) => {
	return (
		<LightBlueTag>
			<SortIcon sort={props.sort}/>
			{props.sort.column.label}
		</LightBlueTag>
	)
}

const SortIcon = (props: props_type) => {
	switch (props.sort.value) {
		case "ascending":
			return <HiArrowDown className="h-5 w-5"/>
		case "descending":
			return <HiArrowUp className="h-5 w-5"/>
		default:
			return <HiArrowDown className="h-5 w-5"/>
	}
}