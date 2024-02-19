import React from 'react'
import moment from 'moment'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'
import { DateView } from '@/components/DateView'
// import { DateView } from '@/app/[components]/DateView'

type props_type = {
	filter: any
}
export const FilterTag = (props: props_type) => {
	let filter_value: string | React.ReactNode = ""
	if(props.filter.condition === "within") {
		filter_value = <div>
			<DateView
				date={props.filter.from}
				date_format={"YYYY-MM-DD"}
			/>
			{" - "}
			<DateView
				date={props.filter.to}
				date_format={"YYYY-MM-DD"}
			/>
		</div>
	}


	if(props.filter.condition !== "within" && typeof props.filter.value === 'string') {
		switch (props.filter.column.type.type){
			case "createdAt":
				filter_value = moment(props.filter.value).format('YYYY-MM-DD HH:mm:ss')
				break;
			default:
				filter_value = props.filter.value

		}
	}
	if( props.filter.condition !== "within" && Array.isArray(props.filter.value) ) {
		filter_value = props.filter.value?.map((el: any) => el).join(', ')
	}

	return (
		<LightBlueTag>
			{/*<IconColumnType type={props.filter.column.type.type }/>*/}
			{props.filter.column.label}
			<div>{props.filter.condition}</div>
			{filter_value}
		</LightBlueTag>
	)
}