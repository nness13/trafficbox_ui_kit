import React from 'react'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'
import {ColumnType} from "@/components/DatabaseView/DatabaseViewTypes";

type props_type = {
	column: ColumnType
}
export const ColumnTag = (props: props_type) => {

	return (
		<LightBlueTag>
			{/*<IconColumnType type={props.group.column.type.type }/>*/}
			<div>{props.column.label}</div>
		</LightBlueTag>
	)
}