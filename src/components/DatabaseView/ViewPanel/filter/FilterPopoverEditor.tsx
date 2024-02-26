import React from 'react'
import {Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {FilterEditorSwitcher} from '@/components/DatabaseView/ViewPanel/filter/FilterEditorSwitcher'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {observer} from "mobx-react-lite";
import {filterType, updateFilterType} from "@/components/DatabaseView/DatabaseViewTypes";

export const FilterPopoverEditor = observer(( props: { children: React.ReactNode, filter: filterType } ) => {
	const active_view = useViewContext()
	const update_filter = (filter: updateFilterType) => {
		active_view.update_filter(filter)
	}
	const delete_filter = (id: string) => {
		active_view.remove_filter(id)
	}

	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<FilterEditorSwitcher filter={props.filter} update_filter={update_filter} delete_filter={delete_filter}/>
			</PopoverContent>
		</Popover>
	)
})