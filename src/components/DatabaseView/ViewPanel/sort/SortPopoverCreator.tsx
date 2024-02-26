import React, {useState} from 'react'
import {Input, ListItem, Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {createSortType} from "@/components/DatabaseView/DatabaseViewTypes";

export function SortPopoverCreator ( props: { children: React.ReactNode } ) {
	const active_view = useViewContext()
	const [status, set_status] = useState(false)
	const on_create_sort = (sort: createSortType) => {
		set_status(false)
		active_view.add_sort(sort)
	}

	return (
		<Popover placement="bottom-start" open={status} handler={() => set_status(!status)}>
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 max-h-[800px] overflow-auto z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div>
					<Input type={"search"} name="search" label="Filter by ..." crossOrigin={undefined}/>
					{active_view.columns.map((el: any) => (
						<ListItem
							placeholder
							key={el.key}
							onClick={() => on_create_sort({
								column: el,
								value: "ascending",
							})}
						>
							{active_view.column_case_handlers[el.type.type].Icon({className: "w-4 h-4"})}
							{/*<IconColumnType type={el.type.type}/>*/}
							<div>{el.label}</div>
						</ListItem>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}