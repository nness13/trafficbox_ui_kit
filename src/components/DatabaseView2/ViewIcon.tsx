import {
	HiCalendarDays,
	HiPresentationChartLine,
	HiQuestionMarkCircle,
	HiSquares2X2,
	HiTableCells,
	HiViewColumns
} from 'react-icons/hi2'
import React from 'react'
import { ViewTypesType } from '@/components/DatabaseView2/DatabaseViewTypes'

export function ViewsIcon(props: { type: ViewTypesType }) {
	switch (props.type) {
		case "table": return <HiTableCells className="h-5 w-5"/>
		case "card": return <HiSquares2X2 className="h-5 w-5"/>
		// case "board": return <HiViewColumns className="h-5 w-5"/>
		// case "graphic": return <HiPresentationChartLine  className="h-5 w-5"/>
		// case "calendar": return <HiCalendarDays  className="h-5 w-5"/>
		default: return <HiQuestionMarkCircle className="h-5 w-5"/>
	}
}
