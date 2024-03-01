import React from 'react'
import {Popover, PopoverContent, PopoverHandler} from '@material-tailwind/react'
import {useViewContext} from "@/components/DatabaseView/Views/TableView/ViewContext";
import {ColumnType} from "@/components/DatabaseView/DatabaseViewTypes";
import {SimpleLightButton} from "@/components/Buttons/SimpleLightButton";
import {HiEllipsisVertical, HiTrash} from "react-icons/hi2";

export function ColumnPopoverEditor (props: { children: React.ReactNode, column: ColumnType } ) {
	const active_view = useViewContext()

	return (
		<Popover placement="bottom-start">
			<PopoverHandler>
				<div>
					{props.children}
				</div>
			</PopoverHandler>
			<PopoverContent className="w-96 z-30 flex flex-col gap-5 p-2 bg-foreground border-none" placeholder={""}>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-2 items-center">
							<div>{props.column.label}</div>
						</div>
						<div className="flex flex-row">
							<SimpleLightButton>
								<HiEllipsisVertical className="h-5 w-5"/>
							</SimpleLightButton>
							<SimpleLightButton onClick={() => active_view.remove_column(props.column.key)}>
								<HiTrash className="h-5 w-5"/>
							</SimpleLightButton>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
