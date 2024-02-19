import { HiPlus } from 'react-icons/hi2'
import React from 'react'


export const FilterTagAdd = () => {
	// const cm = useContextMenu(cm_name_filter_tag_create)

	return (
		<div className={`
			flex
			flex-row
			items-center
			cursor-pointer
			py-0.5
			px-1
			rounded-md
			text-text_passive
			hover:bg-gray-500
			hover:bg-opacity-20
		`}>
			<HiPlus className="h-5 w-5"/>
			Add Filter
		</div>
	)
}