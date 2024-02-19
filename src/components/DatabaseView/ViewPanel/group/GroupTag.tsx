import React from 'react'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'

type props_type = {
	group: any
}
export const GroupTag = (props: props_type) => {

	return (
		<LightBlueTag>
			{/*<IconColumnType type={props.group.column.type.type }/>*/}
			<div>{props.group.column.label}</div>
		</LightBlueTag>
	)
}