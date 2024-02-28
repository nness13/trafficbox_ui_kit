import React from 'react'
import moment from 'moment'
import { LightBlueTag } from '@/components/Buttons/LightBlueTag'
import { DateView } from '@/components/DateView'
import {observer} from "mobx-react-lite";
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {filterType} from "@/components/DatabaseView/DatabaseViewTypes";
import {useColumnCaseContext} from "@/components/DatabaseView/Views/ColumnCaseContext";
// import { DateView } from '@/app/[components]/DateView'

type props_type = {
	filter: filterType
}
export const FilterTag = observer((props: props_type) => {
	const column_case_handlers = useColumnCaseContext()

	let filter_value: string | React.ReactNode = ""
	if(props.filter.condition !== "within") {
		filter_value = <div>
			{props.filter.value}
		</div>
	}
	if(props.filter.condition === "within") {
		filter_value = <div>
			<DateView
				date={props.filter.from!}
				date_format={"YYYY-MM-DD"}
			/>
			{" - "}
			<DateView
				date={props.filter.to!}
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
			{column_case_handlers[props.filter.column.type.type].Icon({className: "w-4 h-4"})}
			{props.filter.column.label}
			<div>{props.filter.condition}</div>
			{filter_value}
		</LightBlueTag>
	)
})